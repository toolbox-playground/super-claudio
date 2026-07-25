# Free Public API Catalog

A curated list of notable free APIs by domain. All require no payment for basic usage.

## Weather & Environment

| API | What | URL | Auth |
|-----|------|-----|------|
| OpenWeather | Current weather, 5-day forecast, air pollution; 1,000 calls/day free | openweathermap.org | Free key |
| Open-Meteo | Hourly/daily weather forecasts, historical data, **Air Quality API** (PM2.5, PM10, ozone, NO2, UV index, pollen, dust — same no-key, no-rate-limit model), no limits on free tier | open-meteo.com | None |
| **Weather.gov (NWS)** | US National Weather Service data — current conditions, forecasts, hourly data, alerts; GeoJSON API; ~5,000 req/hour free; no key required | api.weather.gov | None |

## Space & Astronomy

| API | What | URL | Auth |
|-----|------|-----|------|
| NASA APIs | APOD, Mars rover photos, NEO asteroids | api.nasa.gov | Free key |
| Open Notify | ISS current location | open-notify.org | None |
| SpaceX API | Launch data, rockets, missions | github.com/r-spacex/SpaceX-API | None |

## Finance & Economics

| API | What | URL | Auth |
|-----|------|-----|------|
| Open Exchange Rates | Currency exchange rates | openexchangerates.org | Free key |
| CoinGecko | Crypto prices and data | coingecko.com/api | None (rate limited) |
| Alpha Vantage | Stock market data | alphavantage.co | Free key |
| DexScreener | Real-time and historical DEX trading pair data across Solana, ETH, BSC, and 50+ chains; WebSocket push; no key required; covers on-chain prices, volume, and liquidity that CoinGecko doesn't | docs.dexscreener.com/api/reference | None |
| **Frankfurter** | Exchange rates sourced from 84 central banks; 201 currencies; historical data back to 1948; JSON + CSV responses; no auth, no monthly/daily caps; self-hostable (Docker) | frankfurter.dev | None |
| **fawazahmed0/exchange-api** | Free community-maintained currency exchange rates; 200+ currencies; no rate limits; CDN-hosted on Cloudflare Pages and jsDelivr; updated daily | github.com/fawazahmed0/exchange-api | None |

## News & Media

| API | What | URL | Auth |
|-----|------|-----|------|
| NewsAPI | Headlines from 150k sources | newsapi.org | Free key |
| The Guardian | Full article access | open-platform.theguardian.com | Free key |
| HackerNews | Tech news, rankings | hacker-news.firebaseio.com | None |

## Geography & Maps

| API | What | URL | Auth |
|-----|------|-----|------|
| OpenStreetMap / Nominatim | Geocoding, reverse geocoding | nominatim.org | None |
| Mapbox | Maps, geocoding, directions, static images; 50,000 map loads/month free; JS SDK; DevKit MCP Server available | mapbox.com | Free key |
| ip-api.com | IP to location | ip-api.com | None (rate limited) |
| **IPinfo Lite** | IP to country + ASN lookup for IPv4 and IPv6; unlimited requests, no rate limits on free tier; data updated daily; CC BY-SA 4.0 license; requires free account token | ipinfo.io/lite | Free token |
| REST Countries | Country data | restcountries.com | None |

## Transportation & Aviation

| API | What | URL | Auth |
|-----|------|-----|------|
| OpenSky Network | Real-time ADS-B aircraft positions, callsigns, altitude, velocity, heading — community sensor network; REST API + WebSocket; free for research/personal use; historical data for registered users; uneven coverage outside Europe/North America; non-commercial license; **basic auth removed Mar 18, 2026** — now requires OAuth2 client credentials (create a client on your account page for a client_id/client_secret, exchange for a ~30-min bearer token) | opensky-network.org | Free OAuth2 client (required — basic auth no longer supported) |

## Books & Literature

| API | What | URL | Auth |
|-----|------|-----|------|
| Open Library | Books, authors, covers — millions of titles from the Internet Archive | openlibrary.org/api | None |

## Food & Nutrition

| API | What | URL | Auth |
|-----|------|-----|------|
| Open Food Facts | Barcode lookup for 3M+ food products worldwide — returns ingredients, nutrition facts, Nutri-Score, and NOVA group; covers EAN/UPC barcodes; full-text and faceted search; no rate limits; data under Open Database License | world.openfoodfacts.org / API: world.openfoodfacts.net/api/v2/product/{barcode} | None |

## Images & Media

| API | What | URL | Auth |
|-----|------|-----|------|
| Unsplash | Millions of free high-quality stock photos | api.unsplash.com | Free key |
| Picsum Photos | Random placeholder images by size | picsum.photos | None |

## Domains

| API | What | URL | Auth |
|-----|------|-----|------|
| **GoDaddy Developer Platform** | Domain search, availability checking, pricing, purchase, DNS configuration, and domain management APIs; OAuth-based authentication; agent-safe execution controls; CLI included; LLM-optimized docs; launched July 15, 2026 | developer.godaddy.com | Free account (OAuth) |

