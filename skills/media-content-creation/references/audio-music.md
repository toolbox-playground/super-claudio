# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models:** v6, v6-wild, and v6-mini (launched September 9, 2026) — trained from scratch on licensed catalog from Warner Music Group, BMG, and Believe, fulfilling the November 2025 Warner settlement commitment to retire the old unlicensed-data models. All three add plain-language section/lyric editing, mashups from multiple songs, sampling, and multimodal prompting (text, audio, image, or video input).
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- **Free tier:** v6-mini only, 50 credits/day (~10 songs), shared generation queue, no monthly download allowance, no commercial rights
- **Pro ($10/month, $8/month billed yearly):** v6 + v6-wild, 2,500 credits/month, commercial rights, advanced editing, 20 song downloads/month
- **Premier ($30/month, $24/month billed yearly):** Same models as Pro, 10,000 credits/month, Suno Studio, 60 song downloads/month
- **Watermarking:** Suno now watermarks generated songs; download allowances are separate from generation credits, and songs downloaded while on a paid plan retain commercial-use rights
- **Litigation status (as of Oct 2026):** Universal Music Group and Sony Music have NOT settled and continue litigating in the U.S. — fact discovery closed September 30, 2026, with dispositive (fair-use) summary-judgment motions now due April 9, 2027 (pushed back from the earlier July 2026 estimate). Separately, a German court (Munich Regional Court) ruled against Suno in **GEMA v. Suno on July 31, 2026**, finding copyright infringement and rejecting the U.S.-style fair-use defense for models commercialized in Europe; Suno was ordered to stop the infringing uses, disclose information, and pay damages. This ruling concerns Suno's legacy (pre-v6) models and training data, not a verdict on v6's licensed catalog.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid, subject to the monthly download caps above)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (as of Oct 2026):** Udio still disables all downloads (audio, video, stems) across all plan tiers during the ongoing 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached settlement/licensing agreements with Universal Music Group (Oct 29, 2025), Warner Music Group (Nov 19, 2025), Merlin, and Kobalt. A new fully-licensed walled-garden platform is planned to launch "sometime in 2026," but **as of October 2026 it has not yet launched publicly** — no firm date has been disclosed. The current product remains available in the interim under the download-disabled restrictions above.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka 9 — Developer-Focused AI Music Generation, Chain-of-Thought Planning (Updated Apr 2026)

Mureka 9 (Kunlun Tech) is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. Mureka-9 shipped as the API model in April 2026, building on the MusiCoT ("music chain-of-thought") technique introduced by Mureka O1 — the model plans a song's structure before generating audio, which is the company's clearest technical differentiator versus Suno/Udio.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- **Paid:** Basic $8/month billed annually (400 songs, full commercial rights); Pro $24/month (1,600 songs, advanced features) — monthly (non-annual) billing may be higher; check mureka.ai/pricing for current rates
- Languages: 10+, including tonal languages
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline, multilingual lyrics and song-structure control
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

## MiniMax Music 3.0 — Current Flagship, Better Semantic Understanding (NEW Jul 2026)

MiniMax Music 3.0 (released July 16, 2026) supersedes Music 2.5/2.6 as MiniMax's current flagship, with better semantic understanding of prompts and commercial-grade audio quality. Songs run up to 5 minutes, with a toggle between vocal and fully instrumental output and selectable bitrate/sample rate.

- URL: minimax.io/audio | API: platform.minimax.io, wavespeed.ai (not currently listed on Replicate)
- **Pricing:** $0.15 per song (pay-per-generation); free trial tier `Music-3.0-free` at 3 requests/minute, no cost
- **Max length:** Up to 5 minutes per generation
- **Lyric input:** Up to ~2,000 tokens of lyric content per prompt
- **Legacy model:** MiniMax Music 2.5 (Jan 2026, 14+ structural tags like `[Intro]`/`[Chorus]`/`[Bridge]`) and 2.6 (Apr 2026) remain available via wavespeed.ai/models/minimax/music-2.5 if you need the older section-tag workflow
- Best for: generation where prompt understanding and audio quality matter most; quick free experimentation via the Music-3.0-free tier
- Not ideal for: stem export or MIDI (use Mureka 9); on-demand free generation with no rate limit (use Suno free tier)

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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 3.0); stem separation (use Mureka 9 or Stable Audio 3.0)

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

> **Note:** As of October 2026, Udio remains a walled garden with no downloads on any plan, and its new fully-licensed platform has not yet launched publicly. For any use case where you need to keep or use the generated audio, use Suno (v6/v6-wild on Pro or Premier — commercial rights, capped monthly downloads), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
