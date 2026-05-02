# Claude / Anthropic API

## Setup

```bash
pip install anthropic
# or
npm install @anthropic-ai/sdk
```

Set your API key:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

## Basic Usage

### Python
```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)
print(message.content[0].text)
```

### Node.js
```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude!' }],
});
console.log(message.content[0].text);
```

## Models (as of 2026)

| Model | Best for | Speed |
|-------|----------|-------|
| claude-opus-4-7 | Complex reasoning, long tasks | Slower |
| claude-sonnet-4-6 | General purpose (recommended) | Fast |
| claude-haiku-4-5 | Simple tasks, high volume, low cost | Fastest |

Always default to `claude-sonnet-4-6` unless you need max capability (Opus) or min cost (Haiku).

## System Prompts

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful assistant specialized in Python development.",
    messages=[{"role": "user", "content": "Write a function to parse CSV files"}]
)
```

## Tool Use (Function Calling)

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"}
            },
            "required": ["location"]
        }
    }
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in São Paulo?"}]
)

# Check if Claude wants to use a tool
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    print(f"Tool: {tool_use.name}, Input: {tool_use.input}")
```

## Streaming

```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a long story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

## Pricing (approximate)
- Sonnet 4.6: $3/MTok input, $15/MTok output
- Haiku 4.5: $0.25/MTok input, $1.25/MTok output
- Opus 4.7: $15/MTok input, $75/MTok output

Check current pricing: anthropic.com/pricing

## Docs
- Full docs: docs.anthropic.com
- API reference: docs.anthropic.com/en/api
- Cookbook (examples): github.com/anthropics/anthropic-cookbook
