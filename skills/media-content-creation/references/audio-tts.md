# Text-to-Speech & Voiceover Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Azure Neural TTS — Free, High Quality, Multilingual

Microsoft Azure Neural TTS produces natural-sounding speech with no cost for moderate usage.

**Use directly from terminal (no API key needed for basic use via edge-tts):**

```bash
pip install edge-tts
```

Generate audio in Portuguese (Francisca Neural — the voice Caio uses):
```bash
edge-tts --voice pt-BR-FranciscaNeural --text "Seu texto aqui" --write-media output.mp3
```

Generate in English:
```bash
edge-tts --voice en-US-JennyNeural --text "Your text here" --write-media output.mp3
```

Generate in Spanish:
```bash
edge-tts --voice es-ES-ElviraNeural --text "Tu texto aquí" --write-media output.mp3
```

**List all available voices:**
```bash
edge-tts --list-voices
```

**Summarize an article as audio (example workflow):**
1. Fetch article text (use WebFetch tool)
2. Summarize to ~200 words using Claude
3. Generate audio: `edge-tts --voice pt-BR-FranciscaNeural --text "..." --write-media summary.mp3`
4. Play or share: `afplay summary.mp3` (macOS) or `mpg123 summary.mp3` (Linux)

## ElevenLabs v3 — Premium Quality, Voice Cloning

ElevenLabs v3 produces studio-quality speech with emotionally nuanced voices, 70+ languages (74 officially supported), and voice cloning from 1 minute of audio.

**API usage:**
```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="your-key")
audio = client.generate(
    text="Hello! This is a test.",
    voice="Rachel",
    model="eleven_v3"  # check elevenlabs.io/docs for latest model ID
)
with open("output.mp3", "wb") as f:
    f.write(audio)
```

**Free tier:** 10,000 characters/month
**Best for:** High-quality voiceovers for ads or professional content
**Voice cloning:** Paid feature; clone any voice from a sample

## ElevenLabs — Deprecated Models (July 9, 2026)

`eleven_monolingual_v1`, `eleven_multilingual_v1`, and `scribe_v1` were removed on July 9, 2026. Migrate to `eleven_multilingual_v2` or `eleven_v3` for TTS; `scribe_v2` or `scribe_v2_realtime` for STT.

## ElevenLabs v4 — Previewed at ElevenSummit Warsaw (Not Yet Released)

ElevenLabs previewed its next-generation v4 voice model at ElevenSummit in Warsaw (June 2026). As of September 2026, v4 still has **not shipped** — no model ID, API endpoint, or release date announced; industry trackers continue to list it as "expected H2 2026" with no confirmation. Preview samples demonstrated expressive delivery with emotion, intent, and accent — positioning it as "performance acting" rather than text-to-speech. Note that on the current model roster, Eleven v3 now sits well outside the Artificial Analysis Speech Arena top 5 (Elo ~1,177 — behind Cartesia Sonic 3.6, Inworld Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, Speechify SIMBA 3.2, Luna TTS, and open-weight Breeze TTS 2), which raises the stakes for v4's eventual release. Check elevenlabs.io/changelog for the GA announcement.


## ElevenLabs Flash v2 / v2.5 — Ultra-Low-Latency Voice Agents

ElevenLabs Flash is the speed-optimized sibling of Eleven v3, purpose-built for real-time conversational agents where latency matters more than expressiveness. Generates speech in ~75ms TTFA. Recommended by ElevenLabs over the older Turbo models for all low-latency use cases.

- **Model IDs:** `eleven_flash_v2` (English only) · `eleven_flash_v2_5` (32 languages)
- **Released:** December 2024
- **URL:** elevenlabs.io (same API as v3)
- **Latency:** ~75ms TTFA
- **Languages:** Flash v2 — English only; Flash v2.5 — 32 languages
- **Pricing:** same per-character pricing as the rest of the ElevenLabs API (see elevenlabs.io/pricing)
- **Best for:** Voice agents, chatbots, real-time assistants where latency trumps emotional range
- **Not ideal for:** Long-form narration or expressive delivery — use Eleven v3 for those

## Inworld Realtime TTS-2 — Closed-Loop Conversational TTS (NEW May 2026)

Inworld Realtime TTS-2 (launched May 5, 2026) is a fundamentally different architecture from TTS-1.5: it takes the actual audio of prior conversation turns as input — not just text — so it understands tone, pacing, and emotional context from everything that was said before. Ranked **#2 on the Artificial Analysis Speech Arena** (Elo 1,252, September 2026) — up from #4 (Elo ~1,203) in July, now trailing only Cartesia Sonic 3.6.

- **URL:** inworld.ai
- **Free tier:** 40 minutes/month (On-Demand plan)
- **Pricing:** $35/1M characters (On-Demand); $25/1M characters (Growth plan)
- **Latency:** <200ms median TTFA; sub-250ms P90
- **Languages:** 100+ with mid-utterance language switching (same voice identity preserved across every language)
- **Voice direction:** Inline bracket tags — `[speak sadly]`, `[excited, fast-paced]` — passed directly in the text at inference time
- **Non-verbal markers:** `[laugh]`, `[sigh]`, `[breathe]`, `[cough]` — drop anywhere for natural-sounding output
- **Conversational awareness:** Takes prior audio turns as input; automatically adapts pacing and tone to match the user's energy
- **Integrations:** Layercode, LiveKit, NLX, Pipecat, Vapi, Voximplant
- **Best for:** Real-time conversational voice agents, customer-facing bots, interactive AI experiences where dialogue context matters
- **Not ideal for:** Offline/on-device deployment or long-form static narration

## Inworld AI TTS-1.5 Max — Non-Conversational Voiceover Pick (Elo 1,238 Peak; Now Outside the Top 5)

Inworld TTS-1.5 Max held #1 on the Artificial Analysis Speech Arena in July 2026 (Elo 1,238) but has since been passed by a wave of new releases — Cartesia Sonic 3.6, Inworld's own Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, Speechify SIMBA 3.2, Luna TTS, and open-weight Breeze TTS 2 all now rank above it. It still wins blind tests for naturalness, emotional range, and conversational flow at sub-200ms streaming latency. TTS-2 (above) is the pick for real-time conversational use; TTS-1.5 Max remains a solid pick for non-conversational voiceover production, though it is no longer top-tier by Elo.

