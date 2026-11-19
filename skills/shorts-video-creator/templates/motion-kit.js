// ===== motion-kit.js — movement helpers for shorts (cat after cartoon-props.js, before scenes-body.js) =====
const A = (w, t0) => at(w, nthAfter(w, t0 - 3)) - .25;
const PI2 = Math.PI * 2;
// imagem real dentro de uma moldura, com Ken Burns (zoom e deslocamento contínuos)
const IMG = (id, src, style = '', fit = 'cover', bg = '#0b1016') => `<div class="abs" id="${id}" style="overflow:hidden;border-radius:26px;box-shadow:0 30px 70px -20px #000;background:${bg};${style}"><img src="assets/${src}" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:${fit};transform-origin:50% 50%"></div>`;
function kb(el, t, t0, t1, z0, z1, x0 = 0, y0 = 0, x1 = 0, y1 = 0) {
  const k = inout(t, t0, t1), z = lerp(z0, z1, k);
  el.querySelector('img').style.transform = `translate(${lerp(x0, x1, k)}%,${lerp(y0, y1, k)}%) scale(${z})`;
}
// zoom para um ponto da imagem: (fx, fy) em 0..1, escala z
function zoomTo(el, t, keys) {
  let s = keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [ti, si, d = .8] = keys[i]; if (t < ti) break; const k = inout(t, ti, ti + d); s = {x: lerp(s.x, si.x, k), y: lerp(s.y, si.y, k), z: lerp(s.z, si.z, k)}; }
  const img = el.querySelector('img'); img.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`; img.style.transform = `scale(${s.z})`;
}
// entra deslizando de um lado
function slideIn(el, t, a, from = 'right', dist = 1000, dur = .55) {
  const k = ease(t, a, a + dur), d = (1 - k) * dist;
  const tr = {right: `translateX(${d}px)`, left: `translateX(${-d}px)`, up: `translateY(${-d}px)`, down: `translateY(${d}px)`}[from];
  el.style.opacity = k > 0 ? 1 : 0; el.style.transform = tr; return k;
}
function slideOut(el, t, a, to = 'left', dist = 1000, dur = .45) {
  if (t < a) return; const k = inout(t, a, a + dur), d = k * dist;
  el.style.transform = {right: `translateX(${d}px)`, left: `translateX(${-d}px)`, up: `translateY(${-d}px)`, down: `translateY(${d}px)`}[to];
  if (k >= 1) el.style.opacity = 0;
}
// carimbo: bate grande e assenta
const STAMP = (id, txt, c = '#dc2626', style = '') => `<div class="abs" id="${id}" style="opacity:0;border:8px solid ${c};color:${c};font-weight:800;font-size:58px;padding:6px 26px;border-radius:16px;background:#fff;letter-spacing:2px;${style}">${txt}</div>`;
function stamp(el, t, a, rot = -10) { if (t < a) { el.style.opacity = 0; return; } const k = ease(t, a, a + .22); el.style.opacity = 1; el.style.transform = `rotate(${rot}deg) scale(${2.4 - 1.4 * k})`; }
function shake(el, t, a, b, amp = 10) { const on = t > a && t < b ? 1 : 0; el.style.translate = `${on * Math.sin(t * 60) * amp}px ${on * Math.cos(t * 47) * amp * .5}px`; }
function pulse(el, t, a, c = '74,222,128') { if (t < a) return; const p = .5 + .5 * Math.sin((t - a) * 6); el.style.boxShadow = `0 0 0 ${8 * p}px rgba(${c},${.6 * p}), 0 0 ${60 * p}px rgba(${c},${.5 * p})`; }
// confete em SVG
const CONF = (id, n = 40, w = 960) => `<g id="${id}" opacity="0">${Array.from({length: n}, (_, i) => `<rect class="cf" x="${rnd(i) * w}" y="0" width="${10 + rnd(i, 2) * 10}" height="${6 + rnd(i, 3) * 8}" fill="${COLORS[i % 8]}"/>`).join('')}</g>`;
function conf(g, t, a, h = 900) { g.setAttribute('opacity', t > a ? 1 : 0); g.querySelectorAll('.cf').forEach((r, i) => { const p = (t - a) * (160 + rnd(i, 4) * 200) - rnd(i, 5) * 300; r.setAttribute('transform', `translate(${Math.sin(t * 3 + i) * 30},${p % (h + 100)}) rotate(${(t * 300 + i * 40) % 360})`); }); }
// bolinhas viajando por um caminho (pedidos, pacotes)
const DOTS = (cls, n, c = '#38bdf8', r = 9) => Array.from({length: n}, () => `<circle class="${cls}" r="${r}" fill="${c}" opacity="0"/>`).join('');
function flow(root, sel, t, a, pts, speed = .5, on = true) {
  const segs = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); L += d; }
  const ds = root.querySelectorAll(sel);
  ds.forEach((c, i) => {
    if (!on || t < a) { c.setAttribute('opacity', 0); return; }
    let s = (((t - a) * speed + i / ds.length) % 1) * L, k = 0; while (k < segs.length - 1 && s > segs[k]) { s -= segs[k]; k++; }
    const f = Math.min(1, s / segs[k]); c.setAttribute('cx', lerp(pts[k][0], pts[k + 1][0], f)); c.setAttribute('cy', lerp(pts[k][1], pts[k + 1][1], f)); c.setAttribute('opacity', 1);
  });
}
// navegador em HTML: barra com cadeado + endereço
const BROWSER = (id, url, body, style = '', lockId = '') => `<div class="abs" id="${id}" style="border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 30px 70px -20px #000;${style}">
  <div style="height:64px;background:#e5e7eb;display:flex;align-items:center;gap:10px;padding:0 18px"><i style="width:16px;height:16px;border-radius:50%;background:#FF5F57"></i><i style="width:16px;height:16px;border-radius:50%;background:#FEBC2E"></i><i style="width:16px;height:16px;border-radius:50%;background:#28C840"></i>
  <div style="flex:1;margin-left:14px;height:44px;border-radius:22px;background:#fff;display:flex;align-items:center;padding:0 18px;font:500 24px Inter,sans-serif;color:#111827"><span ${lockId ? `id="${lockId}"` : ''} style="display:inline-block;margin-right:12px">🔒</span><span class="url">${url}</span></div></div>
  <div class="bbody" style="position:relative;height:calc(100% - 64px)">${body}</div></div>`;
// celular em HTML
const PHONE = (id, body, style = '') => `<div class="abs" id="${id}" style="width:330px;height:640px;border-radius:46px;background:#0f172a;padding:16px;box-shadow:0 30px 70px -20px #000;${style}"><div style="position:relative;width:100%;height:100%;border-radius:32px;overflow:hidden;background:#f8fafc">${body}</div></div>`;
// relógio em SVG
const CLOCK = (id, x, y, r = 70) => `<g id="${id}" transform="translate(${x},${y})"><circle r="${r}" fill="#fff" stroke="#111827" stroke-width="6"/>${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${-r + 8}" x2="0" y2="${-r + 18}" stroke="#111827" stroke-width="4" transform="rotate(${i * 30})"/>`).join('')}<line class="hh" x1="0" y1="0" x2="0" y2="${-r * .5}" stroke="#111827" stroke-width="8" stroke-linecap="round"/><line class="mm" x1="0" y1="0" x2="0" y2="${-r * .78}" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/><circle r="7" fill="#111827"/></g>`;
function clock(g, hours) { g.querySelector('.hh').setAttribute('transform', `rotate(${hours * 30})`); g.querySelector('.mm').setAttribute('transform', `rotate(${hours * 360})`); }
// interruptor
const SWITCH = (x, y, id, s = 1) => `<g id="${id}" transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-45" width="180" height="90" rx="45" fill="#334155" class="trk"/><circle class="knb" cx="-45" r="36" fill="#fff"/></g>`;
function sw(root, id, on) { root.querySelector(`#${id} .knb`).setAttribute('cx', -45 + 90 * on); root.querySelector(`#${id} .trk`).setAttribute('fill', on > .5 ? '#16A34A' : '#334155'); }
// cartão com logo real
const LOGOCARD = (id, src, name, sub, style = '') => `<div class="abs" id="${id}" style="display:flex;align-items:center;gap:26px;background:#13283f;border:3px solid #2F5F8F;border-radius:22px;padding:18px 26px;opacity:0;${style}"><div style="width:150px;height:96px;background:#fff;border-radius:14px;display:grid;place-items:center;padding:10px">${src.startsWith('<') ? src : `<img src="assets/${src}" style="max-width:130px;max-height:76px;object-fit:contain">`}</div><div><div style="font-size:40px;font-weight:700">${name}</div><div style="font-size:26px;color:#8FCBFF">${sub}</div></div></div>`;
const CREDIT = (txt, top = 915) => `<div class="abs" style="left:0;top:${top}px;font-size:20px;color:#94a3b8">${txt}</div>`;
