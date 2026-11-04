"""Sweep text variants on the GENERIC multilingual model at fixed params."""
import sys, pathlib, torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
ref, src, out = (pathlib.Path(p) for p in sys.argv[1:4])
exag = float(sys.argv[4]); cfg = float(sys.argv[5])
out.mkdir(parents=True, exist_ok=True)
model = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
print("modelo carregado", flush=True)
for f in sorted(src.glob("s04*.txt")):
    text = f.read_text(encoding="utf-8").strip()
    wav = model.generate(text, language_id="pt", audio_prompt_path=str(ref),
                         exaggeration=exag, cfg_weight=cfg)
    dest = out / f"{f.stem}.wav"
    ta.save(str(dest), wav, model.sr)
    print(f"{dest.name}  {wav.shape[-1]/model.sr:.2f}s", flush=True)
