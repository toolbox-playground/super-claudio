// Poor-man's forced aligner: distributes known narration words across the speech
// segments of a WAV (found with ffmpeg silencedetect), weighted by word length.
// Use this only for audio downloaded from the ElevenLabs web app, which carries no
// timings. When the audio came from the API, timestamps-to-srt.mjs gives exact times
// instead -- these are estimates and they drift on long pauses.
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';

const [wavDir, textDir] = process.argv.slice(2);
const NOISE = '-35dB', MINSIL = '0.22';

const dur = (f) => parseFloat(execFileSync('ffprobe',
  ['-v','error','-show_entries','format=duration','-of','csv=p=0', f]).toString().trim());

const speechSegments = (f) => {
  // ffmpeg writes the silencedetect report to stderr, so spawnSync (not execFileSync)
  const res = spawnSync('ffmpeg', ['-v','info','-i',f,'-af',
    `silencedetect=noise=${NOISE}:d=${MINSIL}`,'-f','null','-'], {encoding:'utf8'});
  const log = res.stderr ?? '';
  const total = dur(f), sil = [];
  let start = null;
  for (const line of log.split('\n')) {
    let m = line.match(/silence_start:\s*([\d.]+)/);
    if (m) { start = parseFloat(m[1]); continue; }
    m = line.match(/silence_end:\s*([\d.]+)/);
    if (m && start !== null) { sil.push([start, parseFloat(m[1])]); start = null; }
  }
  if (start !== null) sil.push([start, total]);
  const seg = []; let cur = 0;
  for (const [a,b] of sil) { if (a - cur > 0.05) seg.push([cur, a]); cur = b; }
  if (total - cur > 0.05) seg.push([cur, total]);
  return seg.length ? seg : [[0, total]];
};

const ts = (s) => {
  const h = Math.floor(s/3600), m = Math.floor(s%3600/60), sec = s%60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${sec.toFixed(3).padStart(6,'0').replace('.',',')}`;
};

for (const f of readdirSync(wavDir).filter(f => f.endsWith('.wav')).sort()) {
  const id = f.replace('.wav','');
  const txt = join(textDir, `${id}.txt`);
  if (!existsSync(txt)) { console.error(`no narration for ${id}`); process.exit(1); }
  const words = readFileSync(txt,'utf8').trim().split(/\s+/).filter(Boolean);
  const segs = speechSegments(join(wavDir, f));
  const speech = segs.reduce((a,[x,y]) => a + (y-x), 0);

  const w = words.map(x => x.length + 1);
  const totalW = w.reduce((a,b)=>a+b,0);
  // cumulative speech-time position of each word boundary
  let acc = 0;
  const bounds = [0, ...w.map(x => (acc += x) / totalW * speech)];

  // map a speech-time offset back onto wall-clock across the segments
  const toWall = (t) => {
    let left = t;
    for (const [a,b] of segs) {
      const len = b - a;
      if (left <= len) return a + left;
      left -= len;
    }
    return segs[segs.length-1][1];
  };

  const lines = [];
  words.forEach((word, i) => {
    lines.push(String(i+1), `${ts(toWall(bounds[i]))} --> ${ts(toWall(bounds[i+1]))}`, word, '');
  });
  writeFileSync(join(wavDir, `${id}.srt`), lines.join('\n'));
  console.log(`${id}: ${words.length} palavras em ${segs.length} segmentos de fala (${speech.toFixed(1)}s de ${dur(join(wavDir,f)).toFixed(1)}s)`);
}
