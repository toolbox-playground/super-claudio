# AI Music & Background Audio Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Suno — Text-to-Music

Generate complete songs (vocals + instruments) from a text prompt.

- URL: suno.com
- **Latest models: v6 family (launched Sept 9, 2026)** — Suno's first licensed-catalog models, trained with Warner Music Group, BMG, and Believe as licensing partners. **v6** (flagship — reliable, polished, precise), **v6-wild** (same family tuned for less predictable/more varied results, Pro/Premier only), **v6-mini** (fast model, the only v6 tier available on the free plan)
- **All pre-v6 models retired (Sept 9, 2026):** v5.5 and everything before it can no longer generate new songs — this is the model retirement the Nov 2025 Warner Music Group settlement had set up. Existing songs made on old models still play, share, and can be used as a base for covers/remasters; any new iteration on them now renders with v6 instead of the original model. No data loss, but no way to generate more v5.5-style output.
- **Suno Studio (in-browser DAW):** Multi-track view, stem separation (see below), 6-band EQ, Warp Markers, Remove FX, alternates, expanded time signatures; MIDI performance improved (Sept 17, 2026 update — faster, more accurate to the original, more musical context). Available to Pro/Premier subscribers.
- **Stem Separation:** Three modes — **Advanced Split** (Premier only): choose from ~100 instruments to regenerate each stem from scratch — no separation artifacts; also exports MIDI; 10 credits/extracted track. **Split from Mix**: pull any instrument or voice out of the mix, get 2 stems; 10 credits/extraction. **Auto Split**: classic mode, splits into 12 stem categories; 50 credits.
- **Downloads (new policy effective Sept 3, 2026):** Free accounts created before Sept 3 — up to 7 lifetime trial downloads; free accounts created on/after Sept 3 — only occasional trial downloads, plus the option to purchase more. **Pro — 20 downloads/month. Premier — 60 downloads/month** (unlimited via Studio). v6-mini (free tier) output still carries no commercial rights regardless of downloads — commercial use requires Pro or Premier.
- Free tier: 50 credits/day (~10 songs, v6-mini only); non-commercial use only
- **Litigation status (as of Sept 2026):** Warner Music Group settled and became a licensing partner (Nov 2025, ~$500M deal; Suno also acquired WMG's Songkick). **GEMA (Germany) won its copyright suit against Suno on July 31, 2026** — a Munich court found Suno's training and outputs infringed GEMA-protected songs and ordered Suno to disclose revenue and pay damages. Litigation with Universal Music Group and Sony Music remains unresolved.
- Input: genre, mood, lyrics (optional), style description
- Output: full song (downloads metered per plan — see above)

Example prompt: "upbeat Brazilian funk, energetic, no lyrics, good for TikTok ads"

## Udio — High-Quality Music Generation

Similar to Suno, strong on musicality and production quality.

- URL: udio.com
- **Important (2026):** Udio temporarily disabled all downloads (audio, video, stems) across all plan tiers during a 2025–2026 licensing transition. Tracks can only be streamed/shared on-platform as of May 2026 — no DAW export, no Spotify upload, no use in video.
- **Licensing deals signed:** Udio reached agreements with Universal Music Group (Oct 2025), Warner Music, Merlin, and Kobalt (Q1 2026). The new licensed platform launched Q2 2026 but operates as a **walled garden** — tracks cannot be downloaded or exported, only streamed/shared within the Udio network. No download capability is expected for the foreseeable future.
- Good for: previewing and sharing music concepts within the platform only; not suitable if you need to use the audio outside Udio

## Mureka V9 / V9.5 (Kunlun Tech) — Developer-Focused AI Music Generation (Updated 2026)

Mureka is the go-to for developers and technical producers: native API, stem separation, and MIDI export alongside full song generation. **V9** (API model `Mureka-9`, released April 9, 2026) added MusiCoT (Music Chain-of-Thought), which plans song structure before rendering audio. **V9.5** (announced at WAIC 2026) adds O3 reflective reasoning for iterative refinement and MuCo, an agentic, version-controlled creation workflow that replaces single-shot generation.

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
- **Update (Sept 2026): Music v2.5** (Sept 11, 2026) is now the default model for prompted and reference generation in ElevenMusic — ElevenLabs calls it its "best music model yet," with the biggest quality gains on vocal-led and acoustic-heavy genres (R&B, soul, hip-hop, rock, metal, orchestral, cinematic)
- **Separately, ElevenLabs signed a multi-year licensing deal with Universal Music Group (announced Sept 10, 2026)** — its first major-label deal — to jointly build a future fan-remix platform using UMG artists' catalogs. Still in development: no launch date or commercial terms yet, and ElevenLabs says this is unrelated to the Music v2.5 model update

## MiniMax Music 2.5 / 3.0 — Structural Control, Now Open-Weight (Updated Aug 2026)

MiniMax Music 2.5 (released January 29, 2026) added paragraph-level precision control over song structure and fixed the "muddy mixing" artifact common in AI music through improved spectral separation between vocals and instrumentation. **MiniMax Music 3.0 (Aug 13, 2026)** is the successor — an ~11.1B-parameter model (text LLM initialized from Qwen3-8B + a second acoustic-detail LLM + a flow-matching decoder) that generates full 5-minute songs at 32kHz/16-bit stereo, released as **open weights** on Hugging Face (`MiniMaxAI/MiniMax-Music3`).

- URL: minimax.io/audio | Open weights: huggingface.co/MiniMaxAI/MiniMax-Music3 | API: wavespeed.ai/models/minimax/music-2.5
- ⚠️ **MiniMax's own paid Music/Lyrics Generation API stopped accepting new customers on August 20, 2026** (existing paying users are unaffected); the **free** endpoints (Music-3.0-free, Music-2.6-free, music-cover-free) were discontinued the same day. New users should go through the open-weight Music 3.0 checkpoint (self-hosted) or a third-party host like WaveSpeedAI instead of signing up on minimax.io directly
- **License:** reporting is inconsistent — MiniMax's own materials describe commercial use as permitted with attribution up to $20M in project revenue (a separate agreement is required above that); some third-party trackers instead label the base weights CC BY-NC 4.0. Verify current terms on the Hugging Face model card before any commercial deployment
- **14+ structural tags:** `[Intro]`, `[Verse]`, `[Chorus]`, `[Bridge]`, `[Interlude]`, `[Build-up]`, `[Hook]`, `[Outro]` — placed inline in the prompt to control song layout section by section
- **Audio fidelity:** Optimized soundstage keeps vocals and instruments in separate spectral regions — the key improvement over Music 2.0
- Best for: generation where song structure matters (commercial jingles, video scoring with section-to-cut sync, multi-verse songs with distinct parts); self-hosting for teams wanting to avoid per-character API billing
- Not ideal for: turnkey no-setup generation (use Suno); stem export or MIDI (use Mureka V9)

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
- Not ideal for: full songs with vocals (use Suno or MiniMax Music 2.5); stem separation (use Mureka V9 or Stable Audio 3.0)

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

> **Note:** As of September 2026, Udio's licensed platform still operates as a walled garden — audio cannot be downloaded or exported, and no restoration date has been announced. For any use case where you need to keep or use the generated audio, use Suno (Pro/Premier — download limits apply, see above), ElevenLabs Music v2.5 (free for personal; Starter plan+ for commercial), Google Flow Music / flowmusic.app (free, Google), or a royalty-free library instead.