- URL: inworld.ai
- Free tier: 40 minutes/month
- Latency: <200ms streaming
- **Elo: 1,238 (peak, July 2026)** — surpassed by Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, Luna TTS, and Breeze TTS 2 by September 2026; live leaderboard rankings shift dynamically
- Best for: professional voiceovers, non-conversational narration needing strong quality and emotional range
- Pricing: $15–$25/million characters (standard)

## Fun-Realtime-TTS (Alibaba Cloud) — Multilingual Streaming TTS via DashScope

Alibaba's Fun-Realtime-TTS briefly held #1 on the Artificial Analysis Speech Arena on June 3, 2026 (Elo 1,219), surpassing Gemini 3.1 Flash TTS and Inworld Realtime TTS-2. Since then the top of the leaderboard has kept moving — Cartesia Sonic 3.6, Inworld Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, Speechify SIMBA 3.2, Luna TTS, and Breeze TTS 2 all now rank above it, pushing Fun-Realtime-TTS well outside the top 5 as of September 2026. Supports real-time streaming, voice cloning, voice design, and regional accent recognition via Alibaba Cloud's DashScope API.

- **URL:** alibabacloud.com/help/en/model-studio/realtime-tts-user-guide
- **API endpoints:** `https://dashscope-intl.aliyuncs.com/api/v1` (Singapore); `https://dashscope.aliyuncs.com/api/v1` (Beijing)
- **Free tier:** No permanent free tier; Alibaba Cloud trial credits on new accounts
- **Pricing:** $27.6/1M characters (competitive with frontier TTS models)
- **Elo:** ~1,208 on Artificial Analysis Speech Arena (July 2026 reading) — held #1 briefly in June 2026 (Elo 1,219); now outside the top 5 as Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, and Luna TTS have all overtaken it
- **Languages:** Multilingual with regional accent and dialect support
- **Voice cloning:** Yes — from a short reference audio sample via DashScope voice cloning API
- **Voice design:** Yes — create a synthetic speaker profile from scratch
- **Streaming:** Real-time — audio is delivered as it is synthesized, no wait for full output
- **Best for:** Production TTS with solid quality and streaming; developers in the Alibaba Cloud ecosystem; multilingual content with regional accent fidelity
- **Not ideal for:** Zero-cost self-hosted deployment (use Kokoro or Chatterbox); on-device mobile (use NeuTTS Air); top-5 Elo quality (use Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, or SIMBA 3.2)

## Gemini 3.1 Flash TTS — Free, 70+ Languages, Style-Controllable (Apr 2026)

Google's Gemini 3.1 Flash TTS (launched April 15, 2026) delivers natural, expressive speech with inline audio tags for style and pacing control — and is currently free in AI Studio during preview. It held #1 on the Artificial Analysis TTS Arena through May 2026 (Elo ~1,217) but has since been passed by a run of newer releases (Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, Luna TTS, Breeze TTS 2) — it remains the best free, broadly multilingual option even though it's no longer top-5 by Elo.

- **URL:** aistudio.google.com | Vertex AI | cloud.google.com/text-to-speech
- **Free tier:** Yes — free in Google AI Studio (preview; rate limited); also accessible in Google Vids
- **Paid API:** $1.00/1M input tokens (text); $20.00/1M output tokens (audio); batch API: 50% off
- **Also available:** Gemini 3.5 Flash TTS (June 2026) — same API, $6/1M output tokens (70% cheaper than 3.1; feature parity being confirmed)
- **Languages:** 70+ (broadest multilingual coverage among top-ranked models)
- **Multi-speaker:** Up to 2 speakers per generation, each with independent voice and style
- **Audio tags:** Inline delivery control — `<laugh>`, `<whisper>`, `<excited>`, pacing adjustments — via natural markup in the prompt
- **Watermarking:** SynthID — imperceptible watermark embedded in all output audio
- **Elo:** ~1,217 on Artificial Analysis TTS Arena (July 2026 reading) — held #1 through May 2026; now outside the top 5 as Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, and Luna TTS have overtaken it by September 2026
- **Best for:** Multilingual voiceovers, free developer experimentation, style-directed narration, Google Cloud / Vertex AI workflows
- **Not ideal for:** Ultra-low-latency real-time voice agents (use Cartesia Sonic 3.6); self-hosted / offline deployment; top-5 Elo quality (use Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, or SIMBA 3.2)

## Fish Audio S2 Pro — Best Multilingual + Emotion Control

Fish Audio S2 Pro ranks #1 on TTS-Arena2 with 80+ languages and 50+ inline emotion controls. Trained on 10M+ hours of audio.

- URL: fish.audio
- Free tier: 200 minutes/month
- Best for: multilingual content, emotionally nuanced narration, voice cloning
- License: research/non-commercial free; commercial use requires separate license
- Open-source model on HuggingFace: `fishaudio/s2-pro`

## Hume AI TADA — Open-Source, Long-Context, Zero Content Hallucinations

Hume TADA (Text-Acoustic Dual Alignment, March 2026) is Hume's first open-source TTS release: it aligns text tokens directly to audio tokens, achieving zero content hallucinations across 1,000+ test samples and supporting up to 700 seconds of audio (~12 min) in a single pass — 10× longer than most models. 5× faster inference than comparable LLM-based TTS (real-time factor ~0.09).

- **URL / GitHub:** github.com/HumeAI/tada
- **License:** Open-source (Apache 2.0)
- **Languages:** English
- **Duration:** up to 700 seconds in a single pass
- **Latency:** Real-time factor ~0.09
- **Free tier:** Yes (self-host)
- **Best for:** Long-form narration without content hallucinations; research; self-hosted open-source deployment
- **Not ideal for:** Multilingual content or emotionally nuanced delivery (use Chatterbox or Hume Octave 2 for those)

## Hume Octave 2 — Emotional TTS with Acting Instructions

