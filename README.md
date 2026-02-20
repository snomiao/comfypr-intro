# Comfy-PR Video Materials

All video production materials for Comfy-PR marketing and documentation.

## 📁 Project Structure

```
video-draft/
├── 01-intro-60s/           # 60-second intro video (fully automated)
│   ├── script.md
│   ├── storyboard.md
│   ├── talking-points.md
│   ├── architecture-diagram.md
│   ├── TODO.md
│   └── README.md
│
├── 02-demo-2-3min/         # 2-3 minute product demo (manual + automated)
│   ├── script.md
│   ├── storyboard.md
│   ├── demo-flow.md
│   └── README.md
│
├── gen/                    # Shared generation scripts
│   ├── tts.ts              # OpenAI TTS audio generation
│   ├── diagram.ts          # Mermaid diagram rendering
│   ├── screenshots.ts      # Playwright screenshot capture
│   ├── slides.ts           # HTML slides → PNG frames
│   ├── mock-terminal.ts    # Terminal mock screenshot
│   ├── compose.ts          # FFmpeg video composition
│   ├── mix-audio.ts        # Background music mixing
│   └── run-all.ts          # Master orchestrator
│
├── shared/                 # Shared assets and style guides
│   └── brand-colors.md     # Consistent color palette
│
└── out/                    # Generated outputs
    ├── 01-intro-60s/
    │   ├── audio/
    │   ├── assets/
    │   ├── frames/
    │   └── video-final.mp4 ⭐
    └── 02-demo-2-3min/
        └── (manual recordings + edited final video)
```

## 🎬 Videos

### 1. 60-Second Intro

**Purpose**: Generate awareness on landing pages, social media, and README
**Duration**: ~60 seconds
**Production**: Fully automated
**Platforms**: GitHub, Twitter, LinkedIn, YouTube

👉 See [`01-intro-60s/README.md`](01-intro-60s/README.md) for details

### 2. 2-3 Minute Demo

**Purpose**: Showcase features with live screen recordings
**Duration**: ~2:30
**Production**: Manual recordings + automated editing
**Platforms**: YouTube, landing page, documentation

👉 See [`02-demo-2-3min/README.md`](02-demo-2-3min/README.md) for details

## 🚀 Quick Start

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

### Generate 60s Intro Video

```bash
bun gen/run-all.ts --video=01-intro-60s
```

Output: `out/01-intro-60s/video-final.mp4`

### Generate Demo Video Audio

```bash
bun gen/tts.ts --script=02-demo-2-3min/script.md --output=out/02-demo-2-3min/audio/
```

Then capture screen recordings manually (see `02-demo-2-3min/demo-flow.md`).

## 🎨 Shared Style Guide

All videos follow consistent branding:

- **Colors**: Orange (#ff9900) primary, dark backgrounds (#0d1117)
- **Fonts**: Inter (UI), JetBrains Mono (code)
- **Transitions**: 0.3s crossfade
- **Music**: Ambient tech track at -22dB

See [`shared/brand-colors.md`](shared/brand-colors.md) for full palette.

## 🛠️ Generation Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `tts.ts` | Generate narration audio via OpenAI | `bun gen/tts.ts --script=<path>` |
| `diagram.ts` | Render Mermaid diagrams to PNG | `bun gen/diagram.ts` |
| `screenshots.ts` | Capture website screenshots | `bun gen/screenshots.ts` |
| `slides.ts` | Generate HTML slides as PNG frames | `bun gen/slides.ts` |
| `mock-terminal.ts` | Create terminal screenshot | `bun gen/mock-terminal.ts` |
| `compose.ts` | Compose video from frames + audio | `bun gen/compose.ts` |
| `mix-audio.ts` | Mix narration with background music | `bun gen/mix-audio.ts` |
| `run-all.ts` | Run full pipeline | `bun gen/run-all.ts` |

## 📊 Output Files

Generated videos are saved to `out/<video-name>/`:

```
out/
├── 01-intro-60s/
│   ├── audio/
│   │   ├── scene-1.mp3 ... scene-7.mp3
│   │   ├── narration-full.mp3
│   │   └── timings.json
│   ├── assets/
│   │   ├── arch-diagram.png
│   │   ├── dashboard.png
│   │   ├── terminal-demo.png
│   │   └── bgmusic.mp3 (download separately)
│   ├── frames/
│   │   └── scene-1.png ... scene-7.png
│   ├── video-raw.mp4
│   └── video-final.mp4 ⭐
│
└── 02-demo-2-3min/
    ├── audio/
    ├── recordings/  (manual screen captures)
    └── video-final.mp4 ⭐
```

## 🎵 Background Music

For videos with music, download a royalty-free track:

1. Go to https://pixabay.com/music/ (search "technology ambient")
2. Download a ~70-90s ambient/tech track
3. Save as `out/<video-name>/assets/bgmusic.mp3`
4. Run `bun gen/mix-audio.ts`

## 📝 Adding New Videos

To add a new video:

1. Create folder: `03-your-video/`
2. Add files:
   - `README.md` (purpose, duration, platforms)
   - `script.md` (narration with timings)
   - `storyboard.md` (shot list)
3. Update this README to link to it
4. Generate or record as needed

## 🔧 Troubleshooting

### "OPENAI_API_KEY not set"
```bash
cp .env.example .env
# Edit .env and add: OPENAI_API_KEY=sk-...
```

### "ffmpeg not found"
```bash
# Ubuntu/Debian
apt install ffmpeg

# macOS
brew install ffmpeg
```

### "Playwright browser not installed"
```bash
bunx playwright install chromium
```

### Video generation fails
Check individual phase logs:
```bash
bun gen/tts.ts        # Test audio generation
bun gen/slides.ts     # Test slide rendering
bun gen/compose.ts    # Test video composition
```

## 📚 Resources

- [OpenAI TTS API Docs](https://platform.openai.com/docs/guides/text-to-speech)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Playwright Docs](https://playwright.dev/)
- [Mermaid Diagram Syntax](https://mermaid.js.org/)

## 📄 License

All video materials and scripts are part of the Comfy-PR project.
See main repository for license details.
