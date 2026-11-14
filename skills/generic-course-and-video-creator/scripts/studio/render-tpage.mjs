// Frame-exact render of a "t-page": an HTML page where every frame is a pure function of
// time. The page exposes window.seek(t) (seconds) and sets window.__ready = true; this
// script seeks every frame, screenshots it and pipes the PNGs to ffmpeg. No wall clock is
// involved, so a slow machine renders the same video as a fast one.
//
//   node render-tpage.mjs <page.html> <out.mp4> [--secs 10] [--fps 30] [--size 1920x1080]
//                         [--voice voice.<name>.json --scene aula] [--root <dir>] [--workers 4]
//   node render-tpage.mjs <page.html> <frame.png> --still <t>      (one frame, as PNG)
//   node render-tpage.mjs <page.html> <folder> --still 1.5,12,30    (several frames)
//
// The skill's default lesson engine (templates/lesson-tpage.html, references/html-engine.md),
// and also used for terminal-demo shots (templates/terminal-demo.html) and three.js scenes.
// --voice injects that scene's word timings as window.WORDS before the page loads, so
// the page cues every change on a spoken word instead of a hand-typed second.
// --secs defaults to window.DURATION, then to the voice file's duration.
// The page is served over a throwaway local HTTP server rooted at --root (default: the
// page's folder), because Chrome refuses ES-module imports (three.js) from file://.
//
// Needs Node 22+ (global WebSocket), Chrome and ffmpeg. Nothing to npm install: it talks
// to Chrome over the DevTools protocol directly.
import {createServer} from 'node:http';
import {readFileSync, writeFileSync, existsSync, mkdtempSync, mkdirSync, rmSync, statSync, readdirSync} from 'node:fs';
import {join, resolve, dirname, extname, relative, sep} from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';

const argv = process.argv.slice(2);
const pos = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
const opt = (k, d) => { const i = argv.indexOf(`--${k}`); return i < 0 ? d : argv[i + 1]; };
const [pagePath, outPath] = pos;
if (!pagePath || !outPath) {
  console.error('usage: render-tpage.mjs <page.html> <out.mp4> [--secs N] [--fps 30] [--size 1920x1080] [--voice v.json --scene id] [--root dir] [--workers N] [--still t]');
  process.exit(1);
}
const FPS = Number(opt('fps', 30));
const [W, H] = opt('size', '1920x1080').split('x').map(Number);
const ROOT = resolve(opt('root', dirname(resolve(pagePath))));
const PAGE = relative(ROOT, resolve(pagePath)).split(sep).join('/');
if (PAGE.startsWith('..')) { console.error('the page must be inside --root'); process.exit(1); }

let words = null, voiceSecs = null;
if (opt('voice')) {
  const v = JSON.parse(readFileSync(opt('voice'), 'utf8'));
  const scene = opt('scene', Object.keys(v.captions)[0]);
  words = v.captions[scene];
  voiceSecs = v.durations[scene] / v.fps;
}

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find((p) => existsSync(p));
if (!CHROME) { console.error('no Chrome/Chromium found'); process.exit(1); }

