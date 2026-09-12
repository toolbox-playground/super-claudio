# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models: v6, v6-wild, v6-mini** (launched Sept 9, 2026) — Suno's first models trained on licensed catalogs from Warner Music Group, BMG, and Believe, replacing the v4–v5.5 line entirely; existing user-generated songs from old models remain playable/shareable, but the old models themselves are retired and can no longer generate new output
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- **Important (2026):** Free-tier users can no longer download audio files — tracks can only be streamed/shared within the platform. Download requires a paid plan ($10/month Pro, $30/month Premier).
- **Litigation status (Sept 2026):** WMG (Nov 2025) and BMG (Aug 12, 2026) have settled with Suno and licensed their catalogs for the new v6 models. UMG and Sony Music have NOT settled and continue suing — the US summary judgment ruling in UMG/Sony v. Suno has been pushed back to Jan 8, 2027 (no verdict yet). Separately, a Munich court ruled against Suno in the German GEMA case on July 31, 2026 (non-US, does not affect Suno's US operations). Users relying on old v4–v5.5 generations should download them now on a paid plan, since those models can no longer regenerate similar output.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (Sept 2026 — still true):** Udio still has all downloads (audio, video, stems) disabled across all plan tiers. Tracks can only be streamed/shared on-platform — no DAW export, no Spotify upload, no use in video.
- **Licensing status:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026); UMG is building a new licensed, still-walled-garden platform expected "sometime in 2026" — not live yet as of September 2026. Sony Music has NOT settled and filed a fresh copyright suit against Udio, which remains active. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation

Mureka is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. Version history: v8 (Mar 2026) → v9 (Apr 2026) → **V9.5** (Aug 31, 2026, current) — with an **O3** reasoning model ("test-time scaling" for composition) in preview.

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

## Alibaba HappyShrimp 1.0 — Beta Text-to-Music (NEW Aug 2026)

Alibaba launched HappyShrimp 1.0 in beta on August 17, 2026 — a new AI music generation model covering melody, arrangement, lyrics, and vocals from a single text prompt. Part of Alibaba's broader push across model categories following HappyHorse (video) and Fun-Realtime-TTS (speech).

- Best for: early adopters wanting to evaluate Alibaba's music stack alongside Suno/Mureka; not yet established on independent benchmarks
- Not ideal for: production use requiring proven commercial licensing terms (details still emerging during beta)

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

> **Note:** As of September 2026, Udio still operates as a walled garden — audio cannot be downloaded or exported, and its UMG-licensed platform hasn't launched yet. For any use case where you need to keep or use the generated audio, use Suno v6 (paid), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
