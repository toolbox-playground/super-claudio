# Video Editing

Tools and workflows for editing existing video: trimming, silence removal, captions, format conversion.

## ffmpeg — The Universal Tool

ffmpeg is free, runs locally, handles virtually any video editing task.

**Install:**
```bash
brew install ffmpeg          # macOS
sudo apt install ffmpeg      # Ubuntu/Debian
```

**Common operations:**

Trim a clip (start at 0:30, duration 60 seconds):
```bash
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:01:00 -c copy output.mp4
```

Convert format (mp4 → webm):
```bash
ffmpeg -i input.mp4 output.webm
```

Resize to 9:16 (TikTok/Reels):
```bash
ffmpeg -i input.mp4 -vf "scale=1080:1920,setsar=1" output_9x16.mp4
```

Compress for WhatsApp (reduce file size):
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset fast output_compressed.mp4
```

## Silence Removal

Use `auto-editor` — detects and removes silent sections automatically:

```bash
pip install auto-editor
auto-editor input.mp4 --margin 0.2sec
```

This removes pauses/silence and exports a tighter cut. Great for talking-head videos and tutorials.

## Auto Captions

**Whisper (OpenAI) — local, free:**
```bash
pip install openai-whisper
whisper input.mp4 --model medium --output_format srt
```

Then burn captions into video:
```bash
ffmpeg -i input.mp4 -vf "subtitles=input.srt" output_captioned.mp4
```

**CapCut** — free desktop app, automatic captions with one click, good for social media.

## Google Video Remix — AI Video Transformations in Google Photos (July 8, 2026)

Google Photos launched Video Remix on July 8, 2026, powered by Gemini Omni. Applies AI-driven visual transformations to existing clips in seconds — not generation from scratch, but style and scene editing.

**What it does:**
- Cinematic relighting — brightens dark footage, adjusts light direction
- Background swap — replaces plain or cluttered backgrounds
- Artistic style transfer — watercolor, raw sketchbook, oil painting effects

**Access:**
1. Open Google Photos → Create tab → Video Remix
2. Select a video clip, then choose a template or enter a prompt
3. Processing takes a few seconds

**Availability:** Google AI Plus, Pro, and Ultra subscribers in the US and 13 countries (Argentina, Bangladesh, Brazil, Colombia, Egypt, India, Indonesia, Japan, Mexico, Pakistan, Philippines, South Korea, Turkey). Free users cannot access Video Remix.

## video-use Skill

If the `video-use` skill is installed, it provides a higher-level interface for common editing
operations. Invoke it for complex editing workflows that involve multiple steps.
