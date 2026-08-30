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
- **Download caps (Aug 2026, effective Sept 3, 2026):** Suno is moving to platform-wide download caps to curb mass-export abuse — free users get a **lifetime cap of 7 downloads**; Pro subscribers are capped at **20 downloads/month**; Premier subscribers can keep downloading without limit from Suno Studio. This replaces the earlier "free tier can't download at all" state — free users now get a small one-time allowance instead of zero.
- **Voice cloning now on free + mobile (Aug 10, 2026):** Suno's "Voices" feature (clone your singing voice) rolled out to iOS and Android, and free-plan users now get a limited trial of Voices before being prompted to upgrade for full access.
- **BMG licensing deal (Aug 12, 2026):** Suno signed a global licensing alliance with BMG (following its earlier Warner Music Group settlement), covering BMG's recorded and publishing catalog, with participating artists compensated for use in training — ahead of Suno's planned launch of its first fully label-backed, licensed music model.
- **Model retirement (pending 2026):** Following the November 2025 Warner settlement and the new BMG deal, Suno is moving toward retiring current unlicensed-catalog models once new licensed models launch — not yet complete as of August 2026. UMG and Sony Music litigation remains active and has intensified: Judge Saylor issued mixed rulings in UMG v. Suno on August 18, 2026, and Round Hill Music filed a separate copyright suit against Suno (and, separately, Anthropic) on August 17, 2026, seeking damages potentially exceeding $1B. Users who want to preserve old generations should download them now on a paid plan, ideally before the Sept 3 download-cap change.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

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

## MiniMax Music 3.0 — Open-Weight, Up to 5-Minute Songs (NEW Aug 2026)

MiniMax released Music 3.0 in August 2026, superseding Music 2.5. It writes, arranges, performs, and mixes a complete song up to **5 minutes long** in one generation (up from ~2–3 min on 2.5), with richer arrangements, clearer instrument separation, and more natural-sounding (less synthetic) vocals, output at 32kHz stereo. The bigger change: **MiniMax open-weighted Music 3 on Hugging Face** (`MiniMaxAI/MiniMax-Music3`) under a custom MiniMax Community License — commercial use is allowed with attribution ("MiniMax-Music3" displayed in your product UI), and only requires a separate paid agreement once a project earns over $20M/year.

- URL: minimax.io/audio | HuggingFace: `MiniMaxAI/MiniMax-Music3` | API: platform.minimax.io
- **License:** MiniMax Community License (open-weight, not OSI-open-source) — free commercial use under $20M revenue with attribution
- **Duration:** up to 5 minutes per generation (was ~2–3 min on Music 2.5)
- **API pricing:** ~$0.15 per generated track (verified pay-as-you-go rate) — **but as of August 20, 2026, MiniMax closed the paid Music Generation and Lyrics Generation APIs to new users**; existing paying customers can keep using them. New users should self-host the open weights or use MiniMax Audio directly instead of the API.
- **14+ structural tags carried over from 2.5:** `[Intro]`, `[Verse]`, `[Chorus]`, `[Bridge]`, `[Interlude]`, `[Build-up]`, `[Hook]`, `[Outro]` — placed inline to control song layout section by section
- Best for: generation where song structure and longer runtime matter (commercial jingles, video scoring with section-to-cut sync); teams wanting to self-host given the API is now closed to new signups
- Not ideal for: stem export or MIDI (use Mureka v8); on-demand free generation (use Suno free tier); anyone needing a simple pay-as-you-go API today (that path is closed to new users — self-hosting the open weights is now the primary route in)

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

> **Note:** As of June 2026, Udio's licensed platform has launched but operates as a walled garden — audio cannot be downloaded or exported. For any use case where you need to keep or use the generated audio, use Suno (paid), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
