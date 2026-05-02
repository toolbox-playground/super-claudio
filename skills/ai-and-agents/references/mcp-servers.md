# MCP Servers (Model Context Protocol)

## What is MCP?

MCP lets Claude connect to external tools, data sources, and services. Instead of Claude knowing
everything upfront, MCP servers expose tools and resources Claude can call at runtime.

Think of it as plugins/APIs that Claude can invoke mid-conversation.

## Using MCP in Claude Code

### Connect a public MCP server
In `.claude/settings.json`:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}
```

Or via CLI:
```bash
claude mcp add filesystem npx -- -y @modelcontextprotocol/server-filesystem /path
```

### Available public MCP servers
| Server | What it connects | Install |
|--------|-----------------|---------|
| filesystem | Local file system | @modelcontextprotocol/server-filesystem |
| postgres | PostgreSQL database | @modelcontextprotocol/server-postgres |
| github | GitHub repos/issues/PRs | @modelcontextprotocol/server-github |
| brave-search | Web search | @modelcontextprotocol/server-brave-search |
| context7 | Library docs | @upstash/context7-mcp |
| puppeteer | Browser automation | @modelcontextprotocol/server-puppeteer |
| slack | Slack messaging | @modelcontextprotocol/server-slack |

Full registry: github.com/modelcontextprotocol/servers

## Building a Custom MCP Server

### Python (recommended)
```bash
pip install mcp
```

```python
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

app = Server("my-server")

@app.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_product_info",
            description="Get product information by ID",
            inputSchema={
                "type": "object",
                "properties": {
                    "product_id": {"type": "string"}
                },
                "required": ["product_id"]
            }
        )
    ]

@app.call_tool()
async def handle_call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "get_product_info":
        product_id = arguments["product_id"]
        # Your logic here
        return [types.TextContent(type="text", text=f"Product {product_id}: ...")]

if __name__ == "__main__":
    import asyncio
    from mcp.server.stdio import stdio_server
    asyncio.run(stdio_server(app))
```

Register in Claude Code:
```bash
claude mcp add my-server python -- /path/to/server.py
```

### Node.js
```bash
npm install @modelcontextprotocol/sdk
```

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({ name: 'my-server', version: '1.0.0' });

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'my_tool',
    description: 'Does something useful',
    inputSchema: { type: 'object', properties: { input: { type: 'string' } } }
  }]
}));

server.setRequestHandler('tools/call', async (request) => ({
  content: [{ type: 'text', text: `Result for: ${request.params.arguments.input}` }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

## MCP Resources (read-only data)

In addition to tools (callable functions), MCP servers can expose resources (data sources):
```python
@app.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="myapp://products/catalog",
            name="Product Catalog",
            mimeType="application/json"
        )
    ]

@app.read_resource()
async def handle_read_resource(uri: str) -> str:
    if uri == "myapp://products/catalog":
        return json.dumps(get_all_products())
```

## Docs
- MCP spec: modelcontextprotocol.io
- Python SDK: github.com/modelcontextprotocol/python-sdk
- Node SDK: github.com/modelcontextprotocol/typescript-sdk
