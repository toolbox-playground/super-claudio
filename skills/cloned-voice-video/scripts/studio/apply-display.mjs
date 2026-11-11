// Shows a symbol on screen where the voice had to spell it out.
//
// Eleven v4 reads "CLAUDE ponto M D" and "barra var, barra log, barra nginx" far better
// than it reads `CLAUDE.md` and `/var/log/nginx`. So the narration spells the symbol for
// the voice, the alignment indexes the spelled words, and this script then replaces each
// spelled sequence with the symbol in the caption data -- after alignment, so the timings
// stay exact: the merged word starts where the first spelled word started and ends where
// the last one ended.
//
//   node apply-display.mjs <voice.json> <display.json>     rewrite voice.json in place
//   node apply-display.mjs <voice.json> <display.json> --dry   print what would change
//   node apply-display.mjs --selftest                      run the built-in cases
//
// display.json is a list of what the voice says and what the screen shows:
//   [{"say": "CLAUDE ponto M D", "show": "CLAUDE.md"},
//    {"say": "barra var barra log barra nginx", "show": "/var/log/nginx"}]
//
// Matching ignores case, accents and punctuation, so "nginx." and "nginx" both match, and
// punctuation around the sequence ("nginx.”") is kept around the symbol. The longest entry
// wins where two overlap. It is idempotent: a second run finds nothing left to replace.
//
// ORDER MATTERS. build-voice.mjs regenerates voice.<name>.json from the SRT and throws the
// substitutions away, so run this after every build-voice.mjs, before rendering.
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const key = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]/g, '');
const lead = (s) => (s.match(/^[^\p{L}\p{N}]+/u) ?? [''])[0];
const trail = (s) => (s.match(/[^\p{L}\p{N}]+$/u) ?? [''])[0];

/** Returns {words, counts}: the caption array with each `say` sequence merged into `show`. */
export function applyDisplay(words, table) {
  const entries = table
    .map((e) => ({...e, keys: e.say.split(/\s+/).filter(Boolean).map(key)}))
    .filter((e) => e.keys.length > 0 && e.keys.every(Boolean))
    .sort((a, b) => b.keys.length - a.keys.length);
  const counts = new Map(table.map((e) => [e.say, 0]));
  const out = [];
  for (let i = 0; i < words.length;) {
    const hit = entries.find((e) =>
      i + e.keys.length <= words.length &&
      e.keys.every((k, j) => key(words[i + j].word) === k));
    if (!hit) { out.push(words[i]); i++; continue; }
    const first = words[i], last = words[i + hit.keys.length - 1];
    out.push({
      word: lead(first.word) + hit.show + trail(last.word),
      startMs: first.startMs, endMs: last.endMs,
    });
    counts.set(hit.say, counts.get(hit.say) + 1);
    i += hit.keys.length;
  }
  return {words: out, counts};
}

function selftest() {
  const w = (word, startMs, endMs) => ({word, startMs, endMs});
  const table = [
    {say: 'CLAUDE ponto M D', show: 'CLAUDE.md'},
    {say: 'barra var barra log barra nginx', show: '/var/log/nginx'},
    {say: 'docs barra plans', show: 'docs/plans'},
    {say: 'docs barra', show: 'NUNCA'},               // shorter entry must lose to the longer
  ];
  const cases = [
    ['plain', [w('o', 0, 10), w('CLAUDE', 10, 20), w('ponto', 20, 30), w('M', 30, 40), w('D', 40, 50)],
      [['o', 0, 10], ['CLAUDE.md', 10, 50]]],
    ['trailing punctuation kept', [w('em', 0, 10), w('barra', 10, 20), w('var,', 20, 30),
      w('barra', 30, 40), w('log,', 40, 50), w('barra', 50, 60), w('nginx.”', 60, 70)],
      [['em', 0, 10], ['/var/log/nginx.”', 10, 70]]],
    ['leading punctuation kept', [w('“docs', 0, 10), w('barra', 10, 20), w('plans', 20, 30)],
      [['“docs/plans', 0, 30]]],
    ['longest entry wins', [w('docs', 0, 10), w('barra', 10, 20), w('plans', 20, 30)],
      [['docs/plans', 0, 30]]],
    ['no match leaves words alone', [w('ponto', 0, 10), w('final', 10, 20)],
      [['ponto', 0, 10], ['final', 10, 20]]],
    ['idempotent', [w('CLAUDE.md', 10, 50)], [['CLAUDE.md', 10, 50]]],
  ];
  let bad = 0;
  for (const [name, input, want] of cases) {
    const got = applyDisplay(input, table).words.map((x) => [x.word, x.startMs, x.endMs]);
    const ok = JSON.stringify(got) === JSON.stringify(want);
    if (!ok) bad++;
    console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${ok ? '' : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
  }
  console.log(bad ? `\n${bad} case(s) failed` : '\nall cases pass');
  process.exitCode = bad ? 1 : 0;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) { selftest(); process.exit(); }
  const [voicePath, displayPath] = args.filter((a) => !a.startsWith('--'));
  if (!voicePath || !displayPath) {
    console.error('usage: apply-display.mjs <voice.json> <display.json> [--dry]   |   --selftest');
    process.exit(1);
  }
  const voice = JSON.parse(readFileSync(voicePath, 'utf8'));
  const table = JSON.parse(readFileSync(displayPath, 'utf8'));
  const total = new Map(table.map((e) => [e.say, 0]));
  let changed = false;
  for (const [scene, words] of Object.entries(voice.captions)) {
    const r = applyDisplay(words, table);
    for (const [say, n] of r.counts) total.set(say, total.get(say) + n);
    if (r.words.length !== words.length) changed = true;
    voice.captions[scene] = r.words;
  }
  const shown = new Set(Object.values(voice.captions).flat().map((x) => key(x.word)));
  for (const [say, n] of total) {
    const done = n === 0 && shown.has(key(table.find((e) => e.say === say).show));
    const note = n > 0 ? '' : done ? '   (already applied)'
      : '   <- never matched: does it match the narration word for word?';
    console.log(`${String(n).padStart(3)}x  "${say}"${note}`);
  }
  if (args.includes('--dry')) console.log('(dry run: nothing written)');
  else if (changed) { writeFileSync(voicePath, JSON.stringify(voice)); console.log(`wrote ${voicePath}`); }
  else console.log('nothing to replace (already applied, or no entry matched)');
}
