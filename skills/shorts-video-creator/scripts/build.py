# Assembles <short>/index.html: templates/head.html (kit + CSS) + <short>/scenes.js + templates/tail.js.
# Usage: python3 build.py <short-folder> "<title html>" "<subtitle>" "<keep regex>"
#   title html may carry <span>highlight</span>; keep regex = caption words kept in their original case.
# Brand: brand.json in the short folder or its parent:
#   {"kicker": "TBX Tech · DevOps", "brand_html": "TBX <span>Tech</span>", "site": "treinamentos.tbxtech.com.br"}
import sys, os, re, json
T = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'templates')
d, title, sub, keep = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
brand = {'kicker': '', 'brand_html': '', 'site': ''}
for c in (f'{d}/brand.json', f'{d}/../brand.json'):
    if os.path.exists(c): brand.update(json.load(open(c))); break
head = open(f'{T}/head.html').read(); tail = open(f'{T}/tail.js').read()
plain = re.sub(r'<[^>]+>', '', title)
head = re.sub(r'<title>.*?</title>', f'<title>{plain}</title>', head)
head = re.sub(r'<div id="title">.*?</div></div>', lambda m: f'<div id="title"><div class="k">{brand["kicker"]}</div><div class="t">{title}</div><div class="s">{sub}</div></div>', head, flags=re.S)
head = re.sub(r'<div id="footer">.*?</div>', lambda m: f'<div id="footer"><b>{brand["brand_html"]}</b><span class="s">{brand["site"]}</span></div>', head, count=1, flags=re.S)
tail = re.sub(r'const keep = .*?;', lambda m: f'const keep = {keep}.test(raw);', tail, count=1)
open(f'{d}/index.html', 'w').write(head + '\nconst S = [];' + open(f'{d}/scenes.js').read().split('const S = [];', 1)[1] + '\n' + tail)
print('ok')
