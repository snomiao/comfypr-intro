# Demo Flow — Recording Checklist

Step-by-step guide for recording actual screen demos.

---

## DEMO 1: Terminal / CLI (30 seconds of recording)

### Setup

- Terminal: iTerm2 or similar with dark theme
- Font: JetBrains Mono, 18pt
- Window size: 1920x1080 (full screen)
- Prepare a real example repo: `https://github.com/example/comfy-node-demo`

### Recording Steps

1. Show clean terminal prompt
2. Type (slowly, visible): `bunx comfy-pr https://github.com/example/comfy-node-demo`
3. Press Enter
4. Let it run in real-time — capture:
   - "Forking repository..."
   - "Cloning..."
   - "Running comfy node init..."
   - "Creating GitHub Actions workflow..."
   - "Committing changes..."
   - "Creating PR..."
   - Final output: PR URL
5. **Pause at PR URL** for 2 seconds
6. Open browser to the PR (show it briefly)

### Post-Production

- Speed up the "waiting" parts by 2x (keep typing/results at normal speed)
- Add orange highlight box around important output lines
- Overlay text: "⏱ 28 seconds" at the end

---

## DEMO 2: Slack Bot (30 seconds of recording)

### Setup

- Slack workspace with ComfyPR bot installed
- Create a test thread or use #prbot channel
- Prepare message: `@comfyprbot publish https://github.com/user/another-node`

### Recording Steps

1. Show Slack channel view (dark mode)
2. Type the mention message
3. Send it
4. Bot responds immediately with: "Starting automation for..."
5. Show threaded replies appearing:
   - "Cloning repository..."
   - "Analyzing structure..."
   - "Creating pyproject.toml..."
   - "Opening PR..."
   - "Done! PR: [link]"
6. **Optionally**: show a follow-up question like "can you add MIT license?"
7. Bot responds and updates

### Post-Production

- Crop to just the message thread (remove sidebar clutter)
- Add orange arrows pointing to bot messages
- Overlay text: "Real-time updates"

---

## DEMO 3: Dashboard (35 seconds of recording)

### Setup

- Open https://comfy-pr.vercel.app in browser (dark mode)
- Ensure dashboard has real data loaded
- Zoom level: 100% (crisp text)

### Recording Steps

1. Show homepage — stat cards at top
2. Slowly scroll down to show the repository table
3. Hover over a row to highlight it
4. Click a PR link → GitHub opens in new tab (show briefly)
5. Go back to dashboard
6. Scroll to "Export" buttons
7. Click "Export CSV" → download starts (show notification)
8. Open CSV briefly in Numbers/Excel (optional)

### Post-Production

- Smooth scroll (no jerky mouse movements)
- Add zoom-in effect on stat cards (1.1x scale, 0.5s)
- Highlight cursor with orange glow
- Overlay text: "500+ repos processed" near stats

---

## DEMO 4: Architecture Diagram (10 seconds)

### Recording

- Use the Mermaid diagram from `shared/architecture-diagram.md`
- Render as animated SVG or screen-record it being drawn
- OR: Use static PNG with zoom + pan animation in post

### Post-Production

- Animate arrows flowing (optional)
- Highlight each component as narration mentions it

---

## Screen Recording Tools

| Tool           | Platform    | Best For                             |
| -------------- | ----------- | ------------------------------------ |
| **QuickTime**  | macOS       | Simple, built-in                     |
| **OBS Studio** | All         | Professional, free, configurable     |
| **ScreenFlow** | macOS       | Easy editing + recording             |
| **Loom**       | Web/Desktop | Quick recordings with webcam overlay |

### Recommended Settings

- Resolution: 1920×1080 (1080p)
- Frame rate: 30 FPS
- Format: MP4 (H.264)
- Bitrate: 8-10 Mbps

---

## B-Roll Footage to Capture

Optional supplementary shots:

- [ ] GitHub Comfy-Org organization page
- [ ] registry.comfy.org homepage (zoomed in on node cards)
- [ ] Code editor showing pyproject.toml before/after
- [ ] GitHub Actions tab with green checkmarks
- [ ] Pull request list with many "merged" labels
- [ ] Contributor graph / insights page

---

## Audio Recording

- Use same narration voice as 60s intro (OpenAI TTS `onyx` or record yourself)
- Record in a quiet room with minimal echo
- Add room tone / noise reduction in post
- Match pacing: ~2.5 words/second

---

## Editing Checklist

- [ ] Color-correct all screens to match (dark backgrounds, consistent brightness)
- [ ] Add subtle zoom-ins on key UI elements (1.05-1.1x)
- [ ] Use orange (#ff9900) for all highlights/arrows/boxes
- [ ] Burn in subtitles (white text, black background, bottom-center)
- [ ] Add crossfade transitions (0.3s) between sections
- [ ] Mix background music at -22dB (same track as 60s intro)
- [ ] Export final: 1920×1080, H.264, 30fps, ~10-15 Mbps

---

## Final Output Specs

```
Filename: comfy-pr-demo-2min30s.mp4
Duration: ~2:30
Resolution: 1920×1080 (1080p)
Codec: H.264
Audio: AAC, 192 kbps, stereo
File size target: ~50-80 MB
```
