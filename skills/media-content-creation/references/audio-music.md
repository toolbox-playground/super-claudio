# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models (v6, launched September 9, 2026):** Suno retired its entire prior lineup (v5.5, v5, v4.5, v4) and replaced it with three models trained on **licensed catalogs from Warner Music Group, BMG, and Believe Music** — the first Suno generation built with the music industry rather than around it. **v6** and **v6-wild** (Pro/Premier only) are the full-quality models; **v6-mini** is free-tier. New capabilities: edit one section of a finished song in plain language, build a mashup from multiple source tracks in one request, and use text, audio, image, or video as reference input.
- **What happened to old songs/models:** You can no longer generate new audio on v5.5 or earlier — but existing songs made with old models remain in your library, playable, shareable, remasterable, and coverable; they did not become inaccessible as previously feared. Suno credited recent heavy users of the old models with 500 non-expiring bonus credits as a goodwill gesture (Sept 5, 2026 email).
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers (adjust timing post-generation), Remove FX (strip reverb/effects), alternates, and expanded time signature support. Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- Free tier: v6-mini only, 50 credits/day (~10 songs); non-commercial use only
- **Downloads:** Free-tier users still cannot download audio files — tracks stream/share within the platform only. Download + full v6/v6-wild access + commercial rights require a paid plan ($10/month Pro, $30/month Premier).
- **Litigation still active despite the licensing pivot:** Sony Music and UMG filed a new lawsuit against Suno on September 18, 2026 (Massachusetts federal court), arguing the licensed v6 model is still "fruit of the poisoned tree" because it was built using techniques/data derived from the original unlicensed models. The German case (GEMA v. Suno) and the U.S. fair-use track remain unresolved as of this writing — worth checking status before relying on Suno for legally sensitive commercial use.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (streaming on free; downloadable MP3 on paid)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. As of September 2026 downloads are still disabled — tracks can only be streamed/shared on-platform — no DAW export, no Spotify upload, no use in video. Udio says downloads will return once new technical safeguards are in place, but has given no firm date.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9.5 — Developer-Focused AI Music Generation (Updated Aug 2026)

Mureka V9.5 (released August 31, 2026, superseding V8/V9) is the go-to for developers and technical producers: native API, up to 12-stem separation, and MIDI export alongside full song generation. V9.5 adds **MusiCoT** chain-of-thought planning and **test-time scaling**, which lets the model reassess and revise a song's arrangement as it develops (e.g. thinning out instrumentation that's crowding the vocal) rather than generating in one fixed pass — plus timeline editing and auto-generated music videos from a finished track.

- URL: mureka.ai | API: platform.mureka.ai
- Free tier: available with limitations — non-commercial only, Mureka retains output rights on free
- Paid: ~$8/month Basic (400 songs, full commercial rights, billed annually); ~$24/month Pro (1,600 songs, billed annually) — check mureka.ai/pricing for current monthly-billed rates
- Best for: API integration into apps, stem exports for remixing, developers who need programmatic music with structural control in their pipeline
- Commercial rights: full ownership on paid plans (royalty-free, use in ads/videos/streaming)

## Alibaba HappyShrimp 1.0 — Free Beta Text-to-Music (NEW Aug 2026)

Alibaba launched HappyShrimp 1.0 in beta on August 17, 2026 — a Suno/Udio-style text-to-music model that generates a complete song (melody, arrangement, lyrics, and vocals) from a single text prompt describing an emotion, story, or genre, or from user-supplied lyrics. It uses end-to-end full-track generation that plans lyrics, melody, arrangement, and vocals together, aimed at the "mechanical vocals" and "lyrics don't match the melody" problems common in AI music. Alibaba has also partnered with Taihe Music Group for artist co-creation. As a beta, pricing, commercial licensing terms, and API access are not yet finalized — verify current terms before commercial use.

- URL: happyshrimp.ai (global); happyshrimp.cn (China)
- Free tier: yes — free during the current beta
- Genres: Chinese style, pop, R&B/soul, hip hop, rock, funk, electronic, classical, jazz — both full vocal songs and instrumentals
- Best for: early testers wanting a free Suno/Udio alternative; keeping an eye on Alibaba's cross-category push into AI audio (it also fields Qwen-Audio-3.0-TTS-Plus and Fun-Realtime-TTS in text-to-speech — see audio-tts.md)
- Not ideal for: production use requiring clear commercial licensing today (terms still settling); stem export or MIDI (use Mureka V9.5)

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

> **Note:** As of September 2026, Udio's licensed platform has launched but still operates as a walled garden — audio cannot be downloaded or exported. For any use case where you need to keep or use the generated audio, use Suno v6 (paid, now on licensed WMG/BMG/Believe catalogs — but see the active Sony/UMG litigation note above), ElevenLabs Music v2 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
