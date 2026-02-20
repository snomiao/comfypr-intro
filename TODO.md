# TODO — Comfy-PR Intro Video Generation

Bullet journal style. Each item is a discrete automated step.
Output directory: `docs/intro/video-draft/out/`

---

## Pipeline Overview

```
script.md
    ↓
[1] TTS audio per scene          →  out/audio/scene-{n}.mp3
[2] Mermaid diagram → PNG        →  out/assets/arch-diagram.png
[3] Screenshots (Playwright)     →  out/assets/{name}.png
[4] Slide HTML → PNG frames      →  out/frames/scene-{n}.png
[5] FFmpeg: compose video        →  out/video-raw.mp4
[6] FFmpeg: mix background music →  out/video-final.mp4
```

---

## Tasks

### PHASE 1 — Audio

- [ ] **1.1** Write `gen/tts.ts` — call OpenAI TTS API (`tts-1`, voice `onyx`) for each scene text in `script.md`; save to `out/audio/scene-{n}.mp3`
- [ ] **1.2** Generate timing file `out/audio/timings.json` — actual duration of each scene's audio (use `ffprobe` or `ffmpeg -i`)
- [ ] **1.3** Concatenate scene audios → `out/audio/narration-full.mp3` with 0.3s silence between scenes

### PHASE 2 — Static Assets

- [ ] **2.1** Write `gen/diagram.ts` — render `architecture-diagram.md` Mermaid block with `@mermaid-js/mermaid-cli` (`mmdc`) → `out/assets/arch-diagram.png` (dark theme, 1920×1080)
- [ ] **2.2** Write `gen/screenshots.ts` — use Playwright to capture:
  - `out/assets/registry-homepage.png` — registry.comfy.org
  - `out/assets/dashboard.png` — comfy-pr.vercel.app (full page)
  - `out/assets/dashboard-stats.png` — cropped stat cards area
  - `out/assets/github-pr.png` — example open PR on Comfy-Org (pick a real one via GitHub API)

### PHASE 3 — Slide Frames

- [ ] **3.1** Write `gen/slides.ts` — for each scene, render an HTML slide (Tailwind CDN + custom styles) via Playwright → `out/frames/scene-{n}.png` at 1920×1080
  - Scene 1 (Hook): full-bleed montage + bold headline text
  - Scene 2 (Problem): animated checklist (render at final/complete state)
  - Scene 3 (Solution): Comfy-PR logo + terminal output text
  - Scene 4a (Bot): Slack mock conversation screenshot + arch diagram side-by-side
  - Scene 4b (Dashboard): `out/assets/dashboard.png` with overlay label
  - Scene 5 (Scale): big counter numbers + "Days → Minutes"
  - Scene 6 (CTA): dark background + logo + URLs

- [ ] **3.2** Write `gen/slide-template.html` — shared slide base template (dark bg #0d1117, orange accent #ff9900, monospace font for code)

### PHASE 4 — Terminal Recording

- [ ] **4.1** Write `gen/mock-terminal.ts` — generate a static terminal screenshot (HTML with ansi-to-html) showing a mocked `bunx comfy-pr` run with colored output → `out/assets/terminal-demo.png`
  - Show: `Cloning repo... ✓`, `Setting up pyproject.toml... ✓`, `Creating PR... ✓`, `PR: https://github.com/...`

### PHASE 5 — Video Composition

- [ ] **5.1** Write `gen/compose.ts` — build FFmpeg command from `timings.json`:
  - Each frame displayed for its scene's audio duration
  - 0.5s crossfade transition between scenes using `xfade` filter
  - Output: `out/video-raw.mp4` (H.264, 1920×1080, 30fps)

- [ ] **5.2** Download royalty-free background music → `out/assets/bgmusic.mp3`
  - Source: pixabay.com/music search "technology ambient" (no attribution required)
  - Target: ~70s loop, trim/loop to match video length

- [ ] **5.3** Write `gen/mix-audio.ts` — FFmpeg mix narration + background music:
  - BG music volume: -22dB (ducked under voice)
  - Fade in BG 0→0.5s, fade out last 2s
  - Output: `out/video-final.mp4`

### PHASE 6 — Subtitles (optional but recommended)

- [ ] **6.1** Write `gen/subtitles.ts` — generate `out/subtitles.srt` from `script.md` + `timings.json`; burn into video with FFmpeg `subtitles` filter → `out/video-final-subs.mp4`

### PHASE 7 — Runner Script

- [ ] **7.1** Write `gen/run-all.ts` — top-level script that runs phases 1–5 in order; log progress to stdout
  ```bash
  bun docs/intro/video-draft/gen/run-all.ts
  ```

---

## Dependencies to install

```bash
bun add -d @mermaid-js/mermaid-cli   # mmdc CLI
bun add -d playwright                 # screenshots & slide rendering
bun add -d openai                     # TTS audio
bun add -d ansi-to-html              # terminal mock
# ffmpeg must be available on PATH (apt install ffmpeg)
```

---

## Output Files

| File | Description |
|------|-------------|
| `out/audio/scene-{n}.mp3` | TTS narration per scene |
| `out/audio/narration-full.mp3` | Concatenated narration |
| `out/audio/timings.json` | Scene durations in seconds |
| `out/assets/arch-diagram.png` | Rendered Mermaid diagram |
| `out/assets/dashboard.png` | Dashboard screenshot |
| `out/assets/terminal-demo.png` | Mocked terminal output |
| `out/frames/scene-{n}.png` | Slide frame per scene |
| `out/video-raw.mp4` | Video without music |
| `out/video-final.mp4` | Final video with music |
| `out/video-final-subs.mp4` | Final video with burned subtitles |
