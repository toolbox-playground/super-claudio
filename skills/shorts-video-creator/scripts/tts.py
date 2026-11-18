# Narration in the creator's cloned voice (ElevenLabs Eleven v4, REST with-timestamps).
# Usage: XI=<api key> VOICE_ID=<voice id> python3 tts.py <short-folder>
# Reads <short-folder>/narration/aula.txt; writes aula.mp3, audio/timestamps.json, audio/registro.json.
import json, sys, os, base64, hashlib, urllib.request, datetime
d, key = sys.argv[1], os.environ['XI']
text = open(f'{d}/narration/aula.txt').read().strip()
vid = os.environ['VOICE_ID']
vs = {'stability': 0.75, 'similarity_boost': 1.0}
body = json.dumps({'text': text, 'model_id': 'eleven_v4', 'voice_settings': vs}).encode()
req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128', body, {'xi-api-key': key, 'Content-Type': 'application/json'})
r = urllib.request.urlopen(req, timeout=300)
j = json.load(r); h = dict(r.headers)
os.makedirs(f'{d}/audio', exist_ok=True)
audio = base64.b64decode(j['audio_base64'])
open(f'{d}/audio/aula.mp3', 'wb').write(audio); open(f'{d}/aula.mp3', 'wb').write(audio)
json.dump(j.get('alignment'), open(f'{d}/audio/timestamps.json', 'w'), ensure_ascii=False)
open(f'{d}/audio/texto-aprovado.txt', 'w').write(text + '\n')
reg = {'voice_id': vid, 'model': 'eleven_v4', 'voice_settings': vs, 'characters': len(text.replace('\n', '')),
       'headers': {k: h.get(k) for k in ('request-id', 'history-item-id', 'character-cost')},
       'text_sha256': hashlib.sha256(text.encode()).hexdigest(), 'audio_sha256': hashlib.sha256(audio).hexdigest(),
       'via': f'REST with-timestamps, Claude Code, {datetime.date.today()}'}
json.dump(reg, open(f'{d}/audio/registro.json', 'w'), indent=1, ensure_ascii=False)
print(reg['headers'])