Hume Octave 2 is the first TTS model built on a language model backbone that truly understands the emotional context of what it's saying — not just converting text to speech but interpreting tone, subtext, and dramatic intent. Its "acting instructions" feature lets you direct delivery with plain-language prompts: "whisper fearfully", "sound sarcastic", "say this with nervous energy".

- **URL:** hume.ai
- **Free tier:** 10,000 characters/month (non-commercial only)
- **Paid:** $3/mo Starter (30K chars); $14/mo Creator (140K chars, **commercial license**); half the price of Octave 1
- **Latency:** <200ms (streaming); Instant mode starts audio playback as generation begins
- **Languages:** 11 — Arabic, English, French, German, Hindi, Italian, Japanese, Korean, Portuguese, Russian, Spanish (20+ languages coming)
- **Voice design:** Prompt a custom voice from scratch ("a warm, elderly British narrator") rather than picking from a fixed library
- **Best for:** Dramatic narration, character voices, emotionally nuanced dialogue, marketing voiceovers where delivery matters
- **Not ideal for:** High-volume bulk generation (Kokoro / edge-tts are cheaper at scale); on-device deployment (use NeuTTS Air)

## Cartesia Sonic 3.6 — #1 Artificial Analysis Speech Arena (Elo 1,282, GA Aug 27, 2026)

Cartesia Sonic 3.6 shipped GA on August 27, 2026 — just three months after Sonic 3.5 — and reclaimed the top spot on **both** Artificial Analysis Speech Arena leaderboards: **#1 on Provider Voice (Elo 1,282)** and #1 on the separate Controlled Voice arena (Elo 1,123). Listeners preferred Sonic 3.6 over Sonic 3.5 in up to 93% of blind head-to-head tests across 15 locales. It's built on state-space models rather than transformers, keeping sub-90ms time-to-first-audio while now leading on quality too — no longer just the low-latency pick. Language coverage expanded to 44 languages / 61 locales, adding Odia, Urdu, and Hinglish. The upgrade applies automatically to all existing Cartesia integrations.

- URL: cartesia.ai
- Free tier available
- Latency: sub-90ms TTFA (best-in-class for streaming)
- Languages: 44 (61 locales, including Odia, Urdu, Hinglish)
- Elo: 1,282 — **#1 globally (Artificial Analysis Speech Arena, September 2026)** — also #1 on the Controlled Voice arena (Elo 1,123)
- Best for: voice agents, live chatbots, real-time assistants, and now also top-quality narration — combines #1 latency with #1 quality
- Not ideal for: zero-cost / self-hosted deployment (use Kokoro, Chatterbox, or Breeze TTS 2 for those)

## OpenAI GPT-Realtime-2 — Voice Reasoning Model, GPT-5-Class Intelligence (May 2026)

OpenAI GPT-Realtime-2 (released May 8, 2026) is a speech-to-speech model — not a dedicated TTS — built for voice agents that need to reason while they speak. It integrates GPT-5-class reasoning directly into the audio loop: handles tool calls, interruptions, and multi-turn logic entirely in voice with a 128,000-token context window (4× larger than GPT-Realtime-1.5). Related models in the same API update: `gpt-realtime-translate` (live streaming translation across 70+ input languages, $0.034/min) and `gpt-realtime-whisper` (streaming STT, $0.017/min).

- **URL:** platform.openai.com/docs/guides/realtime
- **API model:** `gpt-realtime-2`
- **Pricing:** $32/1M audio input tokens; $64/1M audio output tokens; cached input at $0.40/1M tokens
- **Context window:** 128,000 tokens
- **Latency:** real-time streaming; handles interruptions without losing context
- **Reasoning:** adjustable effort levels; runs parallel tool calls during conversation; scores 15.2% higher than GPT-Realtime-1.5 on Big Bench Audio
- **Best for:** Voice agents needing complex decision-making (booking, enterprise support, multi-tool workflows) where GPT-5-class reasoning outweighs cost concerns
- **Not ideal for:** Pure TTS use cases, budget-sensitive pipelines, or long-form content narration — the $64/1M output rate is very high vs. dedicated TTS ($10–$27/1M characters)

## OpenAI GPT-Live-1 — Full-Duplex Consumer Voice Model (July 8, 2026)

OpenAI launched GPT-Live-1 and GPT-Live-1 mini on July 8, 2026, replacing Advanced Voice Mode in ChatGPT with a true full-duplex architecture that listens and speaks simultaneously. Unlike GPT-Realtime-2 (the current developer API), GPT-Live is consumer-facing first — currently in ChatGPT, with API access coming soon (waitlist). For complex requests, GPT-Live delegates to GPT-5.5 behind the scenes and returns results in-conversation.

- **URL:** chat.openai.com; API access: platform.openai.com (sign-up waitlist — not yet GA)
- **Pricing:** Included with ChatGPT free (mini) and Plus/Pro ($20/$200/mo); API pricing TBA
- **Models:** GPT-Live-1 (paid users, highest quality); GPT-Live-1 mini (free users)
- **Architecture:** Full-duplex — speaks and listens at the same time (GPT-Realtime-2 requires push-to-talk; GPT-Live supports natural simultaneous turn-taking)
- **Naturalness:** Back-channel acknowledgments ("mhmm", "yeah"), natural interruption handling, variable pacing
- **Best for:** ChatGPT users wanting the most natural voice conversation; developers planning consumer voice apps (once API releases)
- **Not ideal for:** Production TTS pipelines today (API not yet available); developers needing a stable API now (use GPT-Realtime-2 for that)

## Smallest.ai Lightning V3.1 — Conversational TTS, Beats ElevenLabs on MOS

Smallest.ai Lightning V3.1 (launched March 27, 2026) achieves a 3.89 MOS, outperforming ElevenLabs, OpenAI TTS, and Cartesia on conversational naturalness benchmarks. Sub-100ms TTFA. Voice cloning from 3 seconds of audio.