// ---- static server --------------------------------------------------------------
const MIME = {'.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json', '.wasm': 'application/wasm', '.woff2': 'font/woff2', '.hdr': 'application/octet-stream'};
const server = createServer((req, res) => {
  const p = resolve(ROOT, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, {'content-type': MIME[extname(p)] || 'application/octet-stream', 'cache-control': 'no-store'});
  res.end(readFileSync(p));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/${PAGE}`;

// ---- Chrome over the DevTools protocol ------------------------------------------
// One Chrome per worker. Each opens the page, waits until it is ready and every image is
// decoded, and hands back a tiny CDP client.
//
// Frames never touch the disk: each screenshot goes from Chrome's memory straight into
// ffmpeg's pipe. What does touch the disk is temporary and removed here: Chrome's
// throwaway profiles and, with --workers, the segment files before they are joined.
// A Chrome that is still shutting down can keep its profile alive past this process,
// so every run also sweeps leftovers older than an hour from earlier runs.
const chromes = [];
let SEGDIR = null;
const cleanup = () => {
  for (const c of chromes) { try { c.proc.kill(); } catch {} try { rmSync(c.profile, {recursive: true, force: true}); } catch {} }
  if (SEGDIR) try { rmSync(SEGDIR, {recursive: true, force: true}); } catch {}
  server.close();
};
for (const d of readdirSync(tmpdir())) {
  if (!d.startsWith('render-tpage-')) continue;
  const p = join(tmpdir(), d);
  try { if (Date.now() - statSync(p).mtimeMs > 3600e3) rmSync(p, {recursive: true, force: true}); } catch {}
}
process.on('exit', cleanup);
const errors = [];

async function openPage() {
  const profile = mkdtempSync(join(tmpdir(), 'render-tpage-'));
  const proc = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    `--window-size=${W},${H}`, '--hide-scrollbars', '--force-device-scale-factor=1',
    '--enable-unsafe-swiftshader', '--no-first-run', '--no-default-browser-check',
    // a headless page counts as hidden: without these, Chrome throttles its frames to ~1/s
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows', 'about:blank'],
    {stdio: 'ignore'});
  chromes.push({proc, profile});
  const portFile = join(profile, 'DevToolsActivePort');
  // the file can exist a moment before Chrome writes the port into it
  const readPort = () => { try { return readFileSync(portFile, 'utf8').split('\n')[0].trim(); } catch { return ''; } };
  let port = '';
  for (let i = 0; i < 1200 && !(port = readPort()); i++) await new Promise((r) => setTimeout(r, 50));
  if (!port) { console.error('Chrome did not start within 60 s'); process.exit(1); }
  const target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, {once: true}));
  let seq = 0; const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const {ok, ko} = pending.get(m.id); pending.delete(m.id); m.error ? ko(new Error(m.error.message)) : ok(m.result); }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
  });
  const cdp = (method, params = {}) => new Promise((ok, ko) => { const id = ++seq; pending.set(id, {ok, ko}); ws.send(JSON.stringify({id, method, params})); });
  const evaluate = async (expression) => {
    const r = await cdp('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride', {width: W, height: H, deviceScaleFactor: 1, mobile: false});
  if (words) await cdp('Page.addScriptToEvaluateOnNewDocument', {source: `window.WORDS = ${JSON.stringify(words)}; window.DURATION = window.DURATION || ${voiceSecs};`});
  await cdp('Page.navigate', {url});
  const t0 = Date.now();
  while (!(await evaluate('window.__ready === true').catch(() => false))) {
    if (Date.now() - t0 > 30000) { console.error('page never set window.__ready', errors); process.exit(1); }
    await new Promise((r) => setTimeout(r, 100));
  }
  await evaluate('document.fonts ? document.fonts.ready.then(() => true) : true');
  // every <img> decoded before the first frame: a web image or a creator's photo that is
  // still loading would render as a blank box in the opening frames
  const broken = await evaluate(`Promise.all([...document.images].map((i) => i.decode().then(() => null, () => i.src)))
    .then((r) => r.filter(Boolean))`);
  if (broken.length) errors.push(...broken.map((src) => `image failed to load: ${src}`));
  const frame = async (t) => {
    await evaluate(`Promise.resolve(window.seek(${t})).then(() => true)`);
    const {data} = await cdp('Page.captureScreenshot', {format: 'png', fromSurface: true});
    return Buffer.from(data, 'base64');
  };
  return {evaluate, frame, close: () => ws.close()};
}

const report = () => { if (errors.length) { console.error('page errors:', [...new Set(errors)]); process.exitCode = 2; } };

// --still <t>: one PNG of the frame at t. --still 1.5,12,30 with a folder as the output
// writes one PNG per time (<folder>/<t>.png) from a single Chrome launch -- the cheap way
// to check a whole lesson, one frame per scene, before the full render.
if (opt('still') !== undefined) {
  const p = await openPage();
  const times = String(opt('still')).split(',').map(Number);
  const many = times.length > 1;
  if (many) mkdirSync(outPath, {recursive: true});
  for (const t of times) {
    const file = many ? join(outPath, `${t}.png`) : outPath;
    writeFileSync(file, await p.frame(t));
    console.log(`${file}: frame at ${t} s`);
  }
  report(); p.close(); cleanup(); process.exit(process.exitCode || 0);
}

// --workers N splits the frames into N consecutive ranges, one Chrome each, encodes each
// range to its own segment and joins them losslessly. The page is a pure function of t,
// so a range rendered alone is identical to the same frames rendered in sequence.
// Default 1; on a 12-core Mac 4 is a good value (each Chrome takes ~300-500 MB).
const WORKERS = Math.max(1, Number(opt('workers', 1)));
const first = await openPage();
const secs = Number(opt('secs', 0)) || (await first.evaluate('window.DURATION || 0')) || voiceSecs;
if (!secs) { console.error('no duration: pass --secs, set window.DURATION, or pass --voice'); process.exit(1); }
const n = Math.round(secs * FPS);
const pages = [first, ...(await Promise.all(Array.from({length: Math.min(WORKERS, n) - 1}, openPage)))];
const encode = (file) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-r', String(FPS), file], {stdio: ['pipe', 'inherit', 'inherit']});
SEGDIR = pages.length > 1 ? mkdtempSync(join(tmpdir(), 'render-tpage-seg-')) : null;
let doneFrames = 0;
const started = Date.now();
const tick = () => { const s = (Date.now() - started) / 1000; process.stdout.write(`\r${(doneFrames / FPS).toFixed(0)}/${secs.toFixed(0)} s · ${(s / Math.max(1, doneFrames)).toFixed(2)} s/frame`); };
// captureScreenshot composites a fresh frame, so no requestAnimationFrame wait is needed
// after seek(); a seek that loads something async may return a promise and is awaited.
const renderRange = async (p, a, b, file) => {
  const ff = encode(file);
  for (let i = a; i < b; i++) {
    if (!ff.stdin.write(await p.frame(i / FPS))) await new Promise((r) => ff.stdin.once('drain', r));
    if (++doneFrames % FPS === 0) tick();
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
};
const per = Math.ceil(n / pages.length);
const segs = pages.map((_, k) => SEGDIR ? join(SEGDIR, `seg-${String(k).padStart(2, '0')}.mp4`) : outPath);
await Promise.all(pages.map((p, k) => renderRange(p, k * per, Math.min(n, (k + 1) * per), segs[k])));
if (SEGDIR) {
  const list = join(SEGDIR, 'list.txt');
  writeFileSync(list, segs.map((f) => `file '${f}'`).join('\n') + '\n');
  await new Promise((ok, ko) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', outPath],
    {stdio: 'inherit'}).on('close', (c) => c === 0 ? ok() : ko(new Error('ffmpeg concat failed'))));
  rmSync(SEGDIR, {recursive: true, force: true});
}
pages.forEach((p) => p.close());
const took = (Date.now() - started) / 1000;
console.log(`\r${outPath}: ${n} frames, ${secs.toFixed(2)} s at ${FPS} fps · ${pages.length} worker(s) · ${Math.floor(took / 60)}m${Math.round(took % 60)}s`);
report();
cleanup();
process.exit(process.exitCode || 0);
