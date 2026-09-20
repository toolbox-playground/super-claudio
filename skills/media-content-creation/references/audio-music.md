# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model family: v6 (NEW, launched September 9, 2026)** — replaced every previous model (v5.5 and earlier) with three new models trained from scratch on licensed catalog from Warner Music Group, BMG, and Believe: **v6** (flagship, consistent/polished output across genres, Pro/Premier), **v6-wild** (deliberately less predictable, more textured/experimental results, Pro/Premier), and **v6-mini** (faster, free on every plan including Free). New features: edit one section of a finished song in plain language, build a mashup from multiple source tracks in one request, and use text, audio, image, or video as references. Note: many longtime power users report v6 as a step down in raw audio quality compared to v5.5 — reception has been mixed.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs), v6-mini only; non-commercial use only, no commercial rights on Free
- **Pricing/downloads:** Free-tier users still cannot download audio — tracks stream/share on-platform only. Downloading (and commercial rights, per Terms of Service effective September 3, 2026) requires Pro ($8–10/month, 2,500 credits, 20 downloads/month) or Premier ($24–30/month, 10,000 credits, 60 downloads/month, unlimited Studio exports).
- **Licensing/lawsuit status (updated Sept 2026):** The Nov 2025 Warner settlement, plus new BMG (August 2026) and Believe (September 8, 2026) licensing deals, supplied the catalog behind v6. However, Universal Music Group and Sony Music are **not** settled: on September 18, 2026 they filed a second lawsuit (identifying 60,202 additional sound recordings) alleging that v6 — because it was partly trained on outputs of Suno's earlier, allegedly infringing models — "launders" that infringement rather than eliminating it. UMG/Suno settlement talks reportedly hit an impasse in April 2026. The American Federation of Musicians has separately sued UMG and Warner over their Suno/Udio settlements, arguing musicians aren't benefiting. Users who want to preserve old (pre-v6) generations should download them now on a paid plan, since the old models are no longer offered.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- **Sony Music litigation ongoing (updated):** Unlike UMG and Warner, Sony has not settled. After a court denied Sony's bid to add 30,000+ recordings to its original case, Sony filed a **separate second lawsuit on July 20, 2026**, asserting 30,117 additional sound recordings and reportedly seeking around $4.5 billion in damages. As of this writing Sony remains the only major label still actively suing Udio.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation (UPDATED Aug 2026, was v8)

Mureka has iterated past v8 to **V9 (March 2026)** and then **V9.5 (August 31, 2026)**, its latest model — improving vocal quality, prompt-control accuracy (97.0% pass rate), and genre expression (95.7%) via its MusiCoT (Music Chain-of-Thought) structure-planning approach. It remains the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. Free-tier accounts are capped at the older v7.5 model; V9.5 requires a paid plan.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — capped at v7.5-all model, non-commercial only, no downloads, Mureka retains output rights on free
- Paid: check mureka.ai/subscribe for current V9.5 tier pricing (paid plans required for V9.5, MIDI/stem export, and commercial rights — exact prices fluctuate and are best confirmed on-site)
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)


## ElevenLabs Music v2.5 — Best Model Yet, Genre-Switching + API Access (UPDATED Sept 2026)

ElevenLabs launched ElevenMusic as an iOS app on April 1, 2026, shipped Music v2 on May 26, 2026, and released **Music v2.5 on September 14, 2026** as its most advanced music model yet — built on licensed data, not involving UMG. In blind A/B testing across 47,885 prompt pairs, v2.5 was preferred over v2 the majority of the time, with the biggest gains in vocal-led and acoustic-heavy genres (R&B, soul, hip hop, rock, metal, orchestral, cinematic). It's now the default model in ElevenMusic, ElevenCreative, and the API.

- URL: elevenlabs.io (ElevenMusic iOS, ElevenCreative web app, ElevenAPI)
- **API model_id:** `music_v2_5` (Generate music, Stream music, Generate music detailed, video-to-music, and Compose/plan endpoints); `music_v2` still supported
- Free tier: up to 7 songs/day in ElevenMusic app (personal use only; no commercial rights on free)
- Commercial use: Starter plan+ (trained on licensed data — cleared for commercial use on paid plans)
- Input: natural language text prompt; control lyrics on/off, song length, writing style, genre
- **Genre-switching mid-track:** one generation can shift between wildly different styles (operatic intro → metal breakdown → ambient outro)
- **Chunk-based composition:** build tracks section by section using GenerationChunk and AudioRefChunk objects — intro, verse, chorus, bridge, outro — each preserving tonal continuity across the full track; composition plans now support up to 6,132 characters (up to 30 lines of 200 characters each)
- **Inpainting:** rebuild specific sections (e.g., only the bridge) without touching the rest of the song
- Better multilingual lyrics and arrangement vs Music v1/v2
- Best for: developers integrating music generation via API (ElevenAPI); ad music and branded content (ElevenCreative); quick casual generation (ElevenMusic iOS app)

## MiniMax Music 3.0 — Open-Weight Model, Up to 5-Minute Songs (NEW Aug 2026, replaces Music 2.5/2.6)

MiniMax Music 3.0, announced August 13, 2026, replaces Music 2.5/2.6 as MiniMax's flagship and is a major change of direction: it's released as **open weights** (downloadable and self-hostable, built on a Qwen3-8B backbone + diffusion transformer + flow-matching VAE), generating complete songs up to 5 minutes with clearer instrument rendering and more natural, "performed-sounding" vocals from a concept + optional lyrics.

- URL: minimax.io/audio | **HuggingFace:** `MiniMaxAI/MiniMax-Music3` (weights + inference code)
- **License:** Custom Community License — commercial use allowed with attribution; projects over $20M revenue must sign a separate agreement with MiniMax (not unqualified open-source)
- **Important API change (Aug 20, 2026):** MiniMax's paid Music Generation and Lyrics Generation **APIs are closed to new users** — the free `music-3.0-free`/`music-2.6-free`/`music-cover-free` API IDs were discontinued. Existing paying API users keep access; everyone else must self-host the open-weight checkpoint or use MiniMax Audio directly.
- **Song length:** Up to 5 minutes in a single generation (up from ~2–3 min on Music 2.5/2.6)
- Best for: teams wanting to self-host a capable open-weight music model instead of a metered API; longer single-take songs with clearer mixing
- Not ideal for: turnkey hosted API access for new users (now closed — use Suno, Mureka v8, or ElevenLabs Music v2.5 instead); stem export or MIDI (use Mureka v8)

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

> **Note:** As of September 2026, Udio's licensed platform operates as a walled garden — audio cannot be downloaded or exported — and Sony Music is still actively suing Udio (a second suit filed July 20, 2026) even though UMG and Warner have settled. Suno's new v6 models (Sept 9, 2026) are licensed with Warner/BMG/Believe but UMG and Sony filed a fresh lawsuit against Suno on September 18, 2026 over v6. For any use case where you need to keep or use the generated audio, use Suno (paid), ElevenLabs Music v2.5 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