- URL: smallest.ai
- Free tier: no (pay-as-you-go, no seat licenses, no minimums, non-expiring credits)
- Latency: <100ms TTFA
- Languages: 15 (best in English, Spanish, Hindi, Tamil)
- Voice cloning: 3–15 seconds of audio → production-ready replica
- Best for: voice agents, enterprise conversational AI (banking, BPO, telecom)
- Not ideal for: long-form narration or podcast production (use Chatterbox or VibeVoice)

## Deepgram Aura-2 — Enterprise Production TTS

Deepgram Aura-2 targets enterprises building production voice systems where uptime, transparent pricing, and consistent low latency matter more than theatrical expressiveness. Sub-200ms TTFB (90ms optimized), 40+ English voices, 10+ Spanish voices with regional accents.

- URL: deepgram.com
- Free start: $200 in free credits (no credit card required)
- Pricing: $0.030 per 1,000 characters (~$1.80/hour of audio)
- Languages: 7 (English, Spanish + others)
- Best for: enterprise voice agents, high-volume production systems, call center bots
- Not ideal for: artistic/emotional content where ElevenLabs or Fish Audio excel

## Rime TTS — 300+ Voices, Sociolinguistics-Based, Sub-100ms

Rime (rime.ai) grounds its TTS in sociolinguistics — training on how real people speak — producing subtle cadence, stress patterns, and rhythmic variation that most neural TTS models miss. Available as three model tiers plus a free plan with 200+ voices.

- **URL:** rime.ai
- **Free tier:** 10,000 characters/month; 200+ voices included
- **Models:** Mist v3 (flagship, general use), Arcana (premium expressiveness), Coda (sub-100ms latency, real-time agents)
- **Pricing:** $5/mo Starter (100K chars); $19/mo Developer (500K chars); $99/mo Pro (3M chars); $249/mo Business (10M chars + professional voice cloning)
- **Voice library:** 300+ voices (age, gender, accent diversity); 200+ available on free plan
- **Latency:** sub-200ms cloud; sub-100ms with Coda model
- **Languages:** English focus; multilingual support available
- **Best for:** Developers who need natural-sounding conversational voices without the cost of ElevenLabs; enterprise voice agents needing the Coda model's sub-100ms TTFA
- **Not ideal for:** Theatrical emotional range (use Hume Octave 2); self-hosted / open-source deployment (use Chatterbox or Kokoro)

## Qwen-Audio-3.0-TTS-Plus (Alibaba) — #3 Artificial Analysis TTS Arena (Elo 1,241, September 2026)

Alibaba's Qwen-Audio-3.0-TTS-Plus (distinct from the open-source Qwen3-TTS listed below) briefly held #1 on the Artificial Analysis Speech Arena Leaderboard in mid-July 2026 (Elo 1,236) but has since been passed by Cartesia Sonic 3.6 and Inworld Realtime TTS-2 — it now sits **#3 globally (Elo 1,241)**. Delivers increased naturalness and contextually appropriate intonation; available as a proprietary cloud-hosted model via Alibaba Cloud Model Studio (DashScope). Continues Alibaba's momentum across model categories following HappyHorse and Fun-Realtime-TTS.

- **URL:** alibabacloud.com (Model Studio / DashScope)
- **Elo:** 1,241 — **#3 globally (Artificial Analysis Speech Arena, September 2026)**; held #1 in mid-July 2026 (Elo 1,236) before Sonic 3.6 and Realtime TTS-2 overtook it
- **Free tier:** Alibaba Cloud trial credits on new accounts; no permanent free tier
- **Generation speed:** ~16 chars/sec — significantly slower than Sonic 3.6 (~120 chars/sec) and SIMBA 3.2 (~30 chars/sec); note for throughput-sensitive pipelines
- **Best for:** Applications prioritizing top-3 benchmark quality; developers already in the Alibaba Cloud / DashScope ecosystem
- **Not ideal for:** Ultra-low-latency agents (use Cartesia Sonic 3.6 at sub-90ms TTFA); high-throughput batch generation (use SIMBA 3.2 or Kokoro); offline/on-device deployment (use NeuTTS Air)

## Speechify SIMBA 3.2 — #4 Artificial Analysis TTS Arena at $10/1M Characters (September 2026)

Speechify SIMBA 3.2 (July 2026) held #1 on the Artificial Analysis TTS Arena briefly before Qwen-Audio-3.0-TTS-Plus, Cartesia Sonic 3.6, and Inworld Realtime TTS-2 all rose above it — it now sits **#4 globally (Elo 1,240)** — at $10/1M characters ($6/1M at the Scale tier), still the lowest price among the current global top-5 models. SIMBA 3.0 (May 2026) entered at #7 (Elo 1,159); 3.2 improved emotional control, locale coverage, and streaming latency, rising to #1 by mid-July 2026 before the field caught up.

- **URL:** speechify.com
- **Free tier:** No API free tier; Speechify consumer app has a limited free plan
- **Pricing:** $10/1M characters; $6/1M at Scale tier — cheapest model in the global top 5 by Elo
- **Latency:** <250ms TTFA (streaming-native)
- **Features:** Fine-grained emotional control at the prosody level (rhythmic and tonal patterns), SSML prosody support, zero-shot voice cloning from short reference clips, 30+ locales, mixed-language input handled automatically
- **English only:** SIMBA 3.2 currently supports English voices only — non-English requests error; multilingual support is planned but not yet shipped
- **Best for:** Cost-sensitive high-volume production TTS needing top-5 quality; enterprises benchmarking ElevenLabs alternatives at a fraction of the price
- **Not ideal for:** Ultra-low-latency (<100ms) conversational agents (use Cartesia Sonic 3.6); non-English content (use Qwen-Audio-3.0-TTS-Plus or Gemini 3.1 Flash TTS)

## Luna TTS (VUI Labs) — #5 Artificial Analysis TTS Arena, Diffusion-LM Architecture (NEW Aug 2026)

