# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest model (NEW Sept 9, 2026): v6 family** — Suno's first release built on licensed music, following settlements/licensing deals with Warner Music Group, BMG (signed Aug 12, 2026), and Believe/TuneCore (signed Sept 8, 2026, the day before launch). Three models: **v6** (flagship — reliable, polished, consistent across genres), **v6-wild** (more varied/experimental, less predictable), **v6-mini** (faster, available to everyone). New features include editing one section of a finished song in plain language, mashing up several source tracks in one request, and using text/audio/image/video as references. **All older models (v4 through v5.5) were retired at launch** — v5.5 (March 2026, with the Voices singing-clone feature) was the last pre-licensed generation. Reception is mixed: some longtime users report a step back in raw audio quality, others report cleaner vocals and covers.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers; no download-cap limits apply to Studio users.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: 50 credits/day (~10 songs); non-commercial use only
- **Download caps (NEW, effective Sept 3, 2026):** Suno replaced the prior "no downloads on free" policy with tiered download caps, retroactive to everything already in your library — **Free: 7 total (lifetime) downloads**, no commercial rights; **Pro ($8/mo): 20 downloads/month**, resets monthly, unused don't carry over; **Premier ($24/mo): 60 downloads/month**. Extra downloads beyond the cap can be purchased. Suno framed this as an anti-abuse measure tied to the licensing deals.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (limited downloads on free per the cap above; more downloads on paid plans)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (updated Sept 2026):** Udio disabled all downloads (audio, video, stems) across all plan tiers during its 2025–2026 licensing transition, following its Universal Music Group settlement (Oct 2025). Tracks can only be streamed/shared on-platform. **Correction:** as of August 20, 2026, the licensed relaunch had **not** publicly shipped despite earlier plans for a Q2 2026 launch — neither Udio nor UMG had confirmed a public launch date.
- **Licensing deals signed:** Universal Music Group (Oct 2025), Warner Music Group, Merlin, and Kobalt (by Q1 2026) — but not Sony Music, which is still litigating against the service. The fully licensed platform is expected to restore downloads when it eventually launches, but as of this writing that has not happened and no firm date has been confirmed.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9 — Developer-Focused AI Music Generation (Updated 2026)

Mureka V9 (from Skywork AI / Kunlun Wanwei) is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. V9 uses **MusiCoT** (Music Chain-of-Thought) to plan song structure before rendering audio, and supports 50+ styles and 10+ languages.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: ~50 credits/day (2–3 test songs); no commercial license; MP3 output only
- Paid: Pro $9/mo ($7/mo annual) — ~500 songs/month, full commercial rights; Premier $27/mo ($24/mo annual) — adds WAV output, stems, and MIDI export; also available pay-as-you-go credit packs with no recurring charge; unused credits don't expire
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

## MiniMax Music 3.0 — Open-Weight, Self-Hostable (NEW Aug 2026)

MiniMax Music 3.0 (weights published August 13, 2026) is MiniMax's newest music model and the first **open-weight** song model you can run end-to-end on your own hardware — a major shift from the closed 2.5/2.0 generations. It turns a concept plus optional lyrics into a full song up to 5 minutes long, in 32kHz stereo, with day-zero support in ComfyUI, diffusers, and SGLang.

- **URL:** minimax.io/audio | **HuggingFace:** `MiniMaxAI/MiniMax-Music3` (open weights, GGUF quantizations also available from the community)
- **License:** Commercial use permitted with attribution; a separate agreement with MiniMax is only required once a project earns more than $20M
- **Free tier:** Weights are free to download and self-host (no per-generation fee — compute/hosting is on you); as of Aug 20, 2026 MiniMax's own paid Music/Lyrics Generation APIs were closed to new users, who are directed to minimax.io/audio or the self-hosted checkpoint
- **Max length:** Up to 5 minutes per generation
- Best for: teams that want to self-host an open-weight music model instead of paying per API call; developers already using ComfyUI/diffusers pipelines
- Not ideal for: stem export or MIDI (use Mureka V9); turnkey hosted generation with no setup (use Suno or Udio)

> **Note:** MiniMax Music 2.5 (Jan 2026) — paragraph-level structural tags (`[Intro]`, `[Verse]`, `[Chorus]`, etc.) and improved vocal/instrument spectral separation — is superseded by 3.0 above but its structural-tag syntax likely still works if you're on an older integration.

## Google Flow Music (formerly Producer.ai / Riffusion) — Google-Owned, Free Tier, Now on Lyria 3.5

Riffusion rebranded to Producer.ai in July 2025. Google acquired Producer.ai in February 2026 and moved the team into Google Labs and Google DeepMind. On April 20, 2026, Google rebranded the tool again to **Google Flow Music**, integrating it into the broader Google Flow ecosystem alongside the video and image tools. **Lyria 3.5 (July 29, 2026)** upgraded the underlying model with richer melodic structure, better lyric/section-boundary adherence, more expressive and better-pronounced vocals, and finer tempo/duration/track-length controls (including separate controls for vocals, drums, and bass) — a free upgrade for all existing users.

- URL: flowmusic.app (old URL producer.ai redirects here)
- **Pricing:** Free tier (daily credit top-up, no waitlist, 250+ countries) plus paid tiers — Starter $6/mo, Plus $18/mo, Member $48/mo
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
- **Update (Aug 2026):** Stability AI added a DAW plugin and a more advanced generation experience directly on stableaudio.com, in addition to the API/self-hosted routes
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

> **Note:** As of September 2026, Udio still has not publicly relaunched its licensed platform — downloads remain disabled across all tiers, and no launch date has been confirmed (earlier Q2 2026 plans did not materialize; see the Udio entry above). For any use case where you need to keep or use the generated audio, use Suno (v6, paid plans get 20–60 downloads/month; free tier now gets 7 lifetime downloads), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
