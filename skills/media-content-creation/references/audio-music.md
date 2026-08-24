# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model:** v5.5 (March 2026) — Voices (clone your singing voice), Custom Models (tune on your catalog), My Taste (personalized generation); v5.5 requires Pro/Premier; free tier capped at v4.5 and below
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Studio 1.2 (February 2026) added warp markers, remove FX, and alternates. Available to Pro/Premier subscribers.
- **Stem Separation (June 11, 2026 update):** Three modes — **Advanced Split** (NEW, Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix** (Updated): pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- Pricing (unchanged as of August 2026): $10/month Pro (2,500 credits, ~500 songs, commercial rights); $30/month Premier (10,000 credits, ~2,000 songs, Suno Studio access)
- **Important — new download caps starting September 3, 2026:** Suno announced tiered lifetime/monthly download limits that apply retroactively to a user's whole library, not just new songs: **Free — 7 lifetime downloads**; **Pro — 20 downloads/month**; **Premier — 60 downloads/month** (unused downloads don't roll over; extra downloads purchasable; Premier users working inside Suno Studio keep unlimited downloads there). Previously free-tier users simply couldn't download at all and paid tiers were unlimited — now even paid tiers are capped. Users who want to preserve existing generations should download them before the cap takes effect.
- **Model retirement (still pending):** Following a November 2025 settlement with Warner Music Group, Suno committed to retiring all current models (trained on unlicensed audio) once new licensed-catalog models launch. As of August 2026 this still has not happened — current models (v5.5) remain active and no licensed model or "Suno v6" has shipped or has a confirmed date.
- **Litigation update (August 2026):** Sony Music has **not** settled and remains in active U.S. litigation against Suno (Massachusetts federal court) — fact discovery runs to September 30, 2026 and dispositive/fair-use summary-judgment motions aren't due until April 9, 2027, so a U.S. fair-use ruling is now expected in 2027, not 2026. Separately, in the first ruling worldwide against a generative-music tool, the **Munich Regional Court ruled for GEMA against Suno on July 31, 2026** (case 42 O 763/25) — it rejected Suno's fair-use defense under U.S. law for training conducted in the U.S., found Suno liable for damages over 6 compositions, and ordered disclosure of usage scale. The ruling is not final; Suno is expected to appeal. UMG and Warner Music had already settled with Suno in late 2025.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (still true as of August 2026):** Udio disabled all downloads (audio, video, stems) across all plan tiers during its 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched in 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- **Litigation update (August 2026):** Sony Music has not settled and remains in active litigation against Udio — on July 20, 2026 Sony filed a second SDNY lawsuit against Udio covering roughly 30,000 additional sound recordings, on top of its existing suit.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation (updated Aug 2026)

Mureka is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. The flagship model has moved on from v8 — V9 (March 2026) improved vocal naturalness and full-track coherence across 10+ languages, and Mureka is now on **V9.5**, with an **O3 model in preview** (uses "test-time scaling" to make songs feel more coherent start-to-finish) and **V10 expected Q3 2026**. Mureka also added Studio and Remix tools in 2026, pushing toward an end-to-end "AI-native" creation-to-listening platform.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: plans from ~$10/month with full commercial rights (check mureka.ai/pricing for current tiers — pricing pages change more often than model versions)
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

## MiniMax Music 3.0 — Open-Weight, Up to 5-Minute Songs (NEW Aug 2026)

MiniMax Music 3.0 (full release August 13, 2026) supersedes Music 2.5 and is a significant shift: it's **open-weight** (downloadable free from HuggingFace), generates complete songs up to 5 minutes long (up from Music 2.5's shorter clips), and focuses on sustaining expressive intent and natural-sounding (rather than synthetic-sounding) vocals across the full track length.

- URL: minimax.io/audio | Weights: HuggingFace (free download) | API: platform.minimax.io, wavespeed.ai
- **Pricing:** $0.15 per generation (up to 5 min); free API tier `music-3.0-free` capped at 3 requests/minute
- **Open-weight:** Yes — self-hostable, useful for studios/developers wanting custom integration (note: MiniMax has reportedly stopped issuing new paid Music/Lyrics API access to new accounts, though existing paid users and the open-weight/self-hosted route remain available — check minimax.io for current account access policy)
- Best for: longer-form songs (up to 5 min) with sustained emotional/structural coherence; developers wanting a free, self-hostable open-weight music model
- Not ideal for: stem export or MIDI (use Mureka); on-demand free generation without self-hosting (use Suno free tier)
- Legacy: MiniMax Music 2.5 (Jan 2026) added 14+ inline structural tags (`[Intro]`, `[Verse]`, `[Chorus]`, `[Bridge]`, etc.) for section-by-section layout control — still usable via wavespeed.ai/models/minimax/music-2.5 if you specifically need tag-based structure control

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free, Lyria 3 Powered

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. Available free at flowmusic.app.

- URL: flowmusic.app (old URL producer.ai redirects here)
- Free tier: daily credit top-up; globally available (250+ countries), no waitlist
- Input: text prompt; also supports image-to-music and audio-to-music inputs; Replace and Extend features for remixing specific sections of a track
- **Update (July 2026):** Now accepts direct upload of your own beats/instrumentals for the AI to analyze, extend, and remix — not just prompt-from-zero generation
- **Update (I/O 2026):** Dedicated mobile apps for Google Flow and Flow Music announced, alongside Gemini Omni integration
- Stack: Lyria 3 (audio) + Veo (music video) + Nano Banana (album art) — all Google AI models
- Best for: free music generation with optional music video output; remixing your own material; users in the Google/Gemini ecosystem


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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 3.0); stem separation (use Mureka or Stable Audio 3.0)

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

> **Note:** As of August 2026, Udio's licensed platform has launched but still operates as a walled garden — audio cannot be downloaded or exported, and Sony Music litigation against Udio remains active and unsettled. Suno's downloads are also becoming more restricted: starting September 3, 2026, even paid Suno plans face monthly download caps (Pro 20/mo, Premier 60/mo; free tier 7 lifetime). For any use case where you need to keep or use the generated audio, use Suno (paid, download promptly given the new caps), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
