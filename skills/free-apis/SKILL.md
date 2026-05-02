---
name: free-apis
description: >
  Free public API discovery and usage skill. Use when the user wants to build tools using
  public/free APIs, is looking for data sources for a project, or wants to integrate with
  free external data services.
  Trigger on: "free API for X", "public API", "build a weather app", "natural events data",
  "NASA API", "real-time data for my app", "open data", "free data source", "no-cost API",
  "API without credit card", "data API for my project", "track weather", "earthquake data",
  "space data", "government API".
  Also trigger when user mentions building any data-driven tool and needs a data source.
  Do NOT trigger for: paid APIs (OpenAI, Anthropic, etc.), APIs that require purchase.
---

# Free Public APIs

You know the best free public APIs for building data-driven tools. Route based on domain:

## Routing

| Domain | Reference file |
|--------|---------------|
| Geography, weather, climate, natural events | `references/geo-weather.md` |
| All other domains (finance, space, sports, news, etc.) | `references/catalog.md` |

If the user's API need doesn't fit these categories, use WebSearch to find a suitable free API
and document the endpoint, auth, and example usage for the user.