Luna-TTS, from VUI Labs Research (technical report published August 12, 2026), is a fully non-autoregressive, diffusion-language-model TTS family — it generates the entire audio token grid for an utterance in a fixed number of parallel refinement steps rather than token-by-token, with zero-shot voice cloning and speech editing arising natively as infilling. Debuted straight into the **Artificial Analysis Speech Arena top 5 at #5 (Elo 1,228)**, ahead of Inworld TTS-1.5 Max, Gemini 3.1 Flash TTS, and Fun-Realtime-TTS.

- **URL / paper:** arxiv.org/abs/2608.11593 (Luna-TTS Family Technical Report)
- **Elo:** 1,228 — **#5 globally (Artificial Analysis Speech Arena, September 2026)**
- **Architecture:** Diffusion-LM, non-autoregressive, 0.6B backbone shared across two model variants, single tokenizer and data pipeline
- **Training data:** 1M+ hours of speech across Chinese, English, Japanese, and Korean
- **Voice cloning:** Zero-shot, arising natively from the infilling generation process (no separate cloning pipeline)
- **Best for:** Teams wanting frontier-tier quality from a fast-moving new entrant; CJK + English production content
- **Not ideal for:** Production deployments needing a mature commercial SLA/support relationship yet (very new, provider ecosystem still forming); check current API/access details directly as this is a fresh release

## StepAudio 2.5 TTS (StepFun) — Contextual Performance TTS (May 2026)

StepAudio 2.5 TTS from StepFun (Shanghai) ranked #3 on the Artificial Analysis Speech Arena at launch (Elo ~1,187, May 2026); by September 2026 it sits further down the board as Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, Luna TTS, and Breeze TTS 2 have all risen above it. The key differentiator: it is the first TTS model to integrate full contextual understanding into the generation pipeline, so it doesn't just read text, it *performs* it.

- **URL:** platform.stepfun.ai | **API:** `https://api.stepfun.ai/v1/audio/speech`
- **Model ID:** `step-audio-2.5-tts`
- **Pricing:** Pay-as-you-go API (see platform.stepfun.ai for current rates)
- **Elo:** ~1,187 on Artificial Analysis Speech Arena (May 2026 reading) — #3 globally at launch, now well outside the top 5 as newer models rose above it; still above ElevenLabs Eleven v3 (~1,177)
- **Max input:** 1,000 characters per request
- **Voice control:** Plain natural language — describe delivery in prose: "speak slowly with a warm, reassuring tone" — no tags or preset combos required
- **Context levels:** Global Context (sets the baseline persona/style for the full clip) + Inline Context (overrides delivery moment-to-moment mid-text)
- **Voice cloning:** Zero-shot from a short reference recording — full timbre and emotion control preserved
- **Realtime variant:** StepAudio 2.5 Realtime (May 24, 2026) — end-to-end voice model with roleplay-specific RLHF and paralinguistic comprehension (understanding sighs, hesitations, emphasis); separate endpoint
- **Best for:** Production TTS needing dramatic delivery control without SSML tags; voice agents with nuanced emotional requirements; multilingual content (Chinese + English strong)
- **Not ideal for:** Ultra-low-latency real-time agents (<100ms); long-form narration over 1K chars without chunking

## MiniMax Speech 2.8 HD — Broadcast Quality, 40+ Languages, 7 Emotions (NEW 2026)

MiniMax Speech 2.8 HD is MiniMax's current flagship TTS, replacing Speech 2.6. Broadcast-grade audio quality with 40+ languages, 17+ expressive voice presets, and an expanded emotion set with natural interjection tags.

- **URL:** minimax.io/audio | **API:** replicate.com/minimax/speech-2.8-hd, wavespeed.ai
- **Free tier:** No direct free tier; available via Replicate and WaveSpeedAI (pay-as-you-go)
- **Latency:** <250ms
- **Languages:** 40+ (expanded from ~32 in Speech 2.6)
- **Voices:** 17+ expressive presets spanning gender, age, and speaking style
- **Emotions:** 7 modes (calm, fluent, surprised + 4 more); "auto" matches tone to script context
- **Interjection tags:** `[laugh]`, `[sigh]`, `[gasp]` — natural non-verbals dropped anywhere in text
- **Voice cloning:** Yes — improved tonal nuance and timbre similarity vs. Speech 2.6
- **Architecture:** Autoregressive Transformer + Flow-VAE decoder; models speech in learned latent space for natural cadence and emotional depth
- **Variants:** HD (broadcast-grade fidelity) vs Turbo (2–3× faster, lower cost, same features)
- **Best for:** Multilingual narration, marketing voiceovers, audiobooks needing emotional range and reliable voice cloning
- **Not ideal for:** Ultra-low-latency agents (<100ms) — use Cartesia Sonic 3.6 for those

## Breeze TTS 2 (BreezeBlue) — #1 Open-Weight Model on Artificial Analysis Speech Arena (NEW Aug 2026)

Breeze TTS 2, released August 25, 2026, is the first open-weight model to beat ElevenLabs' flagship on the Artificial Analysis Speech Arena — and it does more than that: at Elo 1,215 it ranks **#1 among all open-weight TTS models** (#6 overall), beating the next-best open-weight model, Fish Audio S2 Pro, by 90 Elo points, and outranking ElevenLabs Eleven v3 (Elo ~1,177) outright. Built for real-time interactive use — video games, digital companions, narrative storytelling — with sub-40ms time-to-first-audio and three ways to control a voice: cloning, natural-language voice design, and directed delivery.

