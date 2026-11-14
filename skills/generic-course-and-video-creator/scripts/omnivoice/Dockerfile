# OmniVoice (k2-fsa, Apache-2.0) on CPU, for machines with no NVIDIA/Apple-Silicon GPU.
# Why a container: omnivoice needs torch>=2.4, and PyTorch publishes no macOS x86_64
# wheel past 2.2 -- an Intel Mac cannot install it natively.
#
#   docker build -t omnivoice:local .
#
# Model weights (~3.5 GB) are downloaded on first run into the volume mounted at /models.
FROM --platform=linux/amd64 python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
      ffmpeg git && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
      torch==2.6.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir omnivoice faster-whisper

ENV HF_HOME=/models
ENTRYPOINT ["python"]
