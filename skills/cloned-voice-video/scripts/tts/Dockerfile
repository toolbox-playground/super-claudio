# Chatterbox Multilingual v3 (Resemble AI, MIT) - pt-BR voice cloning.
# Built from the official upstream package; linux/amd64 because this host is an Intel Mac
# and PyTorch has shipped no macOS x86_64 wheel since 2.2.2 (chatterbox pins torch==2.6.0).
FROM --platform=linux/amd64 python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
      git ffmpeg libsndfile1 && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir torch==2.6.0 torchaudio==2.6.0 \
      --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir chatterbox-tts

ENV HF_HOME=/models
WORKDIR /work
ENTRYPOINT ["python"]
