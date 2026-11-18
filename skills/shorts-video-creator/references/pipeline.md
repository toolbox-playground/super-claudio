# Pipeline: audio → timing → scenes → render

Paths below: `$SK` = this skill's folder, `$CVC` = `../course-and-video-creator` (render
engine). One folder per short: `<series>/NN-slug/`.

## 1. Audio (ElevenLabs, the creator's cloned voice)

```bash
XI="$(security find-generic-password -a "$USER" -s elevenlabs-api-key -w)" \
VOICE_ID=<the creator's voice id> python3 $SK/scripts/tts.py <short>
```

- Model Eleven v4, stability 0.75, similarity 1.0, MP3 44.1 kHz. One request per short.
- Writes `aula.mp3`, `audio/aula.mp3`, `audio/timestamps.json` (character times),
  `audio/texto-aprovado.txt` and `audio/registro.json` (request id, character cost, hashes).
- The key lives in the OS keychain; never print it, never ask for it in chat.
- Measure: `ffprobe -v error -show_entries format=duration -of csv=p=0 aula.mp3`.

### Over 2:00? Speed up, do not re-generate

```bash
cp audio/aula.mp3 audio/aula-original-<N>s.mp3; cp audio/timestamps.json audio/timestamps-original.json
ffmpeg -y -i audio/aula-original-<N>s.mp3 -filter:a atempo=<f> -c:a libmp3lame -b:a 192k audio/aula.mp3 && cp audio/aula.mp3 aula.mp3
python3 -c "import json;f=<f>;d=json.load(open('audio/timestamps-original.json'))
for k in ('character_start_times_seconds','character_end_times_seconds'): d[k]=[round(x/f,4) for x in d[k]]
json.dump(d,open('audio/timestamps.json','w'))"
```

Use the smallest factor that lands under 2:00 (1.04–1.06 is inaudible).

## 2. Word timing

`VOICE_NAME=<name> python3 $SK/scripts/voice.py <short>` → `voice.<name>.json` with
`captions.aula[] = {word, startMs, endMs}` and `durations.aula = ceil((dur + .35) * 30)`.
`display.json` substitutions are applied **after** alignment, joining the spoken words into
one caption word with the original start/end.

## 3. Real demo

Run the commands the short shows (Docker, curl, git, terraform, pytest…), save the exact
output in `demo/`, and tear down every container/network you started. Show it in a
terminal window scene, adding the date in the credit line.

## 4. Scenes and build

```bash
cat $SK/templates/cartoon-header.js $SK/templates/cartoon-props.js scenes-body.js > scenes.js
python3 $SK/scripts/build.py <short> 'Título com <span>destaque</span>' 'subtítulo' '/^(AWS|Kubernetes)$/'
```

- `brand.json` (in the short folder or its parent) sets the kicker, the footer brand and the
  site: `{"kicker": "TBX Tech · DevOps", "brand_html": "TBX <span>Tech</span>", "site": "…"}`.
- The keep-regex lists caption words kept in their original case (proper names, acronyms).
- `window.TITLE_OUT = -1` (set in `cartoon-props.js`) hides the opening title overlay: shorts
  open straight on the hook.

## 5. Stills, contact sheets, render, mux

```bash
node $CVC/scripts/studio/render-tpage.mjs index.html check --size 1080x1920 \
  --voice voice.<name>.json --scene aula --still 3,9,16,24,…   # one per beat
# 4 stills side by side to review quickly:
ffmpeg -i a.png -i b.png -i c.png -i d.png -filter_complex "[0][1][2][3]hstack=4,scale=2160:-1" sheet.jpg
node $CVC/scripts/studio/render-tpage.mjs index.html video.mp4 --size 1080x1920 \
  --voice voice.<name>.json --scene aula --workers 4
ffmpeg -i video.mp4 -i aula.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest short-NN-slug.mp4
ffmpeg -i short-NN-slug.mp4 -c:v libx264 -crf 24 -preset medium -c:a copy -movflags +faststart short-NN-slug-celular.mp4
```

Run the full render in the background (it takes minutes). Horizontal: `--size 1920x1080`
and a stage laid out for landscape.

## Reordering a finished short without new audio

When the creator wants a block moved (e.g. the whole analogy to the start): remap time
inside `window.seek` with segments `[newStart, newEnd, origStart]`, keep captions from
crossing a cut, mark the moved scenes `noFade`, and rebuild the mp3 with ffmpeg
`atrim`/`concat` cutting in the silences between words. Never cut the rendered mp4.

## Pitfalls already hit

- `at(word, nth)` counts **normalized** words from the start of the narration ("No" also
  matches "no"); use a distinctive word or `nthAfter(word, seconds)`; or give the scene
  `T: () => …`.
- CSS classes of the kit hide or recolor SVG: never name SVG classes `st`, `red`, `green`,
  `ln`, `box`, `x`, `item` — check `templates/head.html` before naming.
- `pop()` sets CSS `transform: scale` — on an SVG `<g>` it scales around the origin; use
  attribute opacity/transform for SVG groups instead.
- zsh: `$n:l` is a modifier; write `${n}`. Avoid complex heredocs with quotes in one shell
  command — write the script to a file and run it.