## Communication & Social

| API | What | URL | Auth |
|-----|------|-----|------|
| Discord API | Build bots, manage servers, send/read messages, listen to real-time events via WebSocket gateway; no limits on bot creation; well-documented | discord.com/developers | Bot token (free) |
| **Bluesky API (AT Protocol)** | Read/write posts, timelines, user data, follows; permissive free rate limits; growing developer community after X went paid | atproto.com | Free account |
| **Threads API (Meta)** | Post, read replies, manage media; free developer access; rate limits generous for indie devs | developers.facebook.com/docs/threads | Free account |
| **X (Twitter) API** | **⚠️ No longer free (Feb 6, 2026)** — reading a tweet costs $0.005, posting $0.015; full-archive search from $42K/month enterprise. Use Bluesky/Threads instead for social data at no cost. | developer.x.com | Paid only |

## Developer Utilities

| API | What | URL | Auth |
|-----|------|-----|------|
| JSONPlaceholder | Mock REST API for testing | jsonplaceholder.typicode.com | None |
| RandomUser | Random user data | randomuser.me | None |
| DummyJSON | Mock data (products, users) | dummyjson.com | None |
| Open Trivia DB | Trivia questions (50+ categories) | opentdb.com/api_config.php | None |
| Mockerito | 200+ realistic mock REST endpoints across 9 domains (E-Commerce, Finance, Healthcare, Aviation, Meteorology, etc.); full CRUD + filtering/pagination; more varied than JSONPlaceholder | mockerito.com | None |

## AI / Machine Learning

| API | What | URL | Auth |
|-----|------|-----|------|
| Google Gemini API | LLM inference (Gemini 3.5 Flash free in AI Studio — new default since May 19, 2026; daily Gemini 3.1 Pro allotment for harder reasoning), 1M token context, multimodal | ai.google.dev | Free key (generous limits) |
| Groq | Ultra-fast LLM inference (LPU hardware); Llama 4 Scout, Llama 4 Maverick, Kimi K2 (1T MoE), Qwen3 235B, Gemma, Mistral, DeepSeek R1 and more; no credit card required | groq.com | Free key |
| OpenRouter | Access to 100+ free AI models via one API; notable free models (July 2026): **NVIDIA Nemotron 3 Ultra** (550B MoE, 1M context, `nvidia/nemotron-3-ultra-550b-a55b:free`) and **OpenAI GPT-OSS** (20B Apache 2.0 open-weight, `openai/gpt-oss-20b:free`); 25+ free models total; 50 req/day free, 1,000/day after $10 purchase | openrouter.ai | Free key |
| GitHub Models | 40+ AI models (GPT-4o, Llama, DeepSeek-R1, Mistral, Phi, xAI, Cohere) via OpenAI-compatible API; uses your GitHub account — no separate key or signup; free tier rate-limited (e.g. GPT-4o: 10 RPM / 50 RPD); opt-in paid tier for higher limits | github.com/features/models | GitHub account (free) |
| Cerebras Inference | Ultra-fast LLM inference on wafer-scale silicon (2,600+ tok/s); Llama 3.3 70B, Qwen3 32B/235B, and more; 1M tokens/day free, no credit card required; 30 RPM on free tier | inference.cerebras.ai | Free key |
| Cloudflare Workers AI | Edge AI inference at 300+ global locations; Llama 3.1 8B, Mistral 7B, Phi-2, Gemma, SDXL (image gen), Whisper (ASR), and 40+ models; 10,000 neurons/day free (no credit card required); unique low-latency for globally distributed apps | developers.cloudflare.com/workers-ai | CF account (free) |

## Security

| API | What | URL | Auth |
|-----|------|-----|------|
| Have I Been Pwned — Pwned Passwords | Check any password against 800M+ entries from real data breaches using k-anonymity (submit only the first 5 chars of its SHA-1 hash — the server never sees the full hash); no rate limit, no auth; returns matching hash suffixes with breach occurrence counts | haveibeenpwned.com/API/v3 | None |

## Resources for Finding More

- **Public APIs list:** github.com/public-apis/public-apis — 1000+ APIs organized by category
- **Public API Lists:** github.com/public-api-lists/public-api-lists — 730+ APIs across 48 categories with a free JSON query API
- **PublicAPIs.dev:** publicapis.dev — collaborative directory of 1400+ public APIs, searchable by category
- **Free Public APIs:** freepublicapis.com — community catalog tested daily (shows live status)
- **Free Public APIs API:** freepublicapis.com/api — freepublicapis.com's own meta-API; query their entire catalog programmatically; no auth, 1000 req/day free; returns live status, category, and auth type for every listed API
- **PublicAPIs.io:** publicapis.io — 1000+ free public APIs organized by category; no signup required to browse
- **APIList.fun:** apilist.fun — 900+ free APIs across social, weather, movies, games, science, and more; built by apilayer
- **RapidAPI free tier:** rapidapi.com — many APIs have free tiers
