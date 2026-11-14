"""Narrate one lesson in the creator's cloned voice with OmniVoice, locally.

Defaults are the recipe the creator approved by ear (Nov 2026): num_step 16,
guidance_scale 3.0, every other generation parameter left at OmniVoice's default.
See references/open-source-alternative.md before changing any of them.

    synth.py --ref ref.wav --text-file narration/aula.txt --out audio/aula.wav

  --ref-text   exact words spoken in the reference; transcribed with Whisper if omitted
  --steps      32 doubles the time; use it when a 16-step take garbles a term
  --device     cpu (default, Docker) | mps (Apple Silicon) | cuda (NVIDIA)
  --no-check   skip the post-generation transcription check

The check transcribes the result and compares it with the script. A low match means a
word came out wrong (guidance 3.0 at 16 steps occasionally garbles a term): regenerate,
or rerun with --steps 32. Exit code 2 when the match is below --min-match.
"""
import argparse, difflib, pathlib, re, sys, time

p = argparse.ArgumentParser()
p.add_argument("--ref", required=True)
p.add_argument("--ref-text")
g = p.add_mutually_exclusive_group(required=True)
g.add_argument("--text")
g.add_argument("--text-file")
p.add_argument("--out", required=True)
p.add_argument("--steps", type=int, default=16)
p.add_argument("--guidance", type=float, default=3.0)
p.add_argument("--device", default="cpu")
p.add_argument("--language", default="pt")
p.add_argument("--min-match", type=float, default=0.95)
p.add_argument("--no-check", action="store_true")
a = p.parse_args()

import torch, soundfile as sf
from faster_whisper import WhisperModel
from omnivoice import OmniVoice

text = a.text if a.text else pathlib.Path(a.text_file).read_text(encoding="utf-8").strip()
out = pathlib.Path(a.out)
out.parent.mkdir(parents=True, exist_ok=True)

asr = WhisperModel("small", device="cpu", compute_type="int8")
ref_text = a.ref_text
if not ref_text:
    segs, _ = asr.transcribe(a.ref, language=a.language, beam_size=5)
    ref_text = " ".join(s.text.strip() for s in segs).strip()
    print(f"reference transcript (check it is exact): {ref_text}", flush=True)
if not ref_text:
    sys.exit("empty reference transcript -- does the reference clip contain speech?")

dtype = torch.float16 if a.device.startswith("cuda") else torch.float32
t0 = time.time()
model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map=a.device, dtype=dtype)
t1 = time.time()
audio = model.generate(text=text, ref_audio=a.ref, ref_text=ref_text,
                       num_step=a.steps, guidance_scale=a.guidance)
t2 = time.time()
sf.write(str(out), audio[0], 24000)
dur = len(audio[0]) / 24000
print(f"{out}: {dur:.1f}s of audio, model load {t1-t0:.0f}s, generation {t2-t1:.0f}s "
      f"({(t2-t1)/dur:.1f}x realtime)", flush=True)

if a.no_check:
    sys.exit(0)
norm = lambda s: re.sub(r"[^\w\s]", "", s.lower()).split()
segs, _ = asr.transcribe(str(out), language=a.language, beam_size=5)
heard = " ".join(s.text.strip() for s in segs)
match = difflib.SequenceMatcher(None, norm(text), norm(heard)).ratio()
print(f"transcript match {match*100:.0f}%: {heard}", flush=True)
if match < a.min_match:
    print("below threshold -- listen for a garbled term; regenerate or use --steps 32", flush=True)
    sys.exit(2)
