# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models: the v6 family (launched September 9, 2026)** — Suno's first models trained from scratch on a fully licensed catalog, built with Warner Music Group, BMG, and Believe/TuneCore. Three variants: **v6** (flagship — reliable, polished, precise; Pro/Premier), **v6-wild** (same family tuned for looser, less predictable results; Pro/Premier), and **v6-mini** (fast model behind free-tier generation). New capabilities: section editing, mashups, sampling, multimodal prompting, and natural-language lyric edits; watermarking on generated songs is planned.
- **All prior models retired:** As of September 9, 2026, Suno retired every model before v6 — v5, v5.5, v4.5, and v4 are no longer selectable. Existing songs stay in your library, playable and shareable, and can still be used as a basis for covers/remixes, but any further edits to them now go through v6.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs) on v6-mini; non-commercial use only
- **Download caps (in effect since September 3, 2026):** Free — 7 lifetime downloads total; Pro — 20 downloads/month; Premier — 60 downloads/month (no cap when working inside Suno Studio). The cap applies retroactively to songs already in your library.
- **Pricing:** Pro $10/month ($8/month billed annually); Premier $30/month ($24/month billed annually). Commercial-use rights require Pro or above — the Free tier's license stays non-commercial only.
- **Litigation:** UMG and Sony Music litigation remains active alongside newer proposed class actions filed against Suno in September 2026; the licensing deals with Warner, BMG, and Believe/TuneCore (signed Aug–Sept 2026) do not resolve those separate cases.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid, subject to the download caps above)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation

Mureka (from Skywork AI / Kunlun Wanwei) is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. V9.5 (August 2026) followed V9's move to MusiCoT (Music Chain-of-Thought, which plans song structure before rendering audio), adding richer emotional depth, more cohesive arrangements, and more lifelike vocals. An **O3 model** was previewed alongside V9.5, using "test-time scaling" to let the model reassess a song as it develops.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, no downloads, Mureka retains output rights on free
- Paid: plans start around $8–10/month with commercial rights included while subscribed (check mureka.ai for current tiers/pricing — sources vary on exact figures); higher tiers add priority generation and voice cloning
- Languages/styles: 50+ styles, 10+ languages
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: included on paid plans while the subscription is active (royalty-free, use in ads/videos/streaming)


## ElevenLabs Music v2.5 — Genre-Switching AI Music with API Access (Sept 2026)

ElevenLabs launched ElevenMusic as an iOS app on April 1, 2026, shipped Music v2 on May 26, 2026 (mid-track genre switching, chunk-based composition plans, full API access), and followed with **Music v2.5 on September 11, 2026** — now the default model for prompted and reference generation in ElevenMusic, with improved audio quality and prompt adherence on the same workflows (composition plans, Audio Reference, inpainting).

- URL: elevenlabs.io (ElevenMusic iOS, ElevenCreative web app, ElevenAPI)
- **API model_id:** `music_v2` / `music_v2_5` (on Generate music, Stream music, Generate music detailed, Upload music endpoints)
- Free tier: up to 7 songs/day in ElevenMusic app (personal use only; no commercial rights on free)
- Commercial use: Starter plan+ (trained on licensed data — cleared for commercial use on paid plans)
- Input: natural language text prompt; control lyrics on/off, song length, writing style, genre
- **Genre-switching mid-track:** one generation can shift between wildly different styles (operatic intro → metal breakdown → ambient outro)
- **Chunk-based composition:** build tracks section by section using GenerationChunk and AudioRefChunk objects — intro, verse, chorus, bridge, outro — each preserving tonal continuity across the full track
- **Inpainting:** rebuild specific sections (e.g., only the bridge) without touching the rest of the song
- Better multilingual lyrics and arrangement vs Music v1
- Best for: developers integrating music generation via API (ElevenAPI); ad music and branded content (ElevenCreative); quick casual generation (ElevenMusic iOS app)

## MiniMax Music 3.0 — Open-Weight, Full-Song Generation up to 5 Minutes (Aug 2026)

MiniMax Music evolved fast in 2026: Music 2.5 (January) added paragraph-level structural control; **Music 2.6 (April 10, 2026)** added AI Cover (restyle an existing song while preserving its melody) and a Lyrics Optimizer (auto-generate lyrics from a style prompt); **Music 3.0 (announced August 13, 2026)** is the current flagship — an **open-weight** model (custom MiniMax Music 3 Community License, commercial use permitted with attribution; a separate agreement is required only once a project earns over $20M) that composes, arranges, performs, and produces a complete song — up to 5 minutes long — in a single generation while maintaining longer-range musical consistency. Architecture: an 8B "Global" LLM (Qwen3-8B backbone) for long-range structure plus a 0.6B "Local" LLM for frame-level acoustic detail, with Flow Matching/Flow-VAE synthesis.

- URL: minimax.io/audio | Weights: `MiniMaxAI/MiniMax-Music3` on HuggingFace | API: wavespeed.ai/models/minimax
- **License:** MiniMax Music 3 Community License — open-weight, commercial use allowed with attribution; free API tiers for new users have been discontinued (existing paid API customers continue; new users self-host the checkpoint or use MiniMax Audio directly)
- **14+ structural tags (Music 2.5+):** `[Intro]`, `[Verse]`, `[Chorus]`, `[Bridge]`, `[Interlude]`, `[Build-up]`, `[Hook]`, `[Outro]` — placed inline in the prompt to control song layout section by section
- Best for: generation where song structure matters (commercial jingles, video scoring with section-to-cut sync, multi-verse songs with distinct parts); self-hosted deployment (open weights)
- Not ideal for: stem export or MIDI (use Mureka V9.5); on-demand free generation (use Suno free tier or Google Flow Music)

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3.5 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. On **July 29, 2026, Google shipped Lyria 3.5** in Flow Music, upgrading musicality (richer, more natural melodic structures), lyrics (better prompt adherence, tracks verse/chorus/bridge boundaries), vocals (more realistic, emotionally nuanced, improved pronunciation), and creative control (explicit tempo, vocals, drums, bass, and track-length controls). Google also added song generation, editing, and stem splitting to **Spaces**, a "vibe coding" tool inside Flow Music, moving it closer to feature parity with Suno and Udio. Available free at flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here)
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; Replace and Extend features for remixing specific sections of a track
- Stack: Lyria 3.5 (audio) + Veo (music video) + Nano Banana (album art) — all Google AI models
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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 3.0); stem separation (use Mureka V9.5 or Stable Audio 3.0)

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

> **Note:** As of June 2026, Udio's licensed platform has launched but operates as a walled garden — audio cannot be downloaded or exported. For any use case where you need to keep or use the generated audio, use Suno (paid, subject to download caps since Sept 2026), ElevenLabs Music v2.5 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
