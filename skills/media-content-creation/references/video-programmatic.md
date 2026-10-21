# Programmatic / Code-Based Video

Create videos through code rather than AI generation. Best for: animated infographics, text-heavy
content, emoji videos, presentations, and branded templates you can reuse.

## Remotion — React-Based Video

Remotion lets you create videos using React components. Every frame is a React render.

**Install:**
```bash
npx create-video@latest
# choose a template: Hello World, Blank, or from remotion.dev/templates
```

**Templates worth knowing:**
- `remotion.dev/templates` — starter templates including social media formats
- Emoji/motion graphics templates — great for fun WhatsApp/Instagram shares
- Data visualization templates — animate charts and stats

**Remotion Agent Skills (official, 2026):** Remotion now ships its own Claude Code/Cursor/Codex skills directly from the Remotion team — relevant since this workflow is being driven by Claude Code already:
```bash
npx skills add remotion-dev/skills
# or during project creation: bun create video (offers to add skills)
```
This installs skills like `/remotion-best-practices` (umbrella skill), `/remotion-create`, `/remotion-render`, `/remotion-markup`, and others into `.agents/skills` (symlinked to `.claude/skills` for Claude Code compatibility). They encode Remotion's own conventions so the agent writes idiomatic components instead of guessing — useful before generating a Remotion project through Claude Code rather than by hand. Update with `npx remotion skills update`. This supplements, not replaces, the `video-use` skill below.

**Basic structure:**
```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', opacity }}>
      <h1>Hello!</h1>
    </AbsoluteFill>
  );
};
```

**Render to file:**
```bash
npx remotion render src/index.ts MyVideo out/video.mp4
```

**Best for:**
- Shareable WhatsApp/Instagram content with text + emoji
- Branded promotional videos with consistent style
- Animated data/infographic content
- Anything you want to generate programmatically (bulk, templated)

## When to use Remotion vs AI video

| Use Remotion | Use AI video (Kling/Hailuo) |
|---|---|
| Text-heavy content | Realistic human/scene motion |
| Reusable template | One-off creative content |
| Data visualization | Cinematic aesthetics |
| Full code control | Natural-looking footage |
| No usage credits needed | Fast non-code workflow |
