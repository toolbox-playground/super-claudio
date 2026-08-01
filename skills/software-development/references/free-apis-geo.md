# Geo, Weather & Natural Events APIs

## NASA EONET — Natural Event Tracker

Track natural events on Earth (wildfires, storms, volcanoes, earthquakes, floods) in real time.

- **Base URL:** https://eonet.gsfc.nasa.gov/api/v3
- **Auth:** None required (completely free, no API key)
- **Docs:** eonet.gsfc.nasa.gov

### Example: Get active natural events
```bash
curl "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=10"
```

### Example: Filter by category (wildfires)
```bash
curl "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open"
```

### Python integration
```python
import requests

def get_active_events(category=None, limit=20):
    url = "https://eonet.gsfc.nasa.gov/api/v3/events"
    params = {"status": "open", "limit": limit}
    if category:
        params["category"] = category
    response = requests.get(url, params=params)
    return response.json()["events"]

events = get_active_events(category="wildfires")
for event in events:
    print(event["title"], event["geometry"][-1]["coordinates"])
```

### Response structure
```json
{
  "events": [
    {
      "id": "EONET_6457",
      "title": "Wildfire in California",
      "categories": [{"id": "wildfires"}],
      "geometry": [{"date": "2026-05-01", "coordinates": [-120.5, 38.2]}]
    }
  ]
}
```

## USGS Earthquake API — Real-Time & Historical Seismic Data

Query global earthquake data (magnitude, depth, location, time) from the US Geological Survey's FDSN Event Web Service. No key required; complements EONET for natural-event tracking.

- **Base URL:** https://earthquake.usgs.gov/fdsnws/event/1
- **Auth:** None required
- **Docs:** earthquake.usgs.gov/fdsnws/event/1/

### Example: Significant earthquakes in the past day
```bash
curl "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"
```

### Example: Custom query (magnitude 4.5+, last 7 days)
```python
import requests
from datetime import datetime, timedelta

def get_earthquakes(min_magnitude=4.5, days=7):
    url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
    params = {
        "format": "geojson",
        "starttime": (datetime.utcnow() - timedelta(days=days)).isoformat(),
        "minmagnitude": min_magnitude,
    }
    return requests.get(url, params=params).json()["features"]

quakes = get_earthquakes()
for q in quakes:
    print(q["properties"]["place"], q["properties"]["mag"])
```

## OpenWeatherMap — Current & Forecast Weather

- **Base URL:** https://api.openweathermap.org/data/2.5
- **Auth:** Free API key (register at openweathermap.org)
- **Free tier:** 60 calls/minute, 7-day forecast, current weather

### Setup
1. Register at openweathermap.org → API Keys → copy your key

### Example: Current weather
```python
import requests

API_KEY = "your_key_here"

def get_weather(city):
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": API_KEY, "units": "metric", "lang": "pt_br"}
    return requests.get(url, params=params).json()

weather = get_weather("São Paulo")
print(f"{weather['name']}: {weather['main']['temp']}°C, {weather['weather'][0]['description']}")
```

## Open-Meteo — Weather Without API Key

Even simpler than OpenWeatherMap — no registration, no key required.

- **Base URL:** https://api.open-meteo.com/v1
- **Auth:** None

```python
import requests

def get_forecast(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat, "longitude": lon,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum",
        "forecast_days": 7,
        "timezone": "America/Sao_Paulo"
    }
    return requests.get(url, params=params).json()

forecast = get_forecast(-23.5505, -46.6333)  # São Paulo
print(forecast["daily"])
```

## Combined Use Case: Natural Disaster + Weather Tracker

```python
events = get_active_events(category="wildfires")
for event in events:
    coords = event["geometry"][-1]["coordinates"]
    forecast = get_forecast(coords[1], coords[0])  # lat, lon
    print(event["title"], forecast["daily"]["temperature_2m_max"][0], "°C tomorrow")
```
