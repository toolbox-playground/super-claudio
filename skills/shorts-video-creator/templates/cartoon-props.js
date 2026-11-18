const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#06b6d4', '#ec4899'];
const SKIN = ['#F6C9A0', '#E0A87C', '#C68642', '#8D5524'];
const HAIRC = ['#3b2314', '#111827', '#a16207', '#7c2d12'];
window.TITLE_OUT = -1;
const HERO = (id, c) => `<g id="${id}"><rect x="-9" y="-46" width="18" height="26" rx="5" fill="${c}"/><circle cy="-56" r="10" fill="#F6C9A0"/><rect x="-11" y="-68" width="22" height="7" rx="3" fill="#111827"/>
  <line class="l1" x1="-4" y1="-20" x2="-8" y2="0" stroke="#111827" stroke-width="6" stroke-linecap="round"/><line class="l2" x1="4" y1="-20" x2="8" y2="0" stroke="#111827" stroke-width="6" stroke-linecap="round"/></g>`;
const CITY = (id, w = 680) => `<g id="${id}">
  <defs><linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset=".55" stop-color="#f472b6"/><stop offset="1" stop-color="#fb923c"/></linearGradient></defs>
  <rect width="${w}" height="400" fill="url(#${id}sky)"/><circle cx="${w * .7}" cy="250" r="60" fill="#fde047" opacity=".9"/>
  <g class="far">${Array.from({length: 14}, (_, i) => `<rect x="${i * 100}" y="${200 + (i * 37) % 70}" width="${60 + (i * 13) % 30}" height="200" fill="#4c1d95" opacity=".75"/>`).join('')}</g>
  <g class="mid">${Array.from({length: 10}, (_, i) => `<g transform="translate(${i * 160 + 40},300)"><rect x="-4" y="0" width="8" height="60" fill="#3b0764"/><path d="M0 0 q-30 -10 -44 8 M0 0 q30 -10 44 8 M0 0 q-20 -26 -34 -18 M0 0 q20 -26 34 -18" stroke="#3b0764" stroke-width="7" fill="none" stroke-linecap="round"/></g>`).join('')}</g>
  <rect y="355" width="${w}" height="45" fill="#1f2937"/><g class="lane">${Array.from({length: 16}, (_, i) => `<rect x="${i * 90}" y="375" width="44" height="6" fill="#fde047"/>`).join('')}</g></g>`;
