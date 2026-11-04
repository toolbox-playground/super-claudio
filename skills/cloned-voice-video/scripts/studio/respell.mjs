// The multilingual model applies Portuguese grapheme-to-phoneme to EVERY word, so
// English technical terms come out sounding Portuguese. Respelling them in Portuguese
// orthography that approximates the English sound is the standard fix.
//
// Produces narration-tts/ (what the model speaks) from narration/ (what captions show).
// Word COUNT must be preserved 1:1 so the aligner can map audio back onto display words.
import {readFileSync, writeFileSync, readdirSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';

const MAP = new Map(Object.entries({
  // acronyms spoken as English letters
  'api':        'êi-pi-ái',
  'yaml':       'iâmel',
  'etcd':       'ét-ci-di',
  // English words a Brazilian dev says with English phonetics
  'server':     'sârver',
  'servers':    'sârvers',
  'kubernetes': 'kubernêtchis',
  'kubelet':    'kiubelét',
  'scheduler':  'skédiuler',
  'controller': 'controuler',
  'controllers':'controulers',
  'control':    'contról',
  'plane':      'pleyn',
  'node':       'nôud',
  'nodes':      'nôuds',
  'pod':        'pód',
  'pods':       'póds',
  'container':  'contêiner',
  'containers': 'contêiners',
  'deployment': 'deploiment',
  'replicas':   'réplicas',   // already Portuguese, kept for clarity
}));

const respell = (word) => {
  const m = word.match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u);
  const [, pre, core, post] = m;
  const hit = MAP.get(core.toLowerCase());
  if (!hit) return word;
  // preserve capitalisation of the original
  const out = /^[A-ZÀ-Ý]/.test(core) ? hit.charAt(0).toUpperCase() + hit.slice(1) : hit;
  return pre + out + post;
};

const [srcDir, outDir] = process.argv.slice(2);
mkdirSync(outDir, {recursive: true});
for (const f of readdirSync(srcDir).filter(f => f.endsWith('.txt')).sort()) {
  const orig = readFileSync(join(srcDir, f), 'utf8').trim();
  const words = orig.split(/\s+/);
  const spoken = words.map(respell);
  if (spoken.length !== words.length) throw new Error(`word count drift in ${f}`);
  writeFileSync(join(outDir, f), spoken.join(' '));
  const changed = words.map((w,i) => w !== spoken[i] ? `${w}→${spoken[i]}` : null).filter(Boolean);
  console.log(`${f}: ${changed.length ? changed.join('  ') : '(sem termos em inglês)'}`);
}
