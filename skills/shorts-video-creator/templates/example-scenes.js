// helpers vêm de lib12.js (CITY, HERO) e lib13.js (SRV, MINI, legs, badge, blink)
const SMOKE = (id, x, y) => `<g id="${id}" opacity="0">${[0, 1, 2, 3, 4].map((i) => `<circle class="pf" cx="${x}" cy="${y}" r="18" fill="#94a3b8"/>`).join('')}</g>`;
const smoke = (g, t, t0) => { g.setAttribute('opacity', t > t0 ? 1 : 0); g.querySelectorAll('.pf').forEach((c, i) => { const p = ((t - t0) * .8 + i / 5) % 1; c.setAttribute('transform', `translate(${Math.sin(p * 6 + i) * 16},${-p * 140}) scale(${.6 + p * 1.4})`); c.setAttribute('opacity', 1 - p); }); };
const GAMEHUD = (id) => `<g id="${id}"><rect x="10" y="10" width="200" height="44" rx="10" fill="#000a"/><text class="fps" x="24" y="42" font-size="28" font-weight="700" fill="#4ADE80">60 FPS</text></g>`;

// ===================== 0 · GANCHO: a frase do Fowler =====================
const PIECES = [['catálogo', '#2563EB'], ['carrinho', '#F97316'], ['pagamento', '#7C3AED'], ['login', '#16A34A'], ['busca', '#0891b2'], ['frete', '#db2777']];
S.push({id: 'gancho', html: `
  <div class="kick">Monólito × microsserviços</div><h1>Como nasce um <em>microsserviço</em></h1>
  <div class="stage">
    <div class="card" id="q" style="left:0;top:0;width:960px;height:400px;opacity:0;padding:34px 40px">
      <div style="font-size:90px;line-height:.6;color:#4ADE80">“</div>
      <div class="mid" style="font-size:38px;line-height:1.25">Quase todo caso de sucesso de microsserviços começou como um <span class="green">monólito que cresceu demais</span> e foi <span class="yellow">quebrado</span>.</div>
      <div style="font-size:22px;color:#8FCBFF;margin-top:16px;font-style:italic">"Almost all the successful microservice stories have started with a monolith that got too big and was broken up"</div>
      <div style="font-size:26px;font-weight:700;margin-top:14px">— Martin Fowler, "MonolithFirst" (2015)</div></div>
    ${svgOpen('gq', 540).replace('top:0', 'top:430px')}
      <rect width="960" height="540" fill="#0d1f36"/>
      <g id="mono"><rect x="330" y="140" width="300" height="260" rx="24" fill="#1e3a8a" stroke="#8FCBFF" stroke-width="5"/><text x="480" y="285" text-anchor="middle" font-size="40" font-weight="700" fill="#fff">MONÓLITO</text>
        <path id="crack" d="M480 140 L455 210 L500 260 L465 330 L480 400 M330 270 L400 280 L455 210 M630 250 L560 262 L500 260" fill="none" stroke="#FACC15" stroke-width="6" stroke-linecap="round" opacity="0"/></g>
      ${PIECES.map(([n, c]) => `<g class="pc" opacity="0"><rect x="-80" y="-40" width="160" height="80" rx="16" fill="${c}" stroke="#fff" stroke-width="3"/><text y="10" text-anchor="middle" font-size="26" font-weight="700" fill="#fff">${n}</text></g>`).join('')}
      <text id="qm" x="480" y="300" text-anchor="middle" font-size="200" font-weight="700" fill="#FACC15" opacity="0">?</text>
    ${svgClose}
  </div>`,
  draw(t, $) {
    pop($('#q'), t, .1);
    const tC = at('cresceu') - .2, tQ = at('quebrado') - .2, tD = at('diferenca') - .3;
    const sc = 1 + .3 * ease(t, tC, tC + .8), sh = t > tC + .6 && t < tQ + .3 ? Math.sin(t * 40) * 4 : 0;
    const m = $('#mono'); m.setAttribute('transform', `translate(${480 + sh},270) scale(${sc}) translate(-480,-270)`);
    $('#crack').setAttribute('opacity', ease(t, tQ - .1, tQ + .1)); m.setAttribute('opacity', 1 - ease(t, tQ + .4, tQ + .6));
    this.$$('.pc').forEach((g, i) => {
      const k = ease(t, tQ + .4, tQ + 1.3), a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      g.setAttribute('opacity', t > tQ + .4 ? 1 : 0);
      g.setAttribute('transform', `translate(${480 + Math.cos(a) * 330 * k},${270 + Math.sin(a) * 190 * k + Math.sin(t * 3 + i) * 4 * k}) scale(${lerp(.6, 1, k)})`);
    });
    $('#qm').setAttribute('opacity', ease(t, tD, tD + .3));
  }});

