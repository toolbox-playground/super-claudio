"""Clone a voice from a reference clip and synthesise one WAV per narration file."""
import sys, pathlib, torch, torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

ref, src, out = (pathlib.Path(p) for p in sys.argv[1:4])
out.mkdir(parents=True, exist_ok=True)

model = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
for f in sorted(src.glob("s*.txt")):
    text = f.read_text(encoding="utf-8").strip()
    wav = model.generate(text, language_id="pt", audio_prompt_path=str(ref))
    dest = out / f"{f.stem}.wav"
    ta.save(str(dest), wav, model.sr)
    print(f"{dest.name}  {wav.shape[-1]/model.sr:.2f}s", flush=True)