const blink = (root, t) => root.querySelectorAll('.led').forEach((l, i) => l.setAttribute('opacity', Math.sin(t * 7 + i * 2.3) > -.4 ? 1 : .3));
const SRV = (w, h, cls = '', inner = '') => {
  const n = Math.max(2, Math.round((h - 26) / 36)), bh = (h - 26) / n, r = Math.min(5, bh / 6);
  let s = `<g class="${cls}"><rect width="${w}" height="${h}" rx="10" fill="#1f2937" stroke="#0b1016" stroke-width="4"/><rect x="6" y="5" width="${w - 12}" height="8" rx="3" fill="#475569"/>`;
  for (let i = 0; i < n; i++) {
    const y = 18 + i * bh, cy = y + (bh - 6) / 2;
    s += `<rect x="8" y="${y}" width="${w - 16}" height="${bh - 6}" rx="4" fill="#334155"/><circle class="led" cx="20" cy="${cy}" r="${r}" fill="#4ADE80"/><circle class="led" cx="${20 + 3 * r}" cy="${cy}" r="${r}" fill="#38bdf8"/>`;
    s += `<rect x="${20 + 6 * r}" y="${cy - 3}" width="${w * .18}" height="6" rx="3" fill="#1e293b"/>`;
    for (let v = 0; v < 3; v++) s += `<line x1="${w - 18 - v * 8}" y1="${y + 5}" x2="${w - 18 - v * 8}" y2="${y + bh - 11}" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>`;
  }
  return s + `<rect class="hot" width="${w}" height="${h}" rx="10" fill="#ef4444" opacity="0"/>${inner}</g>`;
};
const MINI = (cls, i, kind = 'cart') => {
  const c = COLORS[i % 8], sk = SKIN[i % 4], hc = HAIRC[(i + 1) % 4], p1 = COLORS[(i + 3) % 8];
  const cart = `<g transform="translate(20,0)"><line x1="0" y1="-42" x2="-7" y2="-50" stroke="#475569" stroke-width="3" stroke-linecap="round"/><rect x="5" y="-56" width="11" height="14" rx="2" fill="${p1}"/><rect x="17" y="-52" width="10" height="10" rx="2" fill="#FACC15"/><path d="M0 -42 H34 L29 -18 H5 Z" fill="#e2e8f0" stroke="#475569" stroke-width="2.5" stroke-linejoin="round"/><path d="M9 -42 V-18 M17 -42 V-18 M25 -42 V-18 M2 -31 H32" stroke="#94a3b8" stroke-width="1.5"/><line x1="7" y1="-18" x2="9" y2="-7" stroke="#475569" stroke-width="2.5"/><line x1="27" y1="-18" x2="25" y2="-7" stroke="#475569" stroke-width="2.5"/><circle cx="9" cy="-4" r="4" fill="#1f2937"/><circle cx="25" cy="-4" r="4" fill="#1f2937"/></g>`;
  const phone = `<rect x="9" y="-66" width="11" height="18" rx="2" fill="#0f172a"/><rect class="scrn" x="10.5" y="-64" width="8" height="13" rx="1" fill="#22d3ee"/>`;
  return `<g class="${cls}" opacity="0">${kind === 'cart' ? cart : ''}
    <line class="l1" x1="-4" y1="-26" x2="-5" y2="0" stroke="#334155" stroke-width="7" stroke-linecap="round"/><line class="l2" x1="4" y1="-26" x2="5" y2="0" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
    <rect x="-12" y="-58" width="24" height="34" rx="9" fill="${c}"/>
    <polyline points="${kind === 'cart' ? '6,-52 16,-46 13,-50' : '6,-52 14,-46 14,-56'}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cy="-72" r="14" fill="${sk}" stroke="#1f2937" stroke-width="2"/><path d="M-14 -74 Q-12 -90 0 -88 Q12 -90 14 -74 Q6 -82 0 -82 Q-6 -82 -14 -74z" fill="${hc}"/><circle cx="6" cy="-72" r="2" fill="#1f2937"/><circle cx="-2" cy="-72" r="2" fill="#1f2937"/><path d="M-1 -65 Q3 -62 7 -65" fill="none" stroke="#1f2937" stroke-width="1.6" stroke-linecap="round"/>
    ${kind === 'phone' ? phone : ''}</g>`;
};
const legs = (g, t, moving, k = 0) => { const s = moving ? Math.sin(t * 14 + k) * 6 : 0; g.querySelector('.l1').setAttribute('x2', -5 + s); g.querySelector('.l2').setAttribute('x2', 5 - s); };
const badge = (id, txt, w = 92) => `<g id="${id}" opacity="0"><rect x="${-w / 2}" y="-15" width="${w}" height="30" rx="7" fill="#fff" stroke="#111827" stroke-width="2.5"/><text y="7" text-anchor="middle" font-size="18" font-weight="700" fill="#111827">${txt}</text></g>`;
const SMOKE = (id, x, y) => `<g id="${id}" opacity="0">${[0, 1, 2, 3, 4].map((i) => `<circle class="pf" cx="${x}" cy="${y}" r="18" fill="#94a3b8"/>`).join('')}</g>`;
const smoke = (g, t, t0) => { g.setAttribute('opacity', t > t0 ? 1 : 0); g.querySelectorAll('.pf').forEach((c, i) => { const p = ((t - t0) * .8 + i / 5) % 1; c.setAttribute('transform', `translate(${Math.sin(p * 6 + i) * 16},${-p * 140}) scale(${.6 + p * 1.4})`); c.setAttribute('opacity', 1 - p); }); };
const GAMEHUD = (id) => `<g id="${id}"><rect x="10" y="10" width="200" height="44" rx="10" fill="#000a"/><text class="fps" x="24" y="42" font-size="28" font-weight="700" fill="#4ADE80">60 FPS</text></g>`;
const POST = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="4" fill="#64748b"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 46}" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/><circle cx="${x}" cy="${y - 46}" r="7" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>`;
const BELTLINE = (x1, x2, y, step) => { let s = `<line x1="${x1}" y1="${y - 40}" x2="${x2}" y2="${y - 40}" stroke="#dc2626" stroke-width="6"/>`; for (let x = x1; x <= x2 + 1; x += step) s += POST(x, y); return s; };
