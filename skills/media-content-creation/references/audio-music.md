# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model:** v5.5 (March 2026) — Voices (clone your singing voice), Custom Models (tune on your catalog), My Taste (personalized generation); v5.5 requires Pro/Premier; free tier capped at v4.5 and below. **v6 has not shipped** as of September 2026 — Suno's August 6, 2026 update added watermarking/fingerprinting and policy changes rather than a new model; no confirmed v6 date.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Studio 1.2 (February 2026) added warp markers, remove FX, and alternates. Available to Pro/Premier subscribers.
- **Stem Separation (June 11, 2026 update):** Three modes — **Advanced Split** (NEW, Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix** (Updated): pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- **Download caps (NEW, effective September 3, 2026):** Suno now hard-caps downloads by tier instead of blocking free downloads outright — **Free: 7 total downloads** (personal use only, no commercial rights), **Pro ($10/mo): 20 downloads/month** (commercial license), **Premier ($30/mo): 60 downloads/month**. The cap applies retroactively to songs made before September 3 too; extra downloads beyond the cap can be purchased separately. Plan ahead if you need more than your tier's allotment.
- **Litigation (updated September 2026):** Warner Music settled with Suno in November 2025 and exited the case. UMG and Sony Music remain in active litigation in the U.S. (District of Massachusetts) — settlement talks have stalled, and the labels are fighting Suno's attempt to keep the Warner settlement terms sealed. A fair-use summary judgment hearing was held in July 2026 with no ruling reported as of September 2026; dispositive motions continue into early 2027. Separately, **Suno lost its German case** — on July 31, 2026 the Munich Regional Court ruled for GEMA, prohibiting Suno from reproducing/reusing six GEMA-repertoire compositions in the EU and ordering disclosure of usage scale and damages; the judgment is not final and Suno is expected to appeal. The planned retirement of Suno's current (unlicensed-data-trained) models in favor of licensed-catalog models has still not occurred as of September 2026. Users who want to preserve old generations should download them now, within their tier's cap, on a paid plan.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid, subject to the download cap above)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- **Sony Music still suing (updated):** Unlike UMG and Warner, Sony Music has not settled — it filed a *second* lawsuit against Udio on July 20, 2026, asserting 30,117 additional sound recordings (total ~30,442 across both suits), with potential statutory damages exceeding $4.5 billion. So Udio's licensing story is clean with UMG/Warner/Merlin/Kobalt but still has open legal risk from Sony.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation (UPDATED — was v8)

Mureka has moved on from v8: **V9.5** (July 2026) is now current, with an **O3** reflective-reasoning model in preview. Still the go-to for developers and technical producers — native API, stem separation, and MIDI export alongside full song generation — now with MusiCoT chain-of-thought planning for song structure.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: pay-as-you-go credits (no recurring subscription required) — 5 credits per song generation, paid credits never expire and include commercial rights; a $10/month plan (~400 songs, full commercial rights) is also offered
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid credits/plans (royalty-free, use in ads/videos/streaming)


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
- Not ideal for: stem export or MIDI (use Mureka V9.5); on-demand free generation (use Suno free tier)

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. Available free at flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here)
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; new Replace and Extend features for remixing specific sections of a track
- Stack: Lyria 3 (audio) + Veo (music video) + Nano Banana (album art) — all Google AI models
- Best for: free music generation with optional music video output; users in the Google/Gemini ecosystem

## HappyShrimp 1.0 (Alibaba) — Text-to-Music, Qwen Ecosystem (NEW Aug 2026, Beta)

Alibaba launched HappyShrimp 1.0 in beta on August 17, 2026 — a text-to-music model that generates full vocal tracks or instrumentals (melody, arrangement, lyrics, vocals) from a prompt describing an emotion, story, or genre, or from your own lyrics. Positioned inside the broader Qwen generative-AI ecosystem alongside Alibaba's other Aug 2026 audio releases (Fun-Realtime-TTS, Qwen-Audio-3.0-TTS-Plus).

- URL: via Alibaba's Qwen ecosystem / Alibaba Token Hub (ATH) — check alibabacloud.com for current access
- Free tier: daily credits (beta)
- Paid: reported around $5/month (~150 songs) and $20/month (~800 songs, more concurrent generations) — unconfirmed, still in beta
- **Caveat:** Commercial licensing terms are not yet fully published; beta status means no production-reliability or API guarantees yet — confirm commercial rights before monetizing output
- Best for: early evaluation of Alibaba's text-to-music stack; not yet a safe default for commercial work until licensing terms are confirmed

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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 2.5); stem separation (use Mureka V9.5 or Stable Audio 3.0)

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

> **Note:** As of September 2026, Udio's licensed platform operates as a walled garden — audio cannot be downloaded or exported. For any use case where you need to keep or use the generated audio, use Suno (paid; note the new September 3, 2026 download caps — 7 total on free, 20/month on Pro, 60/month on Premier), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
