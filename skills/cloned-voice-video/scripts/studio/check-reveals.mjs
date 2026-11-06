// Resolves every shot's revealWord against the measured word times and prints the
// SECOND it actually lands on, flagging triggers that do not exist and shots that
// resolve earlier than the one before them.
//
// A trigger that exists but lands on the wrong occurrence puts the right visual on
// screen at the wrong moment -- and that is invisible in the config, survives the
// render, and is otherwise only found by watching the finished video.
//
//   node check-reveals.mjs <slug>          # from the studio root
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const slug = process.argv[2];
if (!slug) { console.error('usage: check-reveals.mjs <slug>'); process.exit(1); }

const dir = join('src/videos', slug);
const voiceFile = process.argv[3] ?? 'voice.caio.json';
const voice = JSON.parse(readFileSync(join(dir, voiceFile), 'utf8'));
const words = voice.captions.aula;
const src = readFileSync(join(dir, 'config.ts'), 'utf8');

const norm = (w) => w.toLowerCase().replace(/[.,!?;:"]/g, '');
const shots = [...src.matchAll(/revealWord:\s*['"]([^'"]+)['"](?:,\s*nth:\s*(\d+))?/g)]
  .map((m) => ({word: m[1], nth: m[2] ? +m[2] : 1}));

let prev = 0, bad = 0;
console.log(`${slug} — ${(voice.totalFrames / voice.fps).toFixed(1)}s, ${words.length} words\n`);
for (const s of shots) {
  const hits = words.filter((w) => norm(w.word) === norm(s.word));
  const hit = hits[s.nth - 1];
  if (!hit) { console.log(`  ✗ "${s.word}" nth ${s.nth} — only ${hits.length} occurrence(s)`); bad++; continue; }
  const t = hit.startMs / 1000;
  const flag = t < prev ? '  ✗ OUT OF ORDER' : '';
  if (flag) bad++;
  console.log(`  ${String(t.toFixed(1)).padStart(6)}s  "${s.word}" nth ${s.nth}  (of ${hits.length})${flag}`);
  prev = Math.max(prev, t);
}
console.log(bad ? `\n${bad} problem(s)` : '\norder ok');
if (bad) process.exitCode = 1;
