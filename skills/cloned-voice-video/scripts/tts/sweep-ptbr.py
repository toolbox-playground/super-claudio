"""Sweep exaggeration/cfg on the pt-BR pack, loading the model once."""
import sys, pathlib, torch, torchaudio as ta
from safetensors.torch import load_file as load_safetensors
from chatterbox.mtl_tts import ChatterboxMultilingualTTS, Conditionals
from chatterbox.models.s3gen import S3Gen
from chatterbox.models.t3 import T3
from chatterbox.models.t3.modules.t3_config import T3Config
from chatterbox.models.voice_encoder import VoiceEncoder
from chatterbox.models.tokenizers import MTLTokenizer

ALLOWED_MISSING = {"tokenizer._mel_filters", "tokenizer.window"}
GRID = [(0.7, 0.3), (0.8, 0.3), (0.7, 0.5)]

ckpt, ref, src, out = (pathlib.Path(p) for p in sys.argv[1:5])
out.mkdir(parents=True, exist_ok=True)
cpu = torch.device("cpu")

ve = VoiceEncoder()
ve.load_state_dict(torch.load(ckpt / "ve.pt", map_location=cpu, weights_only=True))
ve.to(cpu).eval()
t3 = T3(T3Config.multilingual())
st = load_safetensors(ckpt / "t3_mtl23ls_v2.safetensors")
if "model" in st.keys(): st = st["model"][0]
t3.load_state_dict(st); t3.to(cpu).eval()
s3gen = S3Gen()
missing, unexpected = s3gen.load_state_dict(
    torch.load(ckpt / "s3gen.pt", map_location=cpu, weights_only=True), strict=False)
if set(missing) - ALLOWED_MISSING or unexpected:
    raise SystemExit(f"decoder mismatch: {sorted(set(missing)-ALLOWED_MISSING)} {sorted(unexpected)}")
s3gen.to(cpu).eval()
tok = MTLTokenizer(str(ckpt / "grapheme_mtl_merged_expanded_v1.json"))
conds = (Conditionals.load(ckpt / "conds.pt", map_location=cpu).to(cpu)
         if (ckpt / "conds.pt").exists() else None)
model = ChatterboxMultilingualTTS(t3, s3gen, ve, tok, "cpu", conds=conds)
print("modelo carregado", flush=True)

text = src.read_text(encoding="utf-8").strip()
for exag, cfg in GRID:
    wav = model.generate(text, language_id="pt", audio_prompt_path=str(ref),
                         exaggeration=exag, cfg_weight=cfg)
    dest = out / f"e{int(exag*10)}_c{int(cfg*10)}.wav"
    ta.save(str(dest), wav, model.sr)
    print(f"{dest.name}  {wav.shape[-1]/model.sr:.2f}s", flush=True)
