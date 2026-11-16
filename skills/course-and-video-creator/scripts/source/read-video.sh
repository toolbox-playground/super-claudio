#!/usr/bin/env bash
# Read a video the creator handed over as source material: a YouTube / Instagram /
# TikTok / X link, or a local file. Writes, into OUTDIR:
#   meta.json        title, author, duration, link
#   transcript.txt   what is said, one timestamped line per phrase
#   sheet-NN.jpg     contact sheets (5x3 frames each) so the agent can see the video
#   sheets.txt       which moments each sheet covers
# and deletes the downloaded video at the end (pass --keep to keep it).
#
# Usage: read-video.sh <url-or-file> [outdir] [--keep]
#
# Tools: yt-dlp and faster-whisper, installed on first run into a private venv
# (~/.cache/super-claudio/read-video, override with SUPER_CLAUDIO_CACHE). ffmpeg and
# Node must already be installed (Node lets yt-dlp solve YouTube's JavaScript check).
# faster-whisper has no wheels for Python 3.14 yet, so the venv uses 3.10-3.13.
set -euo pipefail

[ $# -ge 1 ] || { sed -n 2,15p "$0"; exit 1; }
SRC=$1; shift
OUT=""; KEEP=0
for a in "$@"; do case $a in --keep) KEEP=1;; *) OUT=$a;; esac; done

for t in ffmpeg ffprobe node; do
  command -v "$t" >/dev/null || { echo "read-video: $t is required (brew install ${t/ffprobe/ffmpeg})" >&2; exit 1; }
done

CACHE=${SUPER_CLAUDIO_CACHE:-$HOME/.cache/super-claudio}/read-video
VENV=$CACHE/.venv
if [ ! -x "$VENV/bin/python" ]; then
  PY=""
  for v in 3.13 3.12 3.11 3.10; do
    for p in "python$v" "/opt/homebrew/bin/python$v" "/usr/local/bin/python$v"; do
      # run it, not just find it: a pyenv shim or an arm64 binary on an Intel Mac is
      # on disk but does not start
      "$p" -c 'import venv' >/dev/null 2>&1 && { PY=$(command -v "$p"); break 2; }
    done
  done
  [ -n "$PY" ] || { echo "read-video: needs Python 3.10-3.13 for faster-whisper (brew install python@3.12)" >&2; exit 1; }
  echo "read-video: first run, installing yt-dlp and faster-whisper into $VENV" >&2
  mkdir -p "$CACHE"
  "$PY" -m venv "$VENV"
  "$VENV/bin/pip" -q --disable-pip-version-check install --only-binary :all: yt-dlp faster-whisper
  touch "$CACHE/.updated"
fi
# Sites change and yt-dlp follows within days: refresh it weekly.
if [ -z "$(find "$CACHE/.updated" -mtime -7 2>/dev/null)" ]; then
  "$VENV/bin/pip" -q --disable-pip-version-check install -U yt-dlp >&2 && touch "$CACHE/.updated"
fi

exec "$VENV/bin/python" "$(dirname "$0")/read_video.py" "$SRC" "${OUT:-}" "$KEEP"
