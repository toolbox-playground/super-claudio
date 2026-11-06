import {readdirSync, readFileSync, writeFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

const [slug, voice] = process.argv.slice(2);
if (!slug || !voice) { console.error('usage: build-voice.mjs <slug> <voice>'); process.exit(1); }
const dir = join('public', slug, voice);
if (!existsSync(dir)) { console.error(`missing ${dir}`); process.exit(1); }
const FPS = 30, PAD = 0.35;

const toMs = (t) => {
  const [h, m, rest] = t.split(':'); const [s, ms] = rest.split(',');
  return ((+h * 60 + +m) * 60 + +s) * 1000 + +ms;
};

const audio = readdirSync(dir).filter(f => /\.(mp3|wav)$/.test(f)).sort();
const durations = {}, captions = {}; let totalFrames = 0;

for (const f of audio) {
  const id = f.replace(/\.(mp3|wav)$/, '');
  const sec = parseFloat(execFileSync('ffprobe',
    ['-v','error','-show_entries','format=duration','-of','csv=p=0', join(dir,f)]).toString().trim());
  if (!Number.isFinite(sec) || sec <= 0) { console.error(`BAD AUDIO: ${f}`); process.exit(1); }
  const frames = Math.ceil((sec + PAD) * FPS);
  durations[id] = frames; totalFrames += frames;

  const srt = join(dir, `${id}.srt`);
  const words = [];
  if (existsSync(srt)) {
    for (const b of readFileSync(srt,'utf8').split(/\r?\n\r?\n/).filter(Boolean)) {
      const lines = b.trim().split(/\r?\n/);
      const time = lines.find(l => l.includes('-->')); if (!time) continue;
      let [start, end] = time.split('-->').map(t => toMs(t.trim()));
      if (end <= start) end = start + 400;
      const parts = lines.slice(lines.indexOf(time)+1).join(' ').trim().split(/\s+/).filter(Boolean);
      const step = (end - start) / parts.length;
      parts.forEach((word, i) => words.push({
        word, startMs: Math.round(start + i*step), endMs: Math.round(start + (i+1)*step)}));
    }
    // enforce monotonic timings (edge-tts cues can overlap slightly)
    for (let i = 1; i < words.length; i++)
      if (words[i].startMs < words[i-1].endMs) words[i].startMs = words[i-1].endMs;
  }
  captions[id] = words;
}

const out = join('src','videos',slug,`voice.${voice}.json`);
writeFileSync(out, JSON.stringify({voice, fps: FPS, durations, totalFrames, captions}, null, 0));
console.log(`${voice}: ${audio.length} scenes, ${totalFrames} frames = ${(totalFrames/FPS).toFixed(2)}s -> ${out}`);

// regenerate the voices barrel so Root only imports JSONs that exist
const vdir = join('src','videos',slug);
const found = readdirSync(vdir).filter(f => /^voice\..+\.json$/.test(f))
  .map(f => f.replace(/^voice\.|\.json$/g,'')).sort();
writeFileSync(join(vdir,'voices.ts'),
  found.map(v => `import ${v} from './voice.${v}.json';`).join('\n') +
  `\nimport type {VoiceData} from './Main';\n` +
  `export const voices: VoiceData[] = [${found.join(', ')}] as unknown as VoiceData[];\n`);
console.log(`voices barrel: ${found.join(', ')}`);
