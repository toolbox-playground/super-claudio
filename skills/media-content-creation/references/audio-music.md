# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model: v6 (released September 9, 2026)** — Suno's first flagship model trained with licensed catalog access from Warner Music Group, BMG, and Believe (the fulfillment of Suno's November 2025 Warner settlement commitment). Ships as three variants: **v6** (flagship — reliable, polished, consistent across genres; Pro/Premier only), **v6-wild** (more varied/experimental output; Pro/Premier only), and **v6-mini** (faster, lighter — available to free accounts). New: edit any section of an existing song using plain-language instructions while preserving the rest, and blend elements from multiple songs together. v5.5 and earlier models are being phased out as users migrate to v6; check suno.com/release-notes for the current retirement timeline.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs, v6-mini only); non-commercial use only
- **Important (2026):** Free-tier users can no longer download audio files — tracks can only be streamed/shared within the platform. Download requires a paid plan ($10/month Pro, $30/month Premier).
- **Litigation status (as of October 2026):** Warner Music Group remains the only major label with a settlement + licensing deal (Nov 2025), which is what funded v6's licensed training data. Universal Music Group and Sony Music are **still litigating** — talks with UMG reportedly stalled in spring 2026 over distribution rights, and in August 2026 a judge allowed UMG/Sony to add a DMCA stream-ripping claim to their suit (while rejecting an attempt to add 60,000+ more works). No fair-use ruling has been issued yet. Users who want to preserve old generations should download them now on a paid plan before older models are fully retired.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (still true as of October 2026):** Udio disabled all downloads (audio, video, stems) across all plan tiers during its 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform — no DAW export, no Spotify upload, no use in video. Brief, announced download windows have opened occasionally (e.g. a 48-hour window in November 2025) to let users retrieve pre-settlement content, but there is no standing download capability.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025) and Warner Music (Nov 2025), with a joint licensed platform promised for a 2026 relaunch. Sony's separate lawsuit against Udio continues (a federal judge declined to dismiss Sony's DMCA claim in April 2026). As of October 2026 the promised fully-licensed, rebuilt platform **still has not shipped** — Udio remains on its pre-relaunch model with downloads locked, and the relaunch is expected to operate as a **walled garden** (stream/share only, no export) once it does ship.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation

Mureka (by Kunlun Tech / Skywork) is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. The flagship model has moved on from v8 — V9 shipped around March 2026 with more natural vocals and better instrumental separation, and **V9.5** (mid-August 2026) followed as the current default model on the consumer and API endpoints, pushed as more human-sounding vocal delivery. V9 remains available as a fallback model.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: $10/month (400 songs, full commercial rights); $30/month Pro
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)
- Note: exact generation length may overshoot the requested duration in practice (reported in third-party testing) — verify output length before relying on it for sync-to-video work


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

### MiniMax Music 3 — Open-Weight Successor (Aug 2026)

MiniMax released **Music 3** as an open-weight model (~11B params, MoE-style Global/Local LLM + flow-matching decoder) on Hugging Face/GitHub/ModelScope in mid-August 2026 — a departure from the closed hosted-only approach of Music 2.5. It generates complete 5-minute songs in a single pass at 32kHz/16-bit stereo. Reports on the exact license terms conflict (one source cites a custom community license permitting commercial use with attribution below $20M ARR; another cites CC BY-NC 4.0) — check the HuggingFace model card before using it commercially. Separately, MiniMax's **paid hosted music API stopped accepting new signups around August 20, 2026** — self-hosting Music 3 (needs ~24GB VRAM, or ~8GB with offloading) is now the practical path for new users rather than the hosted API.

- Best for: self-hosted/open-weight pipelines, teams that already have GPU infrastructure
- Not ideal for: anyone needing a hosted API with no setup (the hosted route is closing to new accounts) or needing clear-cut commercial licensing without reading the fine print

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. Available free at flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here)
- **Model update (NEW, July 29 2026):** Google Labs shipped **Lyria 3.5** into Flow Music, improving musicality, lyric quality, and vocal performance over Lyria 3. Added **Covers** (rewrite a track's style while keeping its structure) and lip-synced music videos (generated via Gemini Omni). A dedicated iOS app also launched alongside it.
- **Also now in Gemini (Sept 2026):** Lyria 3.5 rolled out beyond Flow Music into the Gemini app and Gemini API (plus Google AI Studio and Google Vids) in early September 2026 — so the same model is reachable either through the dedicated Flow Music workspace or directly inside Gemini.
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; Replace and Extend features for remixing specific sections of a track; Covers for restyling a full track
- Stack: Lyria 3.5 (audio) + Veo / Gemini Omni (music video, lip-sync) + Nano Banana (album art) — all Google AI models
- Best for: free music generation with optional music video output; users in the Google/Gemini ecosystem who want the same model available both in a dedicated workspace and inside Gemini directly


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

> **Note:** As of October 2026, Udio's promised licensed relaunch still has not shipped — downloads remain disabled on the current platform, and the relaunch is expected to be a walled garden (stream/share only) once it does ship. For any use case where you need to keep or use the generated audio, use Suno v6 (paid), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google, now on Lyria 3.5), or a royalty-free library instead.
