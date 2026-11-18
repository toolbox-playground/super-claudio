# audio/timestamps.json (characters) -> voice.<VOICE_NAME>.json (words), applying display.json AFTER alignment.
# Usage: VOICE_NAME=caio python3 voice.py <short-folder>   (default name: narrator)
import json, sys, math, re, unicodedata, os
d = sys.argv[1]
a = json.load(open(f'{d}/audio/timestamps.json'))
ch, st, en = a['characters'], a['character_start_times_seconds'], a['character_end_times_seconds']
words, cur = [], None
for c, s, e in zip(ch, st, en):
    if c.isspace():
        if cur: words.append(cur); cur = None
        continue
    if cur is None: cur = {'word': '', 's': s, 'e': e}
    cur['word'] += c; cur['e'] = e
if cur: words.append(cur)
norm = lambda x: re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', x.lower()).encode('ascii', 'ignore').decode())
try: disp = json.load(open(f'{d}/display.json'))
except FileNotFoundError: disp = {}
keys = sorted(((k.split(), v) for k, v in disp.items()), key=lambda kv: -len(kv[0]))
out, i = [], 0
while i < len(words):
    for kw, v in keys:
        n = len(kw)
        if i + n <= len(words) and [norm(w['word']) for w in words[i:i + n]] == [norm(x) for x in kw]:
            last = words[i + n - 1]['word']; tr = re.search(r'[.,:;!?"…]+$', last)
            out.append({'word': v + (tr.group(0) if tr else ''), 's': words[i]['s'], 'e': words[i + n - 1]['e']}); i += n; break
    else:
        out.append(words[i]); i += 1
cap = [{'word': w['word'], 'startMs': round(w['s'] * 1000), 'endMs': round(w['e'] * 1000)} for w in out]
dur = en[-1]
name = os.environ.get('VOICE_NAME', 'narrator')
v = {'voice': name, 'fps': 30, 'durations': {'aula': math.ceil((dur + .35) * 30)}, 'captions': {'aula': cap}}
json.dump(v, open(f'{d}/voice.{name}.json', 'w'), ensure_ascii=False)
print(len(cap), 'words', v['durations']['aula'], 'frames')