- **URL / HuggingFace:** huggingface.co/BreezeBlue/Breeze-TTS-2
- **License:** Open-weight (check the HuggingFace model card for exact license terms before commercial use)
- **Elo:** 1,215 — **#1 among open-weight models, #6 overall (Artificial Analysis Speech Arena, September 2026)** — 90 points above Fish Audio S2 Pro, the next-best open-weight model
- **Languages:** 50
- **Latency:** sub-40ms TTFA, streaming output
- **Voice control:** Three modes — zero-shot cloning, natural-language voice design ("a warm, elderly British narrator"), and directed delivery (acting-style instructions)
- **Best for:** Self-hosted deployment needing genuinely top-tier quality (not just "good for open-source") — games, companions, interactive narrative, real-time agents; teams that want ElevenLabs-beating quality without per-character API costs
- **Not ideal for:** Zero-setup cloud API convenience (it's a self-hosted weight, not a hosted API like Sonic 3.6 or SIMBA 3.2); teams needing a long commercial track record (very new release)

## Chatterbox — Free & Open-Source, No Usage Caps

Chatterbox by Resemble AI is MIT-licensed and outperformed ElevenLabs in blind listener tests (65.3% preference for Turbo; 63.8% for standard). Zero-shot voice cloning with a few seconds of reference audio.

```bash
pip install chatterbox-tts
```

```python
import torchaudio
from chatterbox.tts import ChatterboxTTS

model = ChatterboxTTS.from_pretrained(device="cuda")
wav = model.generate("Hello, this is a test of Chatterbox TTS.")
torchaudio.save("output.wav", wav, model.sr)
```

**Models:**
- `chatterbox-tts` — English, emotion control, voice cloning
- `chatterbox-tts[multilingual]` — 23+ languages
- `chatterbox-turbo` — 350M params; up to 6× faster than real-time on GPU; sub-200ms latency; paralinguistic prompting tags (`[laugh]`, `[cough]`, `[chuckle]`) for natural-sounding output; MIT license

**Homepage:** resemble.ai/chatterbox | **PyPI:** `pip install chatterbox-tts`

## Mistral Voxtral TTS — Open-Weight, Low-Latency, 9 Languages

Mistral released Voxtral TTS on March 26, 2026: a 4B-parameter open-weight model rivaling ElevenLabs at a lower cost. Hybrid architecture (3.4B autoregressive decoder + 390M acoustic flow-matching + 300M neural codec).

- **URL:** mistral.ai | **HuggingFace:** `mistralai/Voxtral-TTS`
- **Open-weight:** Yes (weights on HuggingFace)
- **API pricing:** $0.016 per 1,000 characters (Mistral Studio)
- **Latency:** ~90ms TTFA (70ms pure model)
- **Languages:** 9 — English, French, German, Spanish, Dutch, Portuguese, Italian, Hindi, Arabic
- **Voice cloning:** 3-second reference audio
- **Best for:** Multilingual production TTS at low cost; EU-language coverage; self-hosted open-weight deployment

## Qwen3-TTS — Open-Source, 10 Languages, 97ms Latency, Apache 2.0

Qwen3-TTS (Alibaba Qwen team, January 22, 2026) is an open-source TTS model family supporting 10 languages with 97ms first-packet streaming latency, voice cloning from 3 seconds of audio, and free-form voice design via natural language description.

```bash
pip install git+https://github.com/QwenLM/Qwen3-TTS
```

- **URL / GitHub:** github.com/QwenLM/Qwen3-TTS | **HuggingFace:** `Qwen/Qwen3-TTS-1.7B`
- **License:** Apache 2.0 (commercial use permitted)
- **Variants:** 1.7B and 0.6B — each available as CustomVoice (voice cloning) and VoiceDesign (natural-language voice creation) flavors; Base models for fine-tuning
- **Languages:** 10 — Chinese, English, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian
- **Training data:** 5M+ hours of speech across 10 languages
- **Latency:** 97ms end-to-end first-packet latency (streaming; dual-track hybrid architecture without heavy diffusion transformers)
- **Voice cloning:** 3-second reference audio → production-ready replica
- **Voice design:** Free-form natural language prompting ("a warm, elderly British narrator") — no preset library required
- **Best for:** Open-source multilingual TTS needing commercial use at zero API cost; CJK + EU-language coverage; self-hosted or on-device deployment
- **Not ideal for:** Ultra-low-latency real-time agents where Cartesia Sonic 3.6's sub-90ms TTFA is needed; theatrical emotional delivery (use Hume Octave 2)

## Zyphra ZONOS2 — Open-Source MoE TTS, 43 Languages, Zero-Shot Voice Cloning (June 2026)

Zyphra ZONOS2 (released June 12, 2026) is the first open-source Mixture-of-Experts TTS model — 8B total parameters (900M active per inference pass) trained on 6M+ hours of speech across 43 languages. CD-quality 44.1kHz audio, zero-shot voice cloning from 10–30 seconds of reference audio, and Apache 2.0 license for free commercial use.

- **URL / GitHub:** github.com/Zyphra/ZONOS2 | **HuggingFace:** `Zyphra/ZONOS2`
- **License:** Apache 2.0 (commercial use permitted)
- **Architecture:** MoE++ — 8B total params, 900M active during inference
- **Training data:** 6M+ hours of speech across 43 languages (expanded from 200K hours in ZONOS-v0.1)
- **Languages:** 43 — Japanese, English, Chinese at Tier 1 (highest quality); broad multilingual coverage
- **Voice cloning:** Zero-shot from 10–30 second reference audio; preserves timbre, cadence, and accent
- **Audio quality:** CD-quality 44.1kHz output
- **Emotion control:** Yes — inline expressive controls
- **Code-switching:** Yes — switch languages mid-sentence while preserving voice identity
- **Streaming:** Real-time
- **Cloud:** Zyphra Cloud (AMD-hosted; free trial available); weights on HuggingFace
- **Best for:** Open-source multilingual TTS with commercial use at zero API cost; Japanese, English, and Chinese production content requiring high-fidelity voice cloning; projects needing CD-quality output without usage caps
- **Not ideal for:** Ultra-low-latency real-time agents where Cartesia Sonic 3.6's sub-90ms TTFA is needed; English-only lightweight deployment (use Kokoro or NeuTTS Air for those)

## Sesame CSM-1B — Conversational Naturalness, Apache 2.0

Sesame CSM-1B (Conversational Speech Model) stands out for human-like conversational realism: natural pauses, "umms", breath sounds, and subtle intonation shifts that traditional TTS models miss. Trained on 1M+ hours of English audio; uses a Llama-3.2 backbone + 300M audio decoder.

```bash
pip install git+https://github.com/SesameAILabs/csm
```

- **URL / GitHub:** github.com/SesameAILabs/csm | **HuggingFace:** `sesame/csm-1b`
- **License:** Apache 2.0 (commercial use permitted; impersonation / deceptive content prohibited)
- **Parameters:** 1B backbone + 300M audio decoder
- **Languages:** English primarily (limited other languages via training contamination — not reliable)
- **Context:** up to 2,048 tokens (~2 minutes of audio) in one pass
- **Requirements:** CUDA-compatible GPU, Python 3.10+, ffmpeg
- **Best for:** Conversational AI demos, voice agents needing human-like naturalness, podcast-style dialogue
- **Not ideal for:** Multilingual content or long-form narration (use VibeVoice or Chatterbox for those)

## VibeVoice (Microsoft) — Long-Form Multi-Speaker TTS, MIT License

Microsoft VibeVoice is an open-source family accepted as an Oral at ICLR 2026 — includes TTS (1.5B), a streaming Realtime variant (0.5B), and a long-form ASR model (7B). The TTS model synthesizes up to 90 minutes with up to 4 distinct speakers in one pass — unique among open-source models.

> **Note:** Microsoft explicitly recommends against production/commercial deployment without further testing. Currently best suited for research and development.

- **URL / GitHub:** github.com/microsoft/VibeVoice | **HuggingFace:** `microsoft/VibeVoice-1.5B`
- **License:** MIT (research/development use recommended; commercial deployment not advised by Microsoft yet)
- **Models:** VibeVoice-TTS-1.5B (long-form), VibeVoice-Realtime-0.5B (streaming), VibeVoice-ASR-7B (recognition)
- **Speakers:** up to 4 simultaneous in one generation
- **Duration:** up to 90 minutes in a single pass
- **ASR:** 50+ languages, speaker diarization, timestamps
- **Best for:** Audiobooks, long-form narration, multi-speaker podcast generation, research
- **Not ideal for:** Production voice agents or commercial apps (use Cartesia/ElevenLabs for those)

## Kokoro TTS — Ultra-Lightweight, #1 HuggingFace TTS Arena

Kokoro (82M parameters, Apache 2.0) ranked #1 on the HuggingFace TTS Spaces Arena for single-speaker speech quality, outperforming models 5–15× its size. Runs 96× faster than real-time on a basic cloud GPU. Includes a self-hosted OpenAI-compatible API — a drop-in replacement for OpenAI's TTS endpoint.

```bash
pip install kokoro
```

- **URL:** kokorottsai.com | **HuggingFace:** `hexgrad/Kokoro-82M`
- **License:** Apache 2.0 (commercial use free)
- **Languages:** 8 (American & British English, French, Korean, Japanese, Mandarin, + more); 48 voices
- **Voice cloning:** No (fixed voice library)
- **Latency:** 96× real-time on GPU; runs on CPU
- **Self-hosted API:** OpenAI-compatible TTS endpoint (drop-in replacement)
- **Best for:** Ultra-fast batch generation, lightweight local/edge deployment, replacing OpenAI TTS without changing client code

## NeuTTS Air (Neuphonic) — On-Device, CPU-Capable, Apache 2.0

NeuTTS Air (~360M active params) runs fully on-device with no cloud dependency — including on mid-range mobile CPUs — with instant voice cloning from 3 seconds of audio.

```bash
pip install neutts
```

- **URL:** neutts.com | **HuggingFace:** `neuphonic/neutts-air`
- **License:** Apache 2.0 (full commercial use)
- **Languages:** English
- **Voice cloning:** Instant (3-second mono WAV reference)
- **Performance:** 20 tok/s on mobile CPU; 119 tok/s on Ryzen 9 laptop; 16,000+ tok/s on RTX 4090
- **Watermarking:** Perth watermark embedded in all output audio
- **Best for:** Privacy-first / offline deployment, edge devices, zero API cost in production

## xAI Grok TTS — 5 Voices, 20+ Languages (April 2026)

xAI launched its Grok Text-to-Speech API in April 2026, built on the same voice stack powering Grok Voice, Tesla vehicles, and Starlink customer support. Sat ~#6 on the Artificial Analysis TTS Arena as of July 2026 (Elo ~1,194); by September 2026 the top of the board has moved further away (Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, Luna TTS, Breeze TTS 2), so Grok TTS now ranks lower by Elo even though its feature set is unchanged.

- **URL:** x.ai/api
- **Pricing:** $4.20/1M characters
- **Voices:** Eve, Ara, Leo, Rex, Sal (5 voices with distinct personalities); voice cloning available from a short reference recording
- **Languages:** 20+ with automatic BCP-47 language detection (or specify explicitly)
- **Latency:** <1s average TTFA; streaming supported
- **Output formats:** MP3, WAV, PCM (Linear16), G.711 μ-law, G.711 A-law
- **Expressive tags:** Inline: `[laugh]`, `[sigh]`, `[breath]`; wrapping: `<whisper>text</whisper>`, `<emphasis>text</emphasis>`
- **Best for:** Developers already in the xAI/Grok ecosystem; multilingual voice agents; production pipelines needing format flexibility
- **Not ideal for:** Budget-sensitive high-volume use (use Speechmatics $0.011/1K chars or Kokoro at no cost); theatrical emotional range (use Hume Octave 2); top-5 quality ranking (Cartesia Sonic 3.6, Realtime TTS-2, Qwen-Audio-3.0-TTS-Plus, SIMBA 3.2, and Luna TTS all rank above it)

## Speechmatics TTS — Ultra-Cheap Enterprise TTS, 11–27× Below ElevenLabs

Speechmatics launched its own neural TTS in 2026 alongside its industry-leading STT (55+ languages). At $0.011 per 1,000 characters it is 11–27× cheaper than ElevenLabs while delivering comparable neural quality and sub-150ms streaming latency.

- **URL:** speechmatics.com/text-to-speech
- **Free start:** free tier available
- **Pricing:** $0.011/1,000 characters
- **Languages:** English (US + UK); additional languages in development through 2026
- **Latency:** ~80–100ms TTFA (streaming)
- **Best for:** High-volume English voice agents and production pipelines where cost matters most; single-vendor STT+TTS integration
- **Not ideal for:** Multilingual content or theatrical emotional range (use Fish Audio or ElevenLabs for those)

## Choosing Between Tools

| Need | Tool |
|------|------|
| Quick article summary, personal use | edge-tts (Azure, free) |
| Professional ad voiceover | ElevenLabs v3 or Inworld TTS-1.5 |
| Low-latency voice agent (ElevenLabs ecosystem) | ElevenLabs Flash v2.5 (~75ms, 32 languages) or Flash v2 (English only, ~75ms) |
| Emotional / dramatic narration, acting instructions | Hume Octave 2 (hume.ai, <200ms, 11 languages) |
| Portuguese/Spanish natural voice | edge-tts Francisca / ElevenLabs multilingual |
| 80+ languages, emotion control | Fish Audio S2 Pro |
| Best blind-test naturalness (cloud) | Cartesia Sonic 3.6 (Elo 1,282, **#1** Sept 2026), Inworld Realtime TTS-2 (Elo 1,252, **#2**), Qwen-Audio-3.0-TTS-Plus (Elo 1,241, **#3**), Speechify SIMBA 3.2 (Elo 1,240, **#4**), Luna TTS (Elo 1,228, **#5**) |
| Voice cloning, no cost, offline | Chatterbox (open-source) or Breeze TTS 2 (open-weight, #1 open-weight model by Elo) |
| Long-form narration (up to 12 min), zero hallucinations, self-hosted | Hume AI TADA (Apache 2.0, open-source) |
| Voice cloning, cloud, easiest | ElevenLabs (paid) |
| Bulk generation (many files) | edge-tts or Chatterbox (no credit limits) |
| Real-time voice agent / chatbot | Cartesia Sonic 3.6 (sub-90ms TTFA, now also #1 on quality), Smallest.ai Lightning V3.1 (<100ms), or Inworld Realtime TTS-2 (<200ms, closed-loop, 100+ langs, now #2 globally) |
| Voice agent needing GPT-5-class reasoning in audio (complex tool calls, multi-turn logic) | OpenAI GPT-Realtime-2 ($32/1M in + $64/1M out; 128K context, parallel tool calls, interruption handling — expensive; not a substitute for pure TTS) |
| Enterprise production (uptime + pricing transparency) | Deepgram Aura-2 ($200 free credits to start) |
| Natural-sounding conversational voices, 300+ voice options, free start | Rime TTS (rime.ai, 10K chars/month free, Coda model for sub-100ms) |
| Ultra-cheap high-volume English TTS, single-vendor STT+TTS | Speechmatics TTS ($0.011/1K chars, ~80ms TTFA) |
| Open-weight multilingual cloud TTS, low cost | Mistral Voxtral TTS ($0.016/1K chars) |
| Open-source multilingual TTS, 10 languages, self-hosted or commercial | Qwen3-TTS (Apache 2.0, 97ms TTFA, voice cloning + free-form voice design, github.com/QwenLM/Qwen3-TTS) |
| Open-source multilingual TTS, 43 languages, CD-quality, voice cloning | Zyphra ZONOS2 (Apache 2.0, first open-source MoE TTS, 8B/900M active, Zyphra Cloud free trial, github.com/Zyphra/ZONOS2) |
| Best-quality open-weight TTS (beats ElevenLabs, self-hosted) | Breeze TTS 2 (BreezeBlue, Elo 1,215, **#1 open-weight / #6 overall**, 50 languages, sub-40ms TTFA, huggingface.co/BreezeBlue/Breeze-TTS-2) |
| On-device, zero API cost, privacy-first | NeuTTS Air (Apache 2.0, CPU-capable) |
| Ultra-fast batch TTS, drop-in OpenAI TTS replacement | Kokoro TTS (Apache 2.0, 82M params, 96× real-time, fixed voices) |
| Human-like conversational naturalness (pauses, ums, breaths) | Sesame CSM-1B (Apache 2.0, English only, CUDA required) |
| Long-form multi-speaker narration (audiobooks, podcasts) | VibeVoice-TTS-1.5B (MIT, up to 90 min / 4 speakers, research use) |
| Multilingual style-controllable TTS, free for developers | Gemini 3.1 Flash TTS (70+ languages, audio tags, free in AI Studio); Gemini 3.5 Flash TTS ($6/1M output — cheapest option) |
| Top quality at minimum cost | Speechify SIMBA 3.2 (**#4 globally** Sept 2026, Elo 1,240, $10/1M chars; $6/1M at Scale tier) — best price/quality among top-5, English only; Cartesia Sonic 3.6 is now #1 overall (also strong value, free tier available) |
| Conversational AI with tone/context awareness across turns | Inworld Realtime TTS-2 (closed-loop, adapts to prior audio, 100+ langs, now **#2 globally** Elo 1,252) |
| New frontier entrant worth watching | Luna TTS (VUI Labs, Elo 1,228, **#5 globally**, diffusion-LM non-autoregressive architecture, CJK+English, arxiv.org/abs/2608.11593) |
| Grok/xAI ecosystem, 20+ languages, format flexibility | xAI Grok TTS ($4.20/1M chars, Elo ~1,194 as of July 2026 — now well outside top 5, voice cloning) |
| Contextual performance TTS, dramatic delivery without tags | StepAudio 2.5 TTS (platform.stepfun.ai, Elo ~1,187 as of May 2026 — now well outside top 5, plain-language voice direction) |
| Multilingual broadcast-quality narration, 40+ languages, emotion+interjections | MiniMax Speech 2.8 HD (minimax.io/audio, Replicate, WaveSpeedAI; HD for quality, Turbo for speed) |
| Highest-ranked cloud TTS by Elo, real-time streaming | Cartesia Sonic 3.6 (Elo 1,282, **#1**, sub-90ms TTFA, GA Aug 27 2026); Inworld Realtime TTS-2 (Elo 1,252, **#2**, closed-loop); Qwen-Audio-3.0-TTS-Plus (Alibaba DashScope, Elo 1,241, **#3**); Speechify SIMBA 3.2 ($10/1M chars, Elo 1,240, **#4**) |
