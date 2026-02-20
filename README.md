# Comfy-PR — 1-Minute Intro Video: Production Materials

All materials for the intro video are in this directory.

## Files

| File                      | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `script.md`               | Full narration script, timed by scene (~155 words, 60s)            |
| `storyboard.md`           | Scene-by-scene visual plan with shot list and asset checklist      |
| `architecture-diagram.md` | Diagram for Scene 4 — ASCII, simplified, and Mermaid source        |
| `talking-points.md`       | Key messages, value props, audience angles, and stats placeholders |
| `TODO.md`                 | Complete automated generation pipeline                             |

## Video Structure (60 seconds)

| Time      | Scene        | Content                                                |
| --------- | ------------ | ------------------------------------------------------ |
| 0:00–0:07 | Hook         | Thousands of nodes, one painful process                |
| 0:07–0:18 | Problem      | Manual steps: pyproject.toml, Actions, PRs, follow-ups |
| 0:18–0:32 | Solution     | Comfy-PR automates the whole workflow                  |
| 0:32–0:47 | How it works | Slack bot → AI agents → GitHub PR + dashboard          |
| 0:47–0:56 | Scale        | Hundreds of repos, days → minutes                      |
| 0:56–1:00 | CTA          | "Built to grow the Comfy Community"                    |

## Automated Video Generation

### Prerequisites

1. **Bun runtime**: `curl -fsSL https://bun.sh/install | bash`
2. **FFmpeg**: `apt install ffmpeg` (or `brew install ffmpeg` on macOS)
3. **OpenAI API key**: Get from https://platform.openai.com/api-keys

### Setup

```bash
# Install dependencies
bun install

# Install Playwright browsers
bunx playwright install chromium

# Configure environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

### Generate Video

Run the full pipeline:

```bash
bun gen/run-all.ts
```

Or run individual phases:

```bash
bun run gen:audio      # Phase 1: TTS audio
bun run gen:assets     # Phase 2: Diagrams & screenshots
bun run gen:slides     # Phase 3: Slide frames
bun run gen:video      # Phase 5: Compose & mix
```

### Output

All generated files go to `out/`:

```
out/
├── audio/
│   ├── scene-{1-7}.mp3        # TTS per scene
│   ├── narration-full.mp3     # Concatenated narration
│   └── timings.json           # Scene durations
├── assets/
│   ├── arch-diagram.png       # Architecture diagram
│   ├── dashboard.png          # Dashboard screenshot
│   ├── registry-homepage.png  # Registry screenshot
│   ├── github-pr.png          # Example PR screenshot
│   ├── terminal-demo.png      # Terminal mock
│   └── bgmusic.mp3           # Background music (download separately)
├── frames/
│   └── scene-{1-7}.png        # Rendered slides
├── video-raw.mp4              # Video without music
└── video-final.mp4            # Final video with music ⭐
```

### Background Music (Optional)

For the final video with music, download a royalty-free track:

1. Go to https://pixabay.com/music/ (search "technology ambient")
2. Download a ~70s ambient/tech track
3. Save as `out/assets/bgmusic.mp3`
4. Run `bun gen/mix-audio.ts`

## Manual Production Steps (Alternative)

If you prefer manual production instead of automated generation:

## Quick Production Steps

1. Record the narration from `script.md`
2. Capture screen recordings per `storyboard.md` checklist
3. Export architecture diagram from `architecture-diagram.md` (use Mermaid or Figma)
4. Fill in real stats from comfy-pr.vercel.app before recording Scene 5
5. Edit: ~2–3 cuts per scene, keep pace snappy
6. Add subtle background music (tech/ambient, -20dB under voice)
