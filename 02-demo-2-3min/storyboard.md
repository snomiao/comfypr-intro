# Comfy-PR Demo — Visual Storyboard

Shot-by-shot visual plan for the 2-3 minute demo video.

---

## Section 1: Hook & Context [0:00–0:15]

**Shot 1a** (0:00–0:05)
- **Visual**: Montage of pain points
  - GitHub repo with messy structure
  - Confused developer looking at documentation
  - Clock ticking (time passing animation)
- **Text overlay**: "Hours → Days to publish"
- **Transition**: Fade to black

**Shot 1b** (0:05–0:15)
- **Visual**: Comfy-PR logo appears on dark background
- **Text overlay**: "Comfy-PR changes that."
- **Narration**: "Let me show you."
- **Transition**: Swipe to terminal

---

## Section 2: CLI Demo [0:15–0:45]

**Shot 2a** (0:15–0:20)
- **Visual**: Clean terminal, cursor blinking
- **Text overlay**: "One command"
- **Action**: Type appears: `bunx comfy-pr https://github.com/yourname/amazing-node`
- **Highlight**: Orange box around command

**Shot 2b** (0:20–0:35)
- **Visual**: Terminal output streams in real-time
- **Highlight boxes** (appear sequentially):
  - ✓ Forking repository
  - ✓ Cloning locally
  - ✓ Running `comfy node init`
  - ✓ Creating GitHub Actions
  - ✓ Committing changes
  - ✓ Creating PR
- **Timer overlay**: "⏱ 28s" in corner

**Shot 2c** (0:35–0:45)
- **Visual**: PR URL appears in terminal
- **Action**: Browser opens, show GitHub PR page briefly
- **Highlight**: Orange arrow pointing to PR title and description
- **Text overlay**: "Automated PR with full description"
- **Transition**: Fade to Slack

---

## Section 3: Slack Bot Demo [0:45–1:15]

**Shot 3a** (0:45–0:50)
- **Visual**: Slack channel view (dark mode)
- **Text overlay**: "Need help? Ask the bot."
- **Action**: Type message: `@comfyprbot publish github.com/user/my-node`
- **Highlight**: Orange glow around mention

**Shot 3b** (0:50–1:05)
- **Visual**: Bot responds in thread
- **Threaded messages appear** (animated, one by one):
  1. "Starting automation..."
  2. "Cloning repository..."
  3. "Analyzing structure..."
  4. "Creating pyproject.toml..."
  5. "Opening PR..."
  6. "✓ Done! PR: [link]"
- **Highlight**: Green checkmark pulses on final message
- **Text overlay**: "Real-time progress updates"

**Shot 3c** (1:05–1:15)
- **Visual**: User sends follow-up: "Can you add MIT license?"
- **Bot responds**: "Sure! Updating PR..."
- **Action**: Show GitHub PR gets new commit
- **Text overlay**: "Conversational automation"
- **Transition**: Wipe to dashboard

---

## Section 4: Dashboard [1:15–1:50]

**Shot 4a** (1:15–1:25)
- **Visual**: Dashboard homepage loads (comfy-pr.vercel.app)
- **Zoom in** on stat cards (1.1x scale):
  - 500+ Total Repos
  - 142 Open PRs
  - 387 Merged
- **Text overlay**: "Full visibility"
- **Highlight**: Orange border around each stat card as narration mentions it

**Shot 4b** (1:25–1:40)
- **Visual**: Scroll down to repository table
- **Action**: Hover over a row → highlights
- **Highlight**: Orange cursor glow
- **Action**: Click PR link → GitHub opens in new tab (PiP overlay in corner)
- **Text overlay**: "Track every node"

**Shot 4c** (1:40–1:50)
- **Visual**: Click "Export CSV" button
- **Action**: Download notification appears
- **Visual**: CSV opens briefly in Excel/Numbers (PiP)
- **Rows of data** visible
- **Text overlay**: "Export for analysis"
- **Transition**: Cross-dissolve to architecture diagram

---

## Section 5: Architecture [1:50–2:15]

**Shot 5a** (1:50–2:00)
- **Visual**: Architecture diagram (animated or static)
- **Flowchart**:
  - Slack → Master Bot → Worker Agents → GitHub
- **Animation**: Arrows light up sequentially as narration describes
- **Highlight**: Orange glow on "Master Bot" label

**Shot 5b** (2:00–2:10)
- **Visual**: Split screen
  - Left: Master bot in Slack
  - Right: Multiple worker terminals (3-4) running in parallel
- **Text overlay**: "Parallel processing"
- **Animation**: Progress bars on each worker

**Shot 5c** (2:10–2:15)
- **Visual**: SQLite cache icon + speed gauge
- **Text overlay**: "Cached API responses = 10x faster"
- **Animation**: Gauge needle swings from red to green
- **Transition**: Fade to results

---

## Section 6: Results & CTA [2:15–2:30]

**Shot 6a** (2:15–2:20)
- **Visual**: Animated counter rolling up
  - "500+ repositories processed"
  - "Days → 10 minutes average"
- **Background**: Montage of merged PR screenshots (blurred, fast slideshow)
- **Text overlay**: Big numbers with orange highlights

**Shot 6b** (2:20–2:25)
- **Visual**: GitHub repo page (github.com/Comfy-Org/Comfy-PR)
- **Text overlay**: "Open Source"
- **Highlight**: Star count, README preview

**Shot 6c** (2:25–2:30)
- **Visual**: End card (dark background)
  - Comfy-PR logo centered
  - URLs fade in:
    - `bunx comfy-pr`
    - `comfy-pr.vercel.app`
    - `github.com/Comfy-Org/Comfy-PR`
- **Text overlay**: "Built to grow the Comfy community"
- **Fade out**

---

## Visual Style Guide

### Colors
- Background: #0d1117 (dark)
- Highlights: #ff9900 (orange)
- Success: #27c93f (green)
- Text: #ffffff (white), #c9d1d9 (muted)

### Typography
- Headings: Inter Black, 72pt
- Body: Inter Regular, 36pt
- Code: JetBrains Mono, 28pt
- Overlays: Inter SemiBold, 42pt

### Transitions
- Crossfade: 0.3s
- Swipe: 0.5s (when changing contexts)
- Zoom: 0.4s ease-out

### Highlights
- Orange boxes: 4px border, rounded corners
- Cursor glow: 20px orange blur
- Arrows: 8px stroke, rounded cap

---

## Assets Needed

| Asset | Type | Used In |
|-------|------|---------|
| Terminal recording | Video | Section 2 |
| Slack conversation | Screenshot/Video | Section 3 |
| Dashboard walkthrough | Video | Section 4 |
| Architecture diagram | PNG/SVG | Section 5 |
| Merged PRs montage | Screenshots | Section 6 |
| Comfy-PR logo | PNG (transparent) | Sections 1, 6 |
| Background music | MP3 (~2:45 loop) | All |

---

## Editing Notes

- **Pacing**: Keep cuts snappy — max 5 seconds per shot
- **Annotations**: Add orange arrows/boxes in post, not during recording
- **Audio**: Duck music -6dB during voiceover, -22dB baseline
- **Captions**: White text, black semi-transparent background, 90% width
- **Export**: 1080p, H.264, 30fps, ~60 MB target file size