// ===================== 1 · o notebook: tudo soldado numa placa só =====================
S.push({id: 'notebook', word: 'Imagina', html: `
  <div class="kick">Imagina o seguinte cenário</div><h1>O <em>notebook</em>: tudo numa peça só</h1>
  <div class="stage">
  ${svgOpen('nb', 900)}
    <rect width="960" height="900" fill="#E5EEF6"/><rect y="700" width="960" height="28" fill="#92400e"/><rect y="728" width="960" height="172" fill="#cbd5e1"/>
    <g id="lap">
      <rect x="300" y="360" width="420" height="300" rx="18" fill="#1f2937" stroke="#0b1016" stroke-width="5"/>
      <defs><clipPath id="nbs"><rect x="320" y="380" width="380" height="226" rx="6"/></clipPath></defs>
      <g clip-path="url(#nbs)"><g transform="translate(320,380) scale(.56)">${CITY('cn')}<g transform="translate(300,355)">${HERO('hn', '#2563EB')}</g>${GAMEHUD('hudn')}</g>
        <rect id="blk" x="320" y="380" width="380" height="226" fill="#020617" opacity="0"/>
        <path id="crk" d="M420 380 L470 470 L440 520 L520 606 M470 470 L600 440" fill="none" stroke="#e2e8f0" stroke-width="4" opacity="0"/></g>
      <rect x="320" y="614" width="380" height="36" rx="4" fill="#1f2937"/><text x="510" y="638" text-anchor="middle" font-size="18" fill="#94a3b8">TBX Book</text>
      <path d="M260 660 H760 L790 700 H230 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
      ${Array.from({length: 22}, (_, i) => `<rect x="${290 + (i % 11) * 40}" y="${666 + Math.floor(i / 11) * 14}" width="32" height="9" rx="2" fill="#94a3b8"/>`).join('')}
      ${SMOKE('smk', 510, 380)}
    </g>
    <g id="inside" opacity="0"><rect x="150" y="30" width="660" height="290" rx="20" fill="#14532d" stroke="#4ADE80" stroke-width="4"/>
      <text x="480" y="72" text-anchor="middle" font-size="28" font-weight="700" fill="#fff">por dentro: uma placa só</text>
      ${[['CPU', 190, 100], ['memória', 340, 100], ['placa de vídeo', 490, 100], ['SSD', 690, 100]].map(([n, x, y]) => `<rect x="${x}" y="${y}" width="${n === 'placa de vídeo' ? 180 : n === 'SSD' ? 100 : 130}" height="110" rx="10" fill="#1f2937" stroke="#94a3b8" stroke-width="3"/><text x="${x + (n === 'placa de vídeo' ? 90 : n === 'SSD' ? 50 : 65)}" y="${y + 62}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${n}</text>`).join('')}
      ${Array.from({length: 26}, (_, i) => `<circle class="sd" cx="${190 + (i % 13) * 48}" cy="${230 + Math.floor(i / 13) * 34}" r="7" fill="#FACC15"/>`).join('')}
      <text x="480" y="306" text-anchor="middle" font-size="22" font-weight="700" fill="#FACC15">🔒 tudo soldado</text></g>
    <g id="box" opacity="0"><rect x="0" y="0" width="300" height="200" rx="10" fill="#d97706" stroke="#78350f" stroke-width="5"/><path d="M0 60 H300" stroke="#78350f" stroke-width="4"/><text x="150" y="130" text-anchor="middle" font-size="30" font-weight="700" fill="#fff">ASSISTÊNCIA 🔧</text></g>
    <g id="noGpu" opacity="0"><rect x="250" y="80" width="460" height="130" rx="18" fill="#fff" stroke="#b91c1c" stroke-width="5"/><text x="480" y="132" text-anchor="middle" font-size="28" font-weight="700" fill="#111827">trocar só a placa de vídeo?</text><text x="480" y="182" text-anchor="middle" font-size="34" font-weight="700" fill="#b91c1c">✗ soldada na placa</text></g>
    <g transform="scale(1)">${FIG('dv', '#2563EB', HAIR)}</g>
  ${svgClose}
  ${tag('n1', '🐌 jogo pesado travando', 'left:0;top:918px;font-size:38px', 'r')}
  ${tag('n2', '💸 é outro notebook', 'left:560px;top:918px;font-size:38px', 'y')}
  </div>`,
  draw(t, $) {
    const tS = at('soldado') - .3, tQ = at('queima', 1) - .2, tA = at('assistencia') - .3, tJ = at('jogo', 1) - .3, tT = at('trocar', 1) - .3, tO = at('outro') - .2, tEnd = at('Agora');
    $('#inside').setAttribute('opacity', ease(t, tS, tS + .3) * (1 - ease(t, tQ - .3, tQ)));
    this.$$('.sd').forEach((c, i) => c.setAttribute('opacity', .5 + .5 * Math.sin(t * 8 + i)));
    const burnt = t > tQ && t < tA + 1.4;
    $('#blk').setAttribute('opacity', burnt ? 1 : 0); $('#crk').setAttribute('opacity', burnt ? 1 : 0);
    smoke($('#smk'), t, burnt ? tQ : 1e9);
    // vai inteiro pra assistência e volta
    const go = ease(t, tA, tA + .7), back = ease(t, tA + 1.2, tA + 1.7), k = go * (1 - back);
    $('#lap').setAttribute('transform', `translate(${lerp(0, 380, k)},${lerp(0, 60, k)}) scale(${lerp(1, .45, k)})`);
    const bx = $('#box'); bx.setAttribute('opacity', ease(t, tA - .2, tA + .1) * (1 - ease(t, tA + 1.1, tA + 1.3))); bx.setAttribute('transform', 'translate(620,470)');
    // jogo pesado: travando a 5 FPS
    const heavy = t > tJ, fps = heavy ? 5 : 60, step = heavy ? Math.floor(t * 5) / 5 : t;
    $('#hudn .fps').textContent = `${fps} FPS`; $('#hudn .fps').setAttribute('fill', heavy ? '#FF7B7B' : '#4ADE80');
    $('#cn .lane').setAttribute('transform', `translate(${-((step * 260) % 90)},0)`); $('#cn .mid').setAttribute('transform', `translate(${-((step * 60) % 160)},0)`);
    $('#noGpu').setAttribute('opacity', ease(t, tT, tT + .3));
    // dev ao lado da mesa
    const mood = burnt ? 'oops' : heavy ? 'angry' : 'happy';
    posefig($('#dv'), {x: 150, f: 1, a1: t > tO ? [150, 20] : burnt ? [140, 60] : [30, 20], a2: burnt ? [140, 60] : [-15, -5], mood}, t, 880);
    pop($('#n1'), t, tJ + .3); pop($('#n2'), t, tO);
  }});

// ===================== 2 · o PC montado peça por peça =====================
const PARTS = [
  {id: 'gpu', n: 'placa de vídeo', w: 230, h: 60, c: '#334155', home: [610, 470], out: [80, 90], slot: 'PCIe'},
  {id: 'ram', n: 'memória', w: 28, h: 120, c: '#16A34A', home: [800, 280], out: [380, 60], slot: 'DIMM'},
  {id: 'ssd', n: 'SSD', w: 90, h: 34, c: '#0ea5e9', home: [640, 380], out: [80, 280], slot: 'M.2'},
  {id: 'psu', n: 'fonte', w: 200, h: 90, c: '#1f2937', home: [620, 600], out: [300, 300], slot: ''}];
const PART = (p) => {
  let inner = '';
  if (p.id === 'gpu') inner = `<circle class="fan" cx="60" cy="30" r="22" fill="#1f2937" stroke="#94a3b8" stroke-width="3"/><circle class="fan" cx="150" cy="30" r="22" fill="#1f2937" stroke="#94a3b8" stroke-width="3"/><rect x="0" y="54" width="120" height="8" fill="#FACC15"/>`;
  if (p.id === 'ram') inner = `${[0, 1, 2, 3].map((i) => `<rect x="5" y="${10 + i * 26}" width="18" height="18" rx="2" fill="#0f172a"/>`).join('')}<rect x="0" y="114" width="28" height="6" fill="#FACC15"/>`;
  if (p.id === 'ssd') inner = '<rect x="10" y="8" width="40" height="18" rx="2" fill="#0f172a"/><rect x="80" y="8" width="10" height="18" fill="#FACC15"/>';
  if (p.id === 'psu') inner = '<circle cx="100" cy="45" r="32" fill="#0f172a" stroke="#475569" stroke-width="4"/><path d="M100 13 V77 M68 45 H132" stroke="#475569" stroke-width="4"/>';
  return `<g id="${p.id}"><rect width="${p.w}" height="${p.h}" rx="8" fill="${p.c}" stroke="#0b1016" stroke-width="3"/>${inner}<text class="pl" x="${p.w / 2}" y="${-12}" text-anchor="middle" font-size="22" font-weight="700" fill="#012949" opacity="0">${p.n}</text></g>`;
};
S.push({id: 'pc', word: 'Agora', html: `
  <div class="kick">Agora pensa num</div><h1>PC montado <em>peça por peça</em></h1>
  <div class="stage">
  ${svgOpen('pcs', 900)}
    <rect width="960" height="900" fill="#E5EEF6"/><rect y="760" width="960" height="28" fill="#92400e"/><rect y="788" width="960" height="112" fill="#cbd5e1"/>
    <g id="mon"><rect x="40" y="380" width="420" height="270" rx="16" fill="#1f2937" stroke="#0b1016" stroke-width="5"/>
      <defs><clipPath id="mcs"><rect x="56" y="396" width="388" height="232" rx="6"/></clipPath></defs>
      <g clip-path="url(#mcs)"><g transform="translate(56,396) scale(.57)">${CITY('cm')}<g transform="translate(300,355)">${HERO('hm', '#2563EB')}</g>${GAMEHUD('hudm')}</g><rect id="mblk" x="56" y="396" width="388" height="232" fill="#020617" opacity="0"/></g>
      <rect x="220" y="650" width="60" height="80" fill="#475569"/><rect x="150" y="728" width="200" height="32" rx="8" fill="#334155"/>${SMOKE('msmk', 250, 400)}</g>
    <g id="tower"><rect x="540" y="200" width="380" height="560" rx="18" fill="#111827" stroke="#0b1016" stroke-width="6"/>
      <rect x="560" y="220" width="340" height="520" rx="10" fill="#1e293b"/>
      <rect x="580" y="240" width="300" height="320" rx="6" fill="#14532d" stroke="#166534" stroke-width="3"/><text x="730" y="268" text-anchor="middle" font-size="18" font-weight="700" fill="#86efac">placa-mãe</text>
      <rect x="690" y="290" width="70" height="70" rx="6" fill="#334155" stroke="#94a3b8" stroke-width="2"/><text x="725" y="332" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">CPU</text>
      <g id="slots" opacity="0"><rect x="796" y="270" width="36" height="134" rx="4" fill="none" stroke="#FACC15" stroke-width="4"/><text x="814" y="424" text-anchor="middle" font-size="16" font-weight="700" fill="#FACC15">DIMM</text>
        <rect x="604" y="526" width="238" height="14" rx="4" fill="none" stroke="#FACC15" stroke-width="4"/><text x="860" y="540" font-size="16" font-weight="700" fill="#FACC15">PCIe</text>
        <rect x="636" y="376" width="98" height="42" rx="4" fill="none" stroke="#FACC15" stroke-width="4"/><text x="685" y="440" text-anchor="middle" font-size="16" font-weight="700" fill="#FACC15">M.2</text></g>
      <circle id="pled" cx="880" cy="720" r="9" fill="#4ADE80"/></g>
    ${PARTS.map(PART).join('')}
    <g id="newgpu" opacity="0"><rect width="230" height="60" rx="8" fill="#7C3AED" stroke="#0b1016" stroke-width="3"/><circle class="fan" cx="60" cy="30" r="22" fill="#1f2937" stroke="#e9d5ff" stroke-width="3"/><circle class="fan" cx="150" cy="30" r="22" fill="#1f2937" stroke="#e9d5ff" stroke-width="3"/><rect id="rgb" x="0" y="0" width="230" height="6" rx="3" fill="#ec4899"/><rect x="0" y="54" width="120" height="8" fill="#FACC15"/><text x="115" y="-12" text-anchor="middle" font-size="22" font-weight="700" fill="#7C3AED">placa de vídeo nova ✨</text></g>
    <text id="click" font-size="44" opacity="0">✨</text>
  ${svgClose}
  ${tag('p1', '🔌 encaixes padrão', 'left:0;top:918px;font-size:38px', '')}
  ${tag('p2', '✅ troca só a placa de vídeo', 'left:0;top:918px;font-size:38px', 'g')}
  ${tag('p3', '🖥️ monitor queimou, PC ligado ✓', 'left:0;top:918px;font-size:38px', 'y')}
  </div>`,
  draw(t, $) {
    const tP = at('peca', 1) - .3, tE = at('encaixes') - .3, tJ = at('jogo', 2) - .3, tT = at('trocar', 2) - .3, tQ = at('queima', 2) - .2, tL = at('ligado') - .3;
    const tPart = {gpu: at('placa', 3) - .3, ram: at('memoria') - .3, ssd: at('SSD') - .3, psu: at('separadas') - .3};
    // vista explodida: cada peça sai do gabinete quando é nomeada e volta no encaixe
    $('#mon').setAttribute('opacity', 1 - .75 * ease(t, tP, tP + .4) * (1 - ease(t, tE + .6, tE + 1.1)));
    PARTS.forEach((p) => {
      const g = $('#' + p.id), out = ease(t, tPart[p.id], tPart[p.id] + .6) * (1 - ease(t, tE + .3, tE + 1));
      let x = lerp(p.home[0], p.out[0], out), y = lerp(p.home[1], p.out[1], out);
      if (p.id === 'gpu') { const o2 = ease(t, tT, tT + .5); x += -500 * o2; y += 180 * o2; g.setAttribute('opacity', 1 - ease(t, tT + .4, tT + .6)); }
      g.setAttribute('transform', `translate(${x},${y})`); g.querySelector('.pl').setAttribute('opacity', out);
      g.querySelectorAll('.fan').forEach((f) => f.setAttribute('stroke-dasharray', '10 6')); g.querySelectorAll('.fan').forEach((f) => f.setAttribute('stroke-dashoffset', t * 60));
    });
    $('#slots').setAttribute('opacity', ease(t, tE, tE + .3) * (1 - ease(t, tJ, tJ + .3)) * (.6 + .4 * Math.sin(t * 8)));
    // troca só a placa de vídeo
    const ng = $('#newgpu'), ki = ease(t, tT + .5, tT + 1.1);
    ng.setAttribute('opacity', t > tT + .4 ? 1 : 0); ng.setAttribute('transform', `translate(${lerp(1000, 610, ki)},${lerp(260, 470, ki)})`);
    ng.querySelectorAll('.fan').forEach((f) => { f.setAttribute('stroke-dasharray', '10 6'); f.setAttribute('stroke-dashoffset', t * 90); });
    $('#rgb').setAttribute('fill', ['#ec4899', '#22d3ee', '#4ADE80', '#FACC15'][Math.floor(t * 4) % 4]);
    const ck = $('#click'); ck.setAttribute('opacity', t > tT + 1.05 && t < tT + 1.7 ? 1 : 0); ck.setAttribute('x', 700); ck.setAttribute('y', 450);
    // jogo no monitor: trava antes, roda liso depois da placa nova
    const heavy = t > tJ && t < tT + 1.1, fps = heavy ? 5 : 60, step = heavy ? Math.floor(t * 5) / 5 : t;
    $('#hudm .fps').textContent = `${fps} FPS`; $('#hudm .fps').setAttribute('fill', heavy ? '#FF7B7B' : '#4ADE80');
    $('#cm .lane').setAttribute('transform', `translate(${-((step * 260) % 90)},0)`); $('#cm .mid').setAttribute('transform', `translate(${-((step * 60) % 160)},0)`);
    // monitor queima, PC continua ligado
    const burnt = t > tQ; $('#mblk').setAttribute('opacity', burnt ? 1 : 0); smoke($('#msmk'), t, burnt ? tQ : 1e9);
    $('#pled').setAttribute('opacity', .5 + .5 * Math.sin(t * 6));
    pop($('#p1'), t, tE); $('#p1').style.opacity *= 1 - ease(t, tT - .2, tT);
    pop($('#p2'), t, tT + 1.1); $('#p2').style.opacity *= 1 - ease(t, tQ - .2, tQ);
    pop($('#p3'), t, tL);
  }});

// ===================== 3 · a virada + o de-para =====================
const SVC = [['catálogo', '#2563EB'], ['carrinho', '#F97316'], ['pagamento', '#7C3AED']];
S.push({id: 'depara', word: 'No', nth: nthAfter('No', 40), html: `
  <div class="kick">No desenvolvimento de software</div><h1>É <em>igual</em></h1>
  <div class="stage">
  ${svgOpen('dp')}
    <rect width="960" height="800" fill="#0d1f36"/>
    <g id="L" opacity="0"><text x="230" y="60" text-anchor="middle" font-size="30" font-weight="700" fill="#8FCBFF">💻 notebook ≈ monólito</text>
      <rect x="50" y="100" width="360" height="470" rx="24" fill="#1e3a8a" stroke="#8FCBFF" stroke-width="5"/><text x="230" y="150" text-anchor="middle" font-size="32" font-weight="700" fill="#fff">MONÓLITO</text>
      ${SVC.map(([n, c], i) => `<rect x="80" y="${180 + i * 100}" width="300" height="90" fill="${c}" opacity=".85"/><text x="230" y="${236 + i * 100}" text-anchor="middle" font-size="28" font-weight="700" fill="#fff">${n}</text>`).join('')}
      <g id="Lcode" opacity="0"><text x="230" y="520" text-anchor="middle" font-size="24" font-weight="700" fill="#FACC15">1 base de código</text></g>
      <g id="Ldep" opacity="0"><rect x="120" y="600" width="220" height="56" rx="14" fill="#FACC15"/><text x="230" y="637" text-anchor="middle" font-size="26" font-weight="700" fill="#111827">🚀 1 deploy</text></g></g>
    <line x1="480" y1="30" x2="480" y2="700" stroke="#2F5F8F" stroke-width="3" stroke-dasharray="10 8"/>
    <g id="R" opacity="0"><text x="720" y="60" text-anchor="middle" font-size="30" font-weight="700" fill="#4ADE80">🖥️ PC montado ≈ microsserviços</text>
      ${SVC.map(([n, c], i) => `<g class="ms"><rect x="560" y="${110 + i * 190}" width="320" height="120" rx="18" fill="${c}" stroke="#fff" stroke-width="3"/><text x="720" y="${160 + i * 190}" text-anchor="middle" font-size="30" font-weight="700" fill="#fff">${n}</text><text class="mr" x="720" y="${200 + i * 190}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" opacity="0">🚀 deploy próprio</text></g>`).join('')}
      ${[0, 1].map((i) => `<g class="plug" opacity="0"><rect x="696" y="${232 + i * 190}" width="48" height="66" rx="8" fill="#e2e8f0" stroke="#0b1016" stroke-width="3"/><rect x="706" y="${244 + i * 190}" width="10" height="16" fill="#334155"/><rect x="724" y="${244 + i * 190}" width="10" height="16" fill="#334155"/><g class="apil" opacity="0"><rect x="760" y="${244 + i * 190}" width="${i ? 170 : 160}" height="40" rx="10" fill="#FACC15"/><text x="${760 + (i ? 85 : 80)}" y="${271 + i * 190}" text-anchor="middle" font-size="20" font-weight="700" fill="#111827">${i ? 'POST /pagar' : 'GET /carrinho'}</text></g></g>`).join('')}</g>
  ${svgClose}
  <div class="abs" id="cc" style="left:0;top:0;width:960px;height:800px;border-radius:26px;opacity:0;z-index:8;overflow:hidden;background:radial-gradient(circle at 50% 30%,#1d4ed8 0,#0b1530 70%);text-align:center">
    <div style="font-size:130px;margin-top:70px" class="emoji">🧱 → 🧩</div>
    <div class="big" style="font-size:76px;margin-top:20px">Monólito × Microsserviços</div>
    <div class="mid" style="font-size:40px;color:#8FCBFF;margin-top:10px">arquitetura de software</div>
    <div style="display:flex;justify-content:center;gap:50px;margin-top:40px"><img src="assets/docker.png" style="height:110px;background:#fff;border-radius:20px;padding:12px 18px"><img src="assets/kubernetes.png" style="height:110px"></div></div>
  ${tag('d1', '💻 notebook ≈ monólito', 'left:0;top:824px;font-size:28px', '')}${tag('d2', '🖥️ PC montado ≈ microsserviços', 'left:430px;top:824px;font-size:28px', 'g')}
  ${tag('d3', '🧩 peça ≈ microsserviço', 'left:0;top:882px;font-size:28px', 'y')}${tag('d4', '🔌 encaixe ≈ API', 'left:430px;top:882px;font-size:28px', 'g')}
  </div>`,
  draw(t, $) {
    const tOut = at('notebook', 4) - .5, tMo = at('monolito', 2) - .3, tB = at('base') - .3, tDe = at('deploy', 1) - .3, tMs = at('microsservicos', 2) - .3, tPe = at('peca', 3) - .3;
    const tSv = [at('catalogo', 1) - .2, at('carrinho', 1) - .2, at('pagamento', 1) - .2], tEn = at('encaixe') - .3, tApi = at('API', 1) - .2;
    $('#cc').style.opacity = ease(t, this.t, this.t + .25) * (1 - ease(t, tOut, tOut + .3));
    $('#L').setAttribute('opacity', ease(t, tOut, tOut + .4)); $('#Lcode').setAttribute('opacity', ease(t, tB, tB + .3)); $('#Ldep').setAttribute('opacity', ease(t, tDe, tDe + .3));
    $('#R').setAttribute('opacity', ease(t, tMs - .6, tMs - .2));
    this.$$('.ms').forEach((g, i) => {
      const k = ease(t, tMs + .25 * i, tMs + .25 * i + .4), hl = t > tSv[i] && t < tSv[i] + .7 ? 1.06 : 1;
      g.setAttribute('opacity', k); g.setAttribute('transform', `translate(720,${170 + i * 190}) scale(${hl}) translate(-720,${-170 - i * 190 + (1 - k) * 30})`);
      g.querySelector('.mr').setAttribute('opacity', ease(t, tMs + .8, tMs + 1.1));
    });
    this.$$('.plug').forEach((g) => g.setAttribute('opacity', ease(t, tEn, tEn + .3)));
    this.$$('.apil').forEach((g) => g.setAttribute('opacity', ease(t, tApi, tApi + .3)));
    pop($('#d1'), t, tMo); pop($('#d2'), t, tMs); pop($('#d3'), t, tPe); pop($('#d4'), t, tEn + .4);
  }});

// ===================== 4 · arquitetura: contêineres, API, falha isolada, escala, orquestrador =====================
const CONT = (n, c) => `<rect x="-130" y="-70" width="260" height="140" rx="12" fill="${c}" stroke="#0b1016" stroke-width="4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="${-110 + i * 31}" y1="-58" x2="${-110 + i * 31}" y2="58" stroke="#0005" stroke-width="5"/>`).join('')}
  <rect x="-110" y="-26" width="220" height="52" rx="10" fill="#fff"/><text y="10" text-anchor="middle" font-size="28" font-weight="700" fill="#111827">${n}</text>`;
const SCX = [170, 480, 790];
S.push({id: 'arq', word: 'Cada', nth: nthAfter('Cada', 66), html: page('Como funciona', 'Cada um no seu <em>contêiner</em>', `
  ${svgOpen('aq', 940)}
    <rect width="960" height="940" fill="#0d1f36"/>
    <text x="24" y="34" font-size="22" font-weight="700" fill="#8FCBFF">👥 clientes</text>
    ${Array.from({length: 7}, (_, i) => `<g transform="translate(${90 + 130 * i},160) scale(1.4)">${MINI('ac', i, 'phone').replace('opacity="0"', '')}</g>`).join('')}
    <g><rect x="250" y="190" width="460" height="100" rx="16" fill="#fff" stroke="#8FCBFF" stroke-width="4"/><rect x="262" y="202" width="436" height="36" rx="6" fill="#012949"/><text x="280" y="228" font-size="22" font-weight="700" fill="#fff">🛍️ TBX Shop</text><text x="686" y="228" text-anchor="end" font-size="18" font-weight="700" fill="#FACC15">BLACK FRIDAY</text><text x="480" y="274" text-anchor="middle" font-size="20" font-weight="700" fill="#334155">app (front-end)</text></g>
    ${SCX.map((x, i) => `<line class="wire" x1="480" y1="292" x2="${x}" y2="400" stroke="#8FCBFF" stroke-width="4" stroke-dasharray="10 8"/><g class="hl" opacity="0"><rect x="${(480 + x) / 2 - 40}" y="326" width="80" height="34" rx="8" fill="#FACC15"/><text x="${(480 + x) / 2}" y="350" text-anchor="middle" font-size="20" font-weight="700" fill="#111827">HTTP</text></g>`).join('')}
    <g id="k8s" opacity="0"><rect x="14" y="380" width="932" height="440" rx="24" fill="#326ce51a" stroke="#326ce5" stroke-width="5" stroke-dasharray="16 10"/><image href="assets/kubernetes.png" x="30" y="766" width="46" height="46"/><text x="86" y="800" font-size="26" font-weight="700" fill="#8FCBFF">Kubernetes (orquestrador)</text></g>
    ${SCX.map((x, i) => `<g class="ct" transform="translate(${x},480)">${CONT(SVC[i][0], SVC[i][1])}<image href="assets/docker.png" x="80" y="-100" width="56" height="44"/><g class="rk" opacity="0"><rect x="-70" y="78" width="140" height="34" rx="10" fill="#FACC15"/><text y="102" text-anchor="middle" font-size="20" font-weight="700" fill="#111827">🚀 deploy</text></g><rect class="rdx" x="-130" y="-70" width="260" height="140" rx="12" fill="#ef4444" opacity="0"/><text class="xx" y="-84" text-anchor="middle" font-size="54" font-weight="700" fill="#FF5A5A" opacity="0">✗</text><text class="ok" x="0" y="-84" text-anchor="middle" font-size="44" font-weight="700" fill="#4ADE80" opacity="0">✓</text></g>`).join('')}
    ${[0, 1, 2, 3].map((j) => `<g class="rep" opacity="0"><g transform="translate(${330 + j * 100},680) scale(.32)">${CONT('', '#F97316')}</g></g>`).join('')}
    <text id="repl" x="480" y="738" text-anchor="middle" font-size="24" font-weight="700" fill="#FDBA74" opacity="0">carrinho × 4 réplicas</text>
    ${Array.from({length: 12}, () => '<circle class="dt" r="9" fill="#FACC15" stroke="#92400e" stroke-width="2"/>').join('')}
  ${svgClose}
  ${tag('a1', '✓ catálogo continua no ar', 'left:0;top:950px;font-size:34px', 'g')}
  ${tag('a2', '🔥 Black Friday: escala só o carrinho', 'left:0;top:950px;font-size:34px', 'y')}
  ${tag('a3', '♻️ o orquestrador reinicia o que caiu', 'left:0;top:950px;font-size:34px', '')}`),
  draw(t, $) {
    const tC = at('conteiner', 1) - .3, tD = at('deploy', 2) - .3, tH = at('HTTP') - .3, tPg = at('pagamento', 2) - .2, tCa = at('catalogo', 2) - .2, tBf = at('Black') - .3, tCr = at('carrinho', 2) - .3, tO = at('orquestrador') - .3, tK = at('Kubernetes') - .1;
    this.$$('.ct').forEach((g, i) => {
      const k = ease(t, this.t + .2 * i, this.t + .2 * i + .4); g.setAttribute('opacity', k);
      g.querySelector('.rk').setAttribute('opacity', ease(t, tD + .15 * i, tD + .15 * i + .3));
      const down = i === 2 && t > tPg && t < tK + .4;
      g.querySelector('.rdx').setAttribute('opacity', down ? .55 : 0); g.querySelector('.xx').setAttribute('opacity', down ? 1 : 0);
      g.querySelector('.ok').setAttribute('opacity', (i === 0 && t > tCa && t < tBf) || (i === 2 && t > tK + .4) ? 1 : 0);
    });
    this.$$('.hl').forEach((g) => g.setAttribute('opacity', ease(t, tH, tH + .3)));
    this.$$('.wire').forEach((l, i) => l.setAttribute('stroke', i === 2 && t > tPg && t < tK + .4 ? '#ef4444' : '#8FCBFF'));
    // requisições do app para os serviços
    this.$$('.dt').forEach((d, j) => {
      const s = j % 3, ph = ((t - this.t) / 1.6 + j / 12) % 1, dead = s === 2 && t > tPg && t < tK + .4;
      const p = dead ? Math.min(ph, .55) : ph;
      d.setAttribute('cx', lerp(480, SCX[s], p)); d.setAttribute('cy', lerp(292, 410, p)); d.setAttribute('opacity', t > tC ? (dead && ph > .55 ? 0 : 1) : 0);
      d.setAttribute('fill', dead ? '#ef4444' : '#FACC15');
    });
    // Black Friday: só o carrinho escala
    this.$$('.rep').forEach((g, j) => g.setAttribute('opacity', ease(t, tCr + .2 * j, tCr + .2 * j + .3)));
    $('#repl').setAttribute('opacity', ease(t, tCr + .6, tCr + .9));
    $('#k8s').setAttribute('opacity', ease(t, tO, tO + .4));
    pop($('#a1'), t, tCa); $('#a1').style.opacity *= 1 - ease(t, tBf - .2, tBf);
    pop($('#a2'), t, tBf); $('#a2').style.opacity *= 1 - ease(t, tO - .2, tO);
    pop($('#a3'), t, tK + .3);
  }});

// ===================== 5 · o custo + MonolithFirst =====================
const NODES = Array.from({length: 12}, (_, i) => { const a = i / 12 * Math.PI * 2; return [480 + Math.cos(a) * 330, 300 + Math.sin(a) * 210]; });
const EDGES = []; NODES.forEach((_, i) => { EDGES.push([i, (i + 1) % 12]); EDGES.push([i, (i + 5) % 12]); });
S.push({id: 'custo', word: 'Mas', nth: nthAfter('Mas', 86), html: page('Mas tem um custo', 'Mais peças, mais <em>coisa pra dar errado</em>', `
  ${svgOpen('cs', 620)}
    <rect width="960" height="620" fill="#0d1f36"/>
    ${EDGES.map(([a, b]) => `<line class="ed" x1="${NODES[a][0]}" y1="${NODES[a][1]}" x2="${NODES[b][0]}" y2="${NODES[b][1]}" stroke="#2F5F8F" stroke-width="3"/>`).join('')}
    ${Array.from({length: 14}, () => '<circle class="pk" r="7" fill="#8FCBFF" opacity="0"/>').join('')}
    ${NODES.map(([x, y], i) => `<g class="nd" transform="translate(${x},${y})"><rect x="-56" y="-30" width="112" height="60" rx="12" fill="${['#2563EB', '#F97316', '#7C3AED', '#16A34A', '#0891b2', '#db2777'][i % 6]}" stroke="#fff" stroke-width="2"/><text y="8" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">serviço ${i + 1}</text><text class="al" x="40" y="-30" font-size="34" opacity="0">📟</text><text class="er" x="-62" y="-26" font-size="30" font-weight="700" fill="#FF5A5A" opacity="0">✗</text></g>`).join('')}
    <g id="fw" opacity="0"><rect x="70" y="160" width="820" height="290" rx="22" fill="#fff" stroke="#4ADE80" stroke-width="5"/>
      <text x="480" y="220" text-anchor="middle" font-size="34" font-weight="700" fill="#012949">Martin Fowler · "MonolithFirst"</text>
      <text x="480" y="280" text-anchor="middle" font-size="30" fill="#111827">comece com um <tspan font-weight="700" fill="#1d4ed8">monólito bem organizado</tspan></text>
      <text x="480" y="330" text-anchor="middle" font-size="30" fill="#111827">e separe só quando ele <tspan font-weight="700" fill="#b91c1c">crescer demais</tspan></text>
      <text x="480" y="400" text-anchor="middle" font-size="20" fill="#64748b">martinfowler.com/bliki/MonolithFirst.html · 2015</text></g>
  ${svgClose}
  <div class="abs" id="mf" style="left:0;top:650px;width:960px;height:250px;opacity:0">
    <div class="abs" id="mb" style="left:330px;top:20px;width:300px;height:200px;border-radius:22px;background:#1e3a8a;border:4px solid #8FCBFF;display:grid;place-items:center;font-size:36px;font-weight:700">MONÓLITO</div>
    ${SVC.map(([n, c], i) => `<div class="abs sp" style="left:${30 + i * 320}px;top:60px;width:260px;height:110px;border-radius:18px;background:${c};display:grid;place-items:center;font-size:32px;font-weight:700;opacity:0">${n}</div>`).join('')}</div>`),
  draw(t, $) {
    const tMo = at('monitorar') - .3, tR = at('rede') - .3, tEr = at('errado') - .3, tF = at('Fowler', 2) - .6, tM = at('monolito', 3) - .3, tS = at('separar') - .2;
    const web = 1 - ease(t, tF, tF + .3) * .75;
    this.$$('.nd').forEach((g, i) => { g.setAttribute('opacity', ease(t, this.t + .06 * i, this.t + .06 * i + .3) * web);
      g.querySelector('.al').setAttribute('opacity', t > tMo + .1 * (i % 5) && i % 3 === 0 ? (Math.sin(t * 10 + i) > 0 ? 1 : .2) : 0);
      g.querySelector('.er').setAttribute('opacity', t > tEr + .1 * (i % 4) && i % 4 === 1 ? 1 : 0); });
    this.$$('.ed').forEach((l) => l.setAttribute('opacity', web * .8));
    this.$$('.pk').forEach((p, j) => { const [a, b] = EDGES[(j * 5) % EDGES.length], ph = ((t - tR) * .9 + j / 14) % 1; p.setAttribute('cx', lerp(NODES[a][0], NODES[b][0], ph)); p.setAttribute('cy', lerp(NODES[a][1], NODES[b][1], ph)); p.setAttribute('opacity', t > tR ? web : 0); });
    $('#fw').setAttribute('opacity', ease(t, tF, tF + .4));
    $('#mf').style.opacity = ease(t, tM, tM + .3);
    $('#mb').style.opacity = 1 - ease(t, tS, tS + .3);
    this.$$('.sp').forEach((d, i) => { const k = ease(t, tS + .15 * i, tS + .15 * i + .45); d.style.opacity = k; d.style.transform = `translateX(${(1 - k) * (320 - i * 320) * .6}px)`; });
  }});

// ===================== 6 · na prática: 3 microsserviços reais =====================
S.push({id: 'pratica', word: 'Na', nth: nthAfter('Na', 99), html: page('Na prática', '3 microsserviços, <em>3 contêineres</em>', `
  ${win('tm', 'terminal', `<div class="code term mono" style="font-size:22px;line-height:1.42">${lines([
    '<span class="k2">$</span> docker compose ps',
    'NAME               IMAGE          STATUS',
    'loja-carrinho-1    nginx:alpine   <span class="green">Up 4 seconds</span>',
    'loja-catalogo-1    nginx:alpine   <span class="green">Up 4 seconds</span>',
    'loja-pagamento-1   nginx:alpine   <span class="green">Up 4 seconds</span>',
    '<span class="k2">$</span> curl localhost:18081   <span class="yellow">{"servico":"catalogo","produtos":3}</span>',
    '<span class="k2">$</span> curl localhost:18082   <span class="yellow">{"servico":"carrinho","itens":2}</span>',
    '<span class="k2">$</span> curl localhost:18083   <span class="yellow">{"servico":"pagamento","status":"ok"}</span>',
    '<span class="k2">$</span> docker compose stop pagamento',
    '<span class="k2">$</span> curl localhost:18083   <span class="red">curl: (7) Failed to connect</span>',
    '<span class="k2">$</span> curl localhost:18081   <span class="green">{"servico":"catalogo","produtos":3}</span>'])}</div>`, 'left:0;top:0;width:960px;height:640px;opacity:0')}
  ${tag('t5', '✓ pagamento caiu, catálogo seguiu no ar', 'left:40px;top:680px;font-size:36px', 'g')}`,
  'Saída real: docker compose com 3 serviços nginx, 17/11/2026'),
  draw(t, $) {
    show($('#tm'), t, this.t); const L = this.$$('#tm .ln'), a = this.t + .3, tl = at('lado', 2);
    L.forEach((l, i) => { l.style.opacity = t > a + (tl - a) * i / L.length ? 1 : 0; });
    pop($('#t5'), t, tl - .3);
  }});

// ===================== 7 · compartilha: o PC de 40 peças pra abrir o bloco de notas =====================
S.push({id: 'compartilha', word: 'Compartilha', html: `
  <div class="kick">Manda pra ele</div><h1>O colega do <em>PC de 40 peças</em></h1>
  <div class="stage">
  ${svgOpen('sv', 700)}
    <rect width="960" height="700" fill="#E5EEF6"/><rect y="620" width="960" height="80" fill="#92400e"/>
    <g transform="translate(470,60)"><rect width="440" height="560" rx="18" fill="#111827" stroke="#0b1016" stroke-width="6"/>
      ${Array.from({length: 40}, (_, i) => `<rect class="pp" x="${20 + (i % 5) * 82}" y="${20 + Math.floor(i / 5) * 66}" width="70" height="54" rx="6" fill="${['#2563EB', '#F97316', '#7C3AED', '#16A34A', '#0891b2', '#db2777', '#FACC15'][i % 7]}"/>`).join('')}
      ${Array.from({length: 10}, (_, i) => `<path d="M${30 + i * 40} ${40 + (i * 53) % 500} C ${200} ${100 + i * 40}, ${100 + i * 20} ${400 - i * 20}, ${410 - i * 30} ${520 - (i * 37) % 300}" fill="none" stroke="${['#ef4444', '#FACC15', '#22d3ee'][i % 3]}" stroke-width="4" opacity=".8"/>`).join('')}
      <text x="220" y="-14" text-anchor="middle" font-size="30" font-weight="700" fill="#012949">40 peças 🔩</text></g>
    <g transform="translate(40,180)"><rect width="380" height="250" rx="14" fill="#1f2937"/><rect x="14" y="14" width="352" height="222" rx="4" fill="#fff"/><rect x="14" y="14" width="352" height="34" fill="#e5e7eb"/><text x="28" y="38" font-size="20" font-weight="700" fill="#111827">📝 bloco de notas</text><text id="typed" x="30" y="90" font-size="30" fill="#111827"></text>
      <rect x="160" y="250" width="60" height="70" fill="#475569"/><rect x="110" y="316" width="160" height="26" rx="8" fill="#334155"/></g>
    ${FIG('pu', '#2563EB', HAIR)}
    <text id="clown" x="250" y="130" font-size="70" opacity="0" class="emoji">🤡</text>
  ${svgClose}
  <div class="abs" id="sh2" style="left:280px;top:740px;width:400px;height:130px;border-radius:65px;background:#16A34A;display:grid;place-items:center;font-size:48px;font-weight:700;opacity:0">↗ Compartilhar</div></div>`,
  draw(t, $) {
    this.$$('.pp').forEach((p, i) => p.setAttribute('opacity', t > this.t + .03 * i ? 1 : 0));
    const tN = at('notas') - .3, txt = 'oi'; $('#typed').textContent = txt.slice(0, Math.max(0, Math.floor((t - tN) * 4)));
    posefig($('#pu'), {x: 300, f: -1, a1: [100, 30], a2: [-20, -5], mood: t > tN ? 'happy' : 'ok', dy: 0}, t, 620);
    fade($('#clown'), t, tN); pop($('#sh2'), t, tN + .4);
    const p = Math.max(0, Math.sin((t - this.t) * 5)); $('#sh2').style.boxShadow = `0 0 ${50 * p}px rgba(74,222,128,${p})`;
  }});

// ===================== 8 · TBX Learn =====================
S.push({id: 'tbx', word: 'aprender', html: page('Quer aprender computação em nuvem?', 'Cursos de <em>Cloud, DevOps e IA</em>', `
  ${camHTML('c3', 'catalogo-crop.png', 1080 / 1790, 'left:0;top:0;width:960px;height:900px')}
  <div class="chip g" id="ch7" style="left:30px;top:820px;font-size:40px">treinamentos.tbxtech.com.br</div>`,
  'Print do catálogo TBX Learn'),
  draw(t, $) {
    camera($('#c3'), t, [[this.t, {x: 0, y: 0, w: 1, h: .6}], [at('tema') - .15, {x: 0, y: .4, w: 1, h: .6}], [at('acessa') - .15, {x: 0, y: .08, w: .7, h: .42}]], 1.6);
    pop($('#ch7'), t, at('treinamentos.tbxtech.com.br') - .2);
  }});
