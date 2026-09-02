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

**Remotion Agent Skills (for Claude Code):**
Remotion ships an official Agent Skills bundle that teaches coding agents (Claude Code, Cursor, Codex) its timing, composition, and rendering conventions — useful when generating Remotion code directly instead of hand-writing it.

```bash
npx skills add remotion-dev/skills
```

Covers project/composition setup, animation timing, captions/subtitles, map animations, and package upgrades. Repo: `github.com/remotion-dev/skills`.

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
