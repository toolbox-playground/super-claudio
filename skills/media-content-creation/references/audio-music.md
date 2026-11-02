# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models (NEW — launched Sept 9, 2026):** **v6**, **v6-wild**, and **v6-mini** — Suno's first licensed-catalog model family, built in partnership with Warner Music Group, BMG, and Believe (signed one day before launch); Suno began paying these labels royalties at launch. v6-mini is free for all users; v6 and v6-wild require Pro/Premier. This is the licensed-model transition that was "pending" as of mid-2026 — it has now happened, though Suno has not fully detailed what trained v6 beyond the licensed Warner/BMG/Believe catalogs plus user data (per secondary reporting; confirm with Suno's own announcement). No v6-specific consumer or API pricing had been published as of this scan — rollout is phased, so check suno.com/pricing for current rates before assuming v4.5/v5.5-era pricing still applies.
- **Previous models:** v5.5 (March 2026) — Voices (clone your singing voice), Custom Models (tune on your catalog), My Taste (personalized generation)
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix:** pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: v6-mini free for all users (unclear if the previous 50 credits/day ~10 songs limit still applies post-v6 — verify on suno.com)
- **Download restriction (2026):** Free-tier users could not download audio files as of mid-2026 — tracks streamed/shared within the platform only; download required Pro ($10/mo) or Premier ($30/mo). Confirm whether this still applies under v6's licensed model.
- **Legal status:** Warner settled with Suno in November 2025 (the deal underlying v6's licensing). UMG and Sony Music litigation status is unclear in current reporting — some secondary (non-English) sources claim a further Sony/UMG suit filed shortly after the Warner settlement, but this is unconfirmed in English-language coverage; treat as unverified.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid, historically)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
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

## MiniMax Music 2.5 — Structural Control + Studio-Grade Fidelity (Jan 2026)

MiniMax Music 2.5 (released January 29, 2026) adds paragraph-level precision control over song structure and fixes the "muddy mixing" artifact common in AI music through improved spectral separation between vocals and instrumentation.

- URL: minimax.io/audio | API: wavespeed.ai/models/minimax/music-2.5
- Free tier: limited via minimax.io; API via WaveSpeedAI (pay-as-you-go)
- **14+ structural tags:** `[Intro]`, `[Verse]`, `[Chorus]`, `[Bridge]`, `[Interlude]`, `[Build-up]`, `[Hook]`, `[Outro]` — placed inline in the prompt to control song layout section by section
- **Audio fidelity:** Optimized soundstage keeps vocals and instruments in separate spectral regions — the key improvement over Music 2.0
- Best for: generation where song structure matters (commercial jingles, video scoring with section-to-cut sync, multi-verse songs with distinct parts)
- Not ideal for: stem export or MIDI (use Mureka v8); on-demand free generation (use Suno free tier)

## MiniMax Music 3.0 — Open-Weight Full Songs, No Territorial Restriction (NEW Aug 2026)

MiniMax shipped Music 3.0 as a hosted API in July 2026, then released the weights open on Hugging Face/GitHub/ModelScope on August 13, 2026 (repo: `MiniMaxAI/MiniMax-Music3`, ~57.4GB). Unlike some prior MiniMax open releases, this one reportedly carries no territorial carve-out. Generates full songs with vocals up to ~5 minutes in a single pass.

- **URL:** huggingface.co/MiniMaxAI/MiniMax-Music3 | API: minimax.io/audio
- **License:** MiniMax-Music3 Community License — commercial use with attribution per most sources; a separate agreement is required above $20M in project revenue (verify exact terms on the HuggingFace model card, as one source lists the license as unclear)
- **Architecture:** Condition encoder + language model (reportedly Qwen3-8B-based) + RVQ depth decoder + tokenizer + scheduler + transformer; ComfyUI support shipped same-day
- **Hardware:** Self-hosting reportedly needs a CUDA GPU with ~8–24GB VRAM (secondary source — verify against the model card)
- **Free hosted tier:** Conflicting reports — one source says a free `music-3.0-free` API tier exists, another says free API access has closed; check minimax.io directly
- **Evaluation:** No published MOS scores or head-to-head comparison against Suno/Udio/ACE-Step as of this scan
- **Best for:** Developers wanting an open-weight, self-hostable alternative to Suno/Udio for full vocal songs; teams needing commercial use without a per-song licensing fee (below the $20M revenue threshold)
- **Not ideal for:** Teams needing a verified quality benchmark before committing (none published yet); casual users wanting a no-setup hosted experience (use Suno v6-mini or Google Flow Music instead)

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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 2.5); stem separation (use Mureka v8 or Stable Audio 3.0)

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

> **Note:** As of June 2026, Udio's licensed platform has launched but operates as a walled garden — audio cannot be downloaded or exported; this has not been re-verified in this scan (Nov 2026) — check udio.com for current status. For any use case where you need to keep or use the generated audio, use Suno v6/v6-mini (licensed models, paid tiers for download — verify current terms), MiniMax Music 3.0 (open-weight, self-hosted), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
