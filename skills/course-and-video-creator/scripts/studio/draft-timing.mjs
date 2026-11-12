// Estimated word timings for a script that has NO audio yet, so the visuals can be
// laid out and reviewed before any credits are spent on narration.
//
//   node draft-timing.mjs <narration.txt> <out.json> [sceneId] [fps]
//
// The duration comes from the measured rate of 934 characters per minute, and words
// are spread across it weighted by length, with extra weight where the delivery would
// pause. It is a DRAFT: the moment the real audio exists, re-run the real alignment
// (timestamps-to-srt.mjs or align-wav.mjs) and re-render. Never ship a draft timing.
import {readFileSync, writeFileSync} from 'node:fs';

const [txtPath, outPath, sceneId = 'aula', fpsArg = '30'] = process.argv.slice(2);
if (!txtPath || !outPath) {
  console.error('usage: draft-timing.mjs <narration.txt> <out.json> [sceneId] [fps]');
  process.exit(1);
}
const FPS = Number(fpsArg);
const CHARS_PER_MINUTE = 934;
const TAIL_PAD = 0.35;                      // the same pad the real pipeline uses

const raw = readFileSync(txtPath, 'utf8').trim();
const seconds = raw.replace(/\n/g, '').length / CHARS_PER_MINUTE * 60;

// weight: longer words take longer, and punctuation buys a pause after the word
const tokens = raw.split(/\s+/).filter(Boolean);
const weights = tokens.map((w, i) => {
  let x = w.length + 1;
  if (/[,;:]$/.test(w)) x += 2;
  if (/[.!?]$/.test(w) || /\.\.\.$/.test(w)) x += 5;
  if (i < tokens.length - 1 && raw.includes(`${w}\n\n`)) x += 6;   // paragraph break
  return x;
});
const total = weights.reduce((a, b) => a + b, 0);

let acc = 0;
const captions = tokens.map((word, i) => {
  const startMs = Math.round(acc / total * seconds * 1000);
  acc += weights[i];
  return {word, startMs, endMs: Math.round(acc / total * seconds * 1000)};
});

const frames = Math.ceil((seconds + TAIL_PAD) * FPS);
writeFileSync(outPath, JSON.stringify({
  voice: 'draft', fps: FPS, totalFrames: frames,
  durations: {[sceneId]: frames}, captions: {[sceneId]: captions},
}, null, 1));
console.log(`${tokens.length} palavras · ${seconds.toFixed(1)}s estimados · ${frames} frames`);
console.log('gatilhos:', captions.filter(c =>
  /grupo|localhost|volume|descartável|container\.$/i.test(c.word))
  .map(c => `${c.word}@${(c.startMs / 1000).toFixed(1)}s`).join('  '));
