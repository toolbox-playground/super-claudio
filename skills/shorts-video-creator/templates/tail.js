// ================= assembly =================
const shotsEl = document.getElementById('shots');
S.forEach((s, i) => {
  s.t = i === 0 ? 0 : s.T ? s.T() : at(s.word, s.nth || 1) - .2;
  const d = document.createElement('div'); d.className = 'shot'; d.id = 'S' + i;
  d.innerHTML = `<div class="page">${s.html}</div>`; shotsEl.appendChild(d); s.el = d;
  s.$ = (q) => d.querySelector(q); s.$$ = (q) => d.querySelectorAll(q);
});
S.forEach((s, i) => { s.end = i + 1 < S.length ? S[i + 1].t : DUR; });
const capEl = document.getElementById('cap');
let capK = -2;
function captions(t) {
  let k = -1; for (let i = 0; i < WORDS.length; i++) { if (WORDS[i].startMs / 1000 <= t) k = i; else break; }
  if (k < 0) k = 0;
  if (k === capK) return; capK = k;
  const from = Math.floor(k / 3) * 3;
  capEl.innerHTML = WORDS.slice(from, from + 3).map((w, j) => {
    const url = /^[\w-]+(\.[\w-]+){2,}\.?$/.test(w.word);
    const raw = url ? w.word.replace(/\.$/, '') : w.word.replace(/[.,:;"…?]+$/, '').replace(/^"/, '');
    const keep = /^(CI\/CD|CI|CD)$/.test(raw);
    return `<span class="${from + j === k ? 'on' : ''} ${url ? 'url' : ''}" style="${keep ? 'text-transform:none' : ''}">${esc(raw)}</span>`;
  }).join('');
}
window.seek = (t) => {
  for (const s of S) {
    const nx = S[S.indexOf(s) + 1]; const vis = t >= s.t && t < s.end + (nx && nx.noFade ? 0 : TRANS);
    s.el.style.visibility = vis ? 'visible' : 'hidden';
    if (!vis) continue;
    s.el.style.opacity = s.t === 0 || s.noFade ? 1 : ease(t, s.t, s.t + TRANS);
    s.el.firstElementChild.style.transform = `scale(${1 + .02 * clamp((t - s.t) / (s.end - s.t + TRANS))})`;
    s.draw.call(s, t, s.$);
  }
  const tt = document.getElementById('title'), out = window.TITLE_OUT !== undefined ? window.TITLE_OUT : S[1].t - .6;
  tt.style.opacity = (t < .01 ? 1 : ease(t, 0, .4)) * (1 - ease(t, out, out + .5));
  captions(t);
};

document.fonts.ready.then(() => { window.seek(0); window.__ready = true; });
if (location.search.includes('play')) { const t0 = performance.now(); const loop = () => { window.seek((performance.now() - t0) / 1000); requestAnimationFrame(loop); }; loop(); }
</script>
</body>
</html>
