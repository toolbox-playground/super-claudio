# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model:** v6 family (launched September 9, 2026) — v6 and v6-wild (Pro/Premier), v6-mini (all tiers, including free); trained from scratch on catalog licensed from Warner Music Group, BMG, and Believe. The launch retired every prior model (v4 through v5.5) — they're no longer selectable, so all new generations must use v6/v6-wild/v6-mini. Songs already made on retired models still play, share, and remix/cover fine; they were not deleted.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Studio 1.2 (February 2026) added warp markers, remove FX, and alternates. Available to Pro/Premier subscribers.
- **Stem Separation (June 11, 2026 update):** Three modes — **Advanced Split** (NEW, Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix** (Updated): pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- **Important (download caps effective September 3, 2026):** Free tier gets 7 downloads total for the lifetime of the account (no commercial rights). Pro ($10/month) gets 20 downloads/month. Premier ($30/month) gets 60 downloads/month. Extra downloads cost $2.99/song on any plan — bulk packs ($8.95/3, $14.95/5, $29.90/10) save almost nothing per song. Tracks beyond your cap can still be streamed/shared in-platform.
- **Model retirement (completed September 9, 2026) and litigation:** The v6 launch retired all prior models as described above. Litigation has intensified, not resolved: on September 18, 2026, Universal Music Group and Sony Music filed a *new* joint lawsuit — separate from the original RIAA-era case — specifically targeting v6, alleging it was trained on the outputs of the earlier (allegedly infringing) models and that this "launders" rather than removes the infringement; the labels are seeking damages up to $150,000/work across 60,202 recordings. The original case is still proceeding toward a fair-use ruling on the underlying claims; no verdict as of September 2026. Users who want to preserve old generations should download them now (see caps above).
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music Group (Nov 2025), Merlin (Jan 2026), Kobalt (Apr 2026), and Believe (Apr 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9 — Developer-Focused AI Music Generation

Mureka V9 (Kunlun Tech, announced March 27, 2026) is the current flagship, replacing v8: more natural vocals, stronger prompt understanding, and more coherent full-track output, alongside the same native API, stem separation, and MIDI export developers relied on v8 for.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: $10/month (400 songs, full commercial rights); $30/month Pro
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)
- Supports 50+ styles and 10+ languages; unused credits don't expire


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

## MiniMax Music 3.0 — Open-Weights, Production-Ready, Up to 5-Minute Songs (Jul 2026)

MiniMax Music 3.0 replaces Music 2.5 as MiniMax's flagship: an open-weights model (API shipped July 16, 2026; weights/research published August 13, 2026) that sustains a creator's expressive intent across full songs up to five minutes, with clearer instrument rendering and vocals described as "performed rather than synthesized." It uses a Structured Captions framework for fine-temporal-granularity control, superseding 2.5's inline structural tags, and outputs 32kHz/16-bit stereo.

- URL: minimax.io/audio | API: wavespeed.ai/models/minimax/music-3.0
- Open weights: Yes — a first for a production-grade MiniMax music model
- Free tier: limited via minimax.io; API via WaveSpeedAI (pay-as-you-go)
- **Structured Captions:** fine-temporal-granularity music description — the successor to 2.5's `[Intro]`/`[Verse]`/`[Chorus]`/`[Bridge]` inline tag system
- **Song length:** up to 5 minutes, sustaining a coherent arrangement and intent throughout
- Best for: production-grade full songs with realistic vocals; teams that want open weights to self-host
- Not ideal for: stem export or MIDI (use Mureka V9); on-demand free generation (use Suno free tier)

> Music 2.5 (Jan 2026, paragraph-level structural tags) is still live and cheaper for quick tag-driven generation, but 3.0 is the recommended default as of September 2026.

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. Available free at flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here)
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; new Replace and Extend features for remixing specific sections of a track
- Stack: Lyria 3 (audio) + Veo (music video) + Nano Banana (album art) — all Google AI models
- Best for: free music generation with optional music video output; users in the Google/Gemini ecosystem


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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 3.0); stem separation (use Mureka V9 or Stable Audio 3.0)

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

> **Note:** As of September 2026, Udio's licensed platform operates as a walled garden — audio cannot be downloaded or exported. Suno now caps downloads on every tier too (7 lifetime on Free, 20/month Pro, 60/month Premier, $2.99/song beyond that — see above). For any use case where you need to keep or use the generated audio without limits, use ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), MiniMax Music 3.0 (open weights, self-hostable), or a royalty-free library instead.
