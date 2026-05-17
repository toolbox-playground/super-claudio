# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model:** v5.5 (March 2026) — Voices (clone your singing voice), Custom Models (tune on your catalog), My Taste (personalized generation); v5.5 requires Pro/Premier; free tier capped at v4.5 and below
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- **Important (2026):** Free-tier users can no longer download audio files — tracks can only be streamed/shared within the platform. Download requires a paid plan ($10/month Pro, $30/month Premier).
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio is now a walled garden — users cannot export or download generated music. Tracks stay on the platform; no DAW export, no Spotify upload, no use in video. Only use Udio for in-platform listening/sharing.
- Good for: previewing and sharing music concepts; not suitable if you need to use the audio outside Udio

## Mureka v8 — Developer-Focused AI Music Generation

Mureka v8 is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: $10/month (400 songs, full commercial rights); $30/month Pro
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)

## Free Royalty-Free Music (no generation needed)

For background music without AI generation:
- **Pixabay Music** — pixabay.com/music — free, no attribution required
- **Free Music Archive** — freemusicarchive.org
- **YouTube Audio Library** — studio.youtube.com/channel/music
- **ccMixter** — ccmixter.org — Creative Commons licensed

## When to Use AI vs. Library

| Use AI music (Suno / Mureka) | Use library |
|---|---|
| Need specific mood/genre | Need something quickly |
| No matching library track | Any genre fits |
| Unique branded sound | Speed matters |
| Need API / stems / MIDI (Mureka) | Budget is zero |

> **Note:** As of 2026, Udio no longer allows audio export. For any use case where you need to keep or use the generated audio, use Suno (paid) or a royalty-free library instead.
