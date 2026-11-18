const S = [];
const E = (e, size = 150, style = '') => `<span class="emoji" style="font-size:${size}px;${style}">${e}</span>`;
const tag = (id, txt, style, cls = '') => `<div class="chip ${cls}" id="${id}" style="${style}">${txt}</div>`;
const nthAfter = (word, t0) => WORDS.filter((w) => norm(w.word) === norm(word) && w.startMs / 1000 < t0).length + 1;
const rnd = (i, k = 1) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
const mvk = (t, keys, dflt = .6) => { let x = keys[0][1]; for (let i = 1; i < keys.length; i++) { const [a, x2, d = dflt] = keys[i]; if (t >= a) x = lerp(x, x2, inout(t, a, a + d)); } return x; };

// ===== bonequinhos (os mesmos do short 05) =====
const FIG = (id, shirt, extra = '') => `<g id="${id}">
  <g class="body">
    <polyline class="lg1" fill="none" stroke="#334155" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline class="lg2" fill="none" stroke="#334155" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline class="ar2" fill="none" stroke="${shirt}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" style="filter:brightness(.8)"/>
    <line x1="0" y1="-112" x2="0" y2="-196" stroke="${shirt}" stroke-width="46" stroke-linecap="round"/>
    <g class="head" transform="translate(0,-246)">
      <circle r="40" fill="#F6C9A0" stroke="#1f2937" stroke-width="4"/>${extra}
      <g class="eyes"><circle cx="14" cy="-6" r="5" fill="#1f2937"/><circle cx="-6" cy="-6" r="5" fill="#1f2937"/></g>
      <path class="brow" d="M2 -20l20 6M-16 -14l12 -4" stroke="#1f2937" stroke-width="5" stroke-linecap="round" opacity="0"/>
      <path class="mouth" fill="none" stroke="#1f2937" stroke-width="4" stroke-linecap="round"/>
    </g>
    <polyline class="ar1" fill="none" stroke="${shirt}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
  </g></g>`;
const HAIR = '<path d="M-38 -14 Q-30 -48 0 -44 Q30 -48 38 -14 Q20 -34 0 -32 Q-20 -34 -38 -14z" fill="#3b2314"/>';
const HEADSET = '<path d="M-42 -4 A42 42 0 0 1 42 -4" fill="none" stroke="#111827" stroke-width="8"/><rect x="34" y="-14" width="14" height="26" rx="6" fill="#111827"/><path d="M42 10 Q30 30 12 26" fill="none" stroke="#111827" stroke-width="4"/>';
const CAP = '<path d="M-40 -16 Q-36 -46 0 -46 Q36 -46 40 -16z" fill="#16A34A"/><rect x="10" y="-22" width="44" height="10" rx="5" fill="#15803d"/>';
const P2 = (sx, sy, a, L = 55) => [sx + Math.sin(a * Math.PI / 180) * L, sy + Math.cos(a * Math.PI / 180) * L];
function posefig(g, p, t, gnd) {
  p = {f: 1, a1: [10, 10], a2: [-10, -5], lean: 0, dy: 0, tilt: 0, mood: 'ok', kneel: 0, ...p};
  const kn = p.kneel, st = p.sit || 0;
  g.setAttribute('transform', `translate(${p.x},${gnd + p.dy + 70 * kn + 55 * st}) scale(${p.f},1)`);
  g.querySelector('.body').setAttribute('transform', `rotate(${p.lean + p.tilt} 0 0)`);
  const w = p.walk || 0, s1 = p.walk ? Math.sin(w) * 28 : 0;
  const leg = (a, k) => { const k1 = P2(0, -112, a), ft = P2(k1[0], k1[1], a - k); return `0,-112 ${k1} ${ft}`; };
  g.querySelector('.lg1').setAttribute('points', st ? leg(90, 90) : leg(s1 + 85 * kn, (p.walk ? Math.max(0, Math.sin(w)) * 30 : 0) + 170 * kn));
  g.querySelector('.lg2').setAttribute('points', st ? leg(84, 84) : leg(-s1 + 60 * kn, (p.walk ? Math.max(0, -Math.sin(w)) * 30 : 0) + 150 * kn));
  const arm = (a) => { const el = P2(0, -190, a[0], 52), hd = P2(el[0], el[1], a[0] - a[1], 52); return {pts: `0,-190 ${el} ${hd}`, hd}; };
  const sw = p.walk && p.a1[0] < 30 ? Math.sin(w) * 25 : 0;
  const A1 = arm([p.a1[0] + sw, p.a1[1]]), A2 = arm([p.a2[0] - sw, p.a2[1]]);
  g.querySelector('.ar1').setAttribute('points', A1.pts); g.querySelector('.ar2').setAttribute('points', A2.pts);
  g.querySelector('.mouth').setAttribute('d', {ok: 'M-4 14 Q8 20 20 14', happy: 'M-8 10 Q8 30 24 10', angry: 'M-6 20 Q8 10 22 20', oops: 'M2 20 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0'}[p.mood]);
  g.querySelector('.brow').setAttribute('opacity', p.mood === 'angry' ? 1 : 0);
  const hy = gnd + p.dy + 70 * kn + 55 * st;
  return {hand: [p.x + p.f * A1.hd[0], hy + A1.hd[1]], head: [p.x, hy - 246]};
}
const svgOpen = (id, h = 800) => `<svg id="${id}" viewBox="0 0 960 ${h}" width="960" height="${h}" style="position:absolute;left:0;top:0;border-radius:26px;box-shadow:0 30px 70px -20px #000;font-family:Fredoka,sans-serif">
  <defs><clipPath id="cp-${id}"><rect width="960" height="${h}" rx="26"/></clipPath></defs><g clip-path="url(#cp-${id})">`;
const svgClose = '</g></svg>';
const RACK = (x, y) => `<g class="rack"><rect x="${x}" y="${y}" width="110" height="270" rx="10" fill="#1f2937" stroke="#0b1016" stroke-width="5"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${x + 12}" y="${y + 16 + 48 * i}" width="86" height="36" rx="5" fill="#334155"/><circle class="led" cx="${x + 30}" cy="${y + 34 + 48 * i}" r="6" fill="#4ADE80"/><circle class="led" cx="${x + 50}" cy="${y + 34 + 48 * i}" r="6" fill="#4ADE80"/>`).join('')}
  <rect class="rglow" x="${x}" y="${y}" width="110" height="270" rx="10" fill="#FF3B3B" opacity="0"/></g>`;

