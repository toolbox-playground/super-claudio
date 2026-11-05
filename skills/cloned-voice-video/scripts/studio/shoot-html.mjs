// Renders every .html in a directory to a PNG with headless Chrome, so a lesson can
// show a realistic replica of a real interface instead of abstract boxes.
//
//   node shoot-html.mjs <htmlDir> <outDir> [WxH]
//
// Each page declares its own frame with <meta name="shot-size" content="1200x760">;
// the CLI argument is the fallback. Output is 2x for crisp downscaling in Remotion --
// always shoot larger than the region you will zoom into, never smaller.
import {readdirSync, existsSync, readFileSync, mkdirSync} from 'node:fs';
import {join, basename} from 'node:path';
import {spawnSync} from 'node:child_process';

const [htmlDir, outDir, sizeArg = '1200x760'] = process.argv.slice(2);
if (!htmlDir || !outDir) {
  console.error('usage: shoot-html.mjs <htmlDir> <outDir> [WxH]');
  process.exit(1);
}

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => existsSync(p));
if (!CHROME) {
  console.error('no Chrome/Chromium found -- install one or shoot the pages by hand');
  process.exit(1);
}

const SCALE = Number(process.env.SHOT_SCALE ?? 3);
mkdirSync(outDir, {recursive: true});

const pages = readdirSync(htmlDir).filter((f) => f.endsWith('.html')).sort();
if (!pages.length) { console.error(`no .html in ${htmlDir}`); process.exit(1); }

for (const f of pages) {
  const src = join(htmlDir, f);
  const html = readFileSync(src, 'utf8');
  const m = html.match(/<meta\s+name=["']shot-size["']\s+content=["'](\d+)x(\d+)["']/i);
  const [w, h] = m ? [m[1], m[2]] : sizeArg.split('x');
  const out = join(outDir, `${basename(f, '.html')}.png`);

  const res = spawnSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    `--force-device-scale-factor=${SCALE}`,
    `--window-size=${w},${h}`,
    '--default-background-color=00000000',
    `--screenshot=${out}`,
    `file://${src}`,
  ], {encoding: 'utf8', timeout: 60_000});

  if (!existsSync(out)) {
    console.error(res.stderr || res.stdout || 'chrome produced no file');
    process.exit(1);
  }
  console.log(`${f} -> ${basename(out)}  ${w}x${h} @${SCALE}x = ${w * SCALE}x${h * SCALE}`);
}
