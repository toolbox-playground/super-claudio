# Free Public API Catalog

A curated list of notable free APIs by domain. All require no payment for basic usage.

## Weather & Environment

| API | What | URL | Auth |
|-----|------|-----|------|
| OpenWeather | Current weather, 5-day forecast, air pollution; 1,000 calls/day free | openweathermap.org | Free key |
| Open-Meteo | Hourly/daily weather forecasts, historical data, no rate limits on free tier | open-meteo.com | None |

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
| ip-api.com | IP to location | ip-api.com | None (rate limited) |
| REST Countries | Country data | restcountries.com | None |

## Books & Literature

| API | What | URL | Auth |
|-----|------|-----|------|
| Open Library | Books, authors, covers — millions of titles from the Internet Archive | openlibrary.org/api | None |

## Images & Media

| API | What | URL | Auth |
|-----|------|-----|------|
| Unsplash | Millions of free high-quality stock photos | api.unsplash.com | Free key |
| Picsum Photos | Random placeholder images by size | picsum.photos | None |

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
| OpenRouter | Access to 100+ free AI models (Claude, GPT, Llama, Gemini) via one API | openrouter.ai | Free key |
| GitHub Models | 40+ AI models (GPT-4o, Llama, DeepSeek-R1, Mistral, Phi, xAI, Cohere) via OpenAI-compatible API; uses your GitHub account — no separate key or signup; free tier rate-limited (e.g. GPT-4o: 10 RPM / 50 RPD); opt-in paid tier for higher limits | github.com/features/models | GitHub account (free) |
| Cerebras Inference | Ultra-fast LLM inference on wafer-scale silicon (2,600+ tok/s); Llama 3.3 70B, Qwen3 32B/235B, and more; 1M tokens/day free, no credit card required; 30 RPM on free tier | inference.cerebras.ai | Free key |

## Resources for Finding More

- **Public APIs list:** github.com/public-apis/public-apis — 1000+ APIs organized by category
- **Public API Lists:** github.com/public-api-lists/public-api-lists — 730+ APIs across 48 categories with a free JSON query API
- **PublicAPIs.dev:** publicapis.dev — collaborative directory of 1400+ public APIs, searchable by category
- **Free Public APIs:** freepublicapis.com — community catalog tested daily (shows live status)
- **Free Public APIs API:** freepublicapis.com/api — freepublicapis.com's own meta-API; query their entire catalog programmatically; no auth, 1000 req/day free; returns live status, category, and auth type for every listed API
- **PublicAPIs.io:** publicapis.io — 1000+ free public APIs organized by category; no signup required to browse
- **APIList.fun:** apilist.fun — 900+ free APIs across social, weather, movies, games, science, and more; built by apilayer
- **RapidAPI free tier:** rapidapi.com — many APIs have free tiers
