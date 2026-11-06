/**
 * Convert an ElevenLabs `with-timestamps` response into a word-level SRT.
 *
 * The API returns per-CHARACTER times; captions and diagram reveals need words, so
 * characters are grouped on whitespace and each word takes its first character's start
 * and its last character's end. One cue per word, so build-voice.mjs reads the exact
 * times instead of distributing them evenly across a cue.
 *
 *   usage: timestamps-to-srt.mjs <response.json> <out.srt>
 *
 * Accepts either the full response or just the alignment object. Prefers
 * `alignment` over `normalized_alignment`, because `alignment` indexes the text that
 * was actually sent — which is what revealWord matches against.
 */
import {readFileSync, writeFileSync} from 'node:fs';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('usage: timestamps-to-srt.mjs <response.json> <out.srt>');
  process.exit(1);
}

const raw = JSON.parse(readFileSync(src, 'utf8'));
const a = raw.alignment ?? raw.normalized_alignment ?? raw;
const chars = a.characters;
const starts = a.character_start_times_seconds;
const ends = a.character_end_times_seconds;

if (!Array.isArray(chars) || !Array.isArray(starts) || !Array.isArray(ends)) {
  console.error('no alignment in that file: expected characters + character_*_times_seconds');
  process.exit(1);
}
if (chars.length !== starts.length || chars.length !== ends.length) {
  console.error(`alignment arrays disagree: ${chars.length}/${starts.length}/${ends.length}`);
  process.exit(1);
}

// group characters into words on whitespace
const words = [];
let cur = null;
for (let i = 0; i < chars.length; i++) {
  const c = chars[i];
  if (/\s/.test(c)) { cur = null; continue; }
  if (!cur) { cur = {word: '', startMs: starts[i] * 1000, endMs: ends[i] * 1000}; words.push(cur); }
  cur.word += c;
  cur.endMs = ends[i] * 1000;           // extend to the latest character of this word
}
if (!words.length) { console.error('alignment held no words'); process.exit(1); }

// keep cues strictly increasing and non-empty, or players and parsers disagree
for (let i = 0; i < words.length; i++) {
  if (i > 0 && words[i].startMs < words[i - 1].endMs) words[i].startMs = words[i - 1].endMs;
  if (words[i].endMs <= words[i].startMs) words[i].endMs = words[i].startMs + 40;
}

const stamp = (ms) => {
  const t = Math.max(0, Math.round(ms));
  const h = String(Math.floor(t / 3600000)).padStart(2, '0');
  const m = String(Math.floor(t / 60000) % 60).padStart(2, '0');
  const s = String(Math.floor(t / 1000) % 60).padStart(2, '0');
  return `${h}:${m}:${s},${String(t % 1000).padStart(3, '0')}`;
};

writeFileSync(out, words
  .map((w, i) => `${i + 1}\n${stamp(w.startMs)} --> ${stamp(w.endMs)}\n${w.word}\n`)
  .join('\n'));

const secs = (words.at(-1).endMs / 1000).toFixed(2);
console.log(`${words.length} words, last ends at ${secs}s -> ${out}`);
