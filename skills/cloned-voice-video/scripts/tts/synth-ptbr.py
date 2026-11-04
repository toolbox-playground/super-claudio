"""Synthesise with the pt-BR dialect pack (t3_pt_br + the V3 S3Gen decoder).

The V3 decoder file omits two deterministic buffers that the installed S3Gen
registers itself -- a mel filterbank and an STFT window. Both are computed
constants, not learned weights, so loading without them is safe. Anything else
missing, unexpected or mis-shaped is a real mismatch and aborts the run.
"""
import sys, pathlib, torch, torchaudio as ta
from safetensors.torch import load_file as load_safetensors
from chatterbox.mtl_tts import ChatterboxMultilingualTTS, Conditionals
from chatterbox.models.s3gen import S3Gen
from chatterbox.models.t3 import T3
from chatterbox.models.t3.modules.t3_config import T3Config
from chatterbox.models.voice_encoder import VoiceEncoder
from chatterbox.models.tokenizers import MTLTokenizer

ALLOWED_MISSING = {"tokenizer._mel_filters", "tokenizer.window"}

ckpt, ref, src, out = (pathlib.Path(p) for p in sys.argv[1:5])
exag = float(sys.argv[5]) if len(sys.argv) > 5 else 0.5
cfg  = float(sys.argv[6]) if len(sys.argv) > 6 else 0.5
out.mkdir(parents=True, exist_ok=True)
cpu = torch.device("cpu")

ve = VoiceEncoder()
ve.load_state_dict(torch.load(ckpt / "ve.pt", map_location=cpu, weights_only=True))
ve.to(cpu).eval()

t3 = T3(T3Config.multilingual())
t3_state = load_safetensors(ckpt / "t3_mtl23ls_v2.safetensors")
if "model" in t3_state.keys():
    t3_state = t3_state["model"][0]
t3.load_state_dict(t3_state)
t3.to(cpu).eval()

s3gen = S3Gen()
missing, unexpected = s3gen.load_state_dict(
    torch.load(ckpt / "s3gen.pt", map_location=cpu, weights_only=True), strict=False)
extra_missing = set(missing) - ALLOWED_MISSING
if extra_missing or unexpected:
    raise SystemExit(
        f"decoder mismatch -- missing: {sorted(extra_missing)}  unexpected: {sorted(unexpected)}")
print(f"decoder loaded; buffers kept from constructor: {sorted(missing)}", flush=True)
s3gen.to(cpu).eval()

tokenizer = MTLTokenizer(str(ckpt / "grapheme_mtl_merged_expanded_v1.json"))
conds = (Conditionals.load(ckpt / "conds.pt", map_location=cpu).to(cpu)
         if (ckpt / "conds.pt").exists() else None)

model = ChatterboxMultilingualTTS(t3, s3gen, ve, tokenizer, "cpu", conds=conds)

targets = sorted(src.glob("s*.txt")) if src.is_dir() else [src]
for f in targets:
    text = f.read_text(encoding="utf-8").strip()
    wav = model.generate(text, language_id="pt", audio_prompt_path=str(ref),
                         exaggeration=exag, cfg_weight=cfg)
    dest = out / f"{f.stem}.wav"
    ta.save(str(dest), wav, model.sr)
    print(f"{dest.name}  {wav.shape[-1]/model.sr:.2f}s", flush=True)
