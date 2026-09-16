# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models: v6, v6-wild, v6-mini (launched Sept 9, 2026)** — the first Suno models trained entirely on licensed catalogs (Warner Music, BMG, Believe/TuneCore revenue-share deal), fully replacing the older unlicensed-data models. The long-pending model transition (see below) is now **complete**.
  - **v6-mini**: free tier — 50 credits/day, non-commercial use only, no download
  - **v6 / v6-wild**: require Pro ($8–10/mo) or Premier ($24–30/mo, adds Suno Studio + commercial rights)
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- **Model transition — resolved:** Following the November 2025 Warner Music Group settlement, Suno committed to retiring unlicensed-data models once licensed-catalog models launched. That happened September 9, 2026 with v6. Generations made with pre-v6 models may eventually become inaccessible — users who want to preserve old generations should download them now on a paid plan while still available.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (still true as of Sept 2026):** Udio disabled all downloads (audio, video, stems) across all plan tiers during its 2025–2026 licensing transition and **downloads remain unrestored** — the only exception was a one-time 48-hour reopening back in November 2025. No confirmed 2026 restoration date.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The licensed platform operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka v8 — Developer-Focused AI Music Generation

Mureka v8 is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: $10/month (400 songs, full commercial rights); $30/month Pro
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)


## ElevenLabs Music v2 — Genre-Switching AI Music with API Access (May 2026)

ElevenLabs launched ElevenMusic as an iOS app on April 1, 2026, then shipped Music v2 on May 26, 2026 — a major upgrade adding mid-track genre switching, chunk-based composition plans, and full API access across ElevenMusic, ElevenCreative, and ElevenAPI.

- URL: elevenlabs.io (ElevenMusic iOS, ElevenCreative web app, ElevenAPI)
- **API model_id:** `music_v2` (on Generate music, Stream music, Generate music detailed, Upload music endpoints)
- Free tier: up to 7 songs/day in ElevenMusic app (personal use only; no commercial rights on free)
- Commercial use: Starter plan+ (Music v2 trained on licensed data — cleared for commercial use on paid plans)
- Input: natural language text prompt; control lyrics on/off, song length, writing style, genre
- **Genre-switching mid-track:** one generation can shift between wildly different styles (operatic intro → metal breakdown → ambient outro)
- **Chunk-based composition:** build tracks section by section using GenerationChunk and AudioRefChunk objects — intro, verse, chorus, bridge, outro — each preserving tonal continuity across the full track
- **Inpainting:** rebuild specific sections (e.g., only the bridge) without touching the rest of the song
- Better multilingual lyrics and arrangement vs Music v1
- Best for: developers integrating music generation via API (ElevenAPI); ad music and branded content (ElevenCreative); quick casual generation (ElevenMusic iOS app)

## MiniMax Music 3.0 — Open-Weights, Full 5-Minute Songs (Aug 2026)

MiniMax Music 3.0 (API listed July 16, 2026; full research/checkpoint release August 13, 2026) supersedes Music 2.5, generating complete songs — vocals and instrumentation in one pass — up to 5 minutes long, and ships as an open-weights model rather than API-only.

- URL: minimax.io/audio | API: wavespeed.ai/models/minimax/music-3.0
- Free tier: limited via minimax.io; open weights available for self-hosting
- **Note:** MiniMax's separately-billed paid Music Generation and Lyrics Generation APIs closed to new users on August 20, 2026 — new users are redirected to MiniMax Audio or the open-weights Music 3.0 checkpoint instead.
- Best for: generation where song structure and full-length (up to 5 min) output matter; self-hosters wanting an open-weights alternative to Suno/Udio
- Not ideal for: stem export or MIDI (use Mureka v8); on-demand free generation (use Suno v6-mini free tier)

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3.5 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. Available free at flowmusic.app. **Lyria 3.5** rolled into Flow Music on July 29, 2026, then in early September 2026 became available more broadly via the Gemini API, AI Studio, and the consumer Gemini app — not just flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here); also Gemini API / aistudio.google.com / Gemini app (Sept 2026)
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; Replace and Extend features for remixing specific sections of a track
- Stack: Lyria 3.5 (audio) + Veo (music video) + Nano Banana (album art) — all Google AI models
- Best for: free music generation with optional music video output; users in the Google/Gemini ecosystem now have more access points beyond the standalone app


## Stable Audio 3.0 (Stability AI) — Open-Weight, Commercially Licensed Music & SFX

Released May 20, 2026. Text-to-audio model family covering music, sound effects, and audio editing. Trained entirely on fully licensed data (AudioSparx + Freesound). Up to 380 seconds (6 min 20 sec) per generation. Supports LoRA fine-tuning and inpainting.

| Variant | Params | Open-Weight | Max Length | Notes |
|---------|--------|-------------|------------|-------|
| **Small SFX** | 459M | Yes (Apache 2.0) | ~2 min | Sound effects only; CPU-capable, no GPU required |
| **Small** | 459M | Yes (Apache 2.0) | ~2 min | Short music + SFX; CPU-capable |
| **Medium** | 1.4B | Yes (Apache 2.0) | 6 min 20 sec | Full compositions; <2s on H200; runs on M4 MacBook |
| **Large** | 2.7B | API-only | 6 min 20 sec | Highest quality; via stability.ai API or fal.ai |

- **URL:** stability.ai/stable-audio
- **HuggingFace:** `stability-ai/stable-audio-3-small`, `stability-ai/stable-audio-3-medium`
- **Licensing:** Community License (you own outputs, commercial use allowed); Enterprise License for >$1M ARR
- **Best for:** Ad background music, custom SFX, production pipelines where training-data licensing provenance matters


## Beatoven.ai — Fairly Trained Royalty-Free Music for Video

Beatoven.ai generates mood-based background music from text descriptions, purpose-built for video content creators. All training data is licensed from real musicians (Fairly Trained certified) — tracks carry a clean commercial license with verifiable IP provenance.

- URL: beatoven.ai
- Free tier: limited (evaluation only; no commercial rights)
- Paid: $7/month Creator (unlimited + commercial license); $20/month Pro (stems, priority generation)
- **Text-to-music:** "calm acoustic guitar with soft piano for a travel vlog" → track in seconds
- **Video-to-music:** Upload a video file; AI analyzes the visual content and generates a matching soundtrack automatically
- **Emotion control:** 16 moods (happy, sad, motivational, scary, relaxing, etc.) + regional sound styles + adjustable tempo
- Best for: YouTubers, podcasters, course creators, and game devs needing mood-appropriate instrumentals with clean commercial licensing
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 3.0); stem separation (use Mureka v8 or Stable Audio 3.0)

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

> **Note:** As of September 2026, Udio's licensed platform is still a walled garden — audio cannot be downloaded or exported, and no restoration date has been announced. For any use case where you need to keep or use the generated audio, use Suno v6 (paid — v6-mini is free but non-commercial and streaming-only), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google, now Lyria 3.5-powered), or a royalty-free library instead.
