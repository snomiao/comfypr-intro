# Comfy-PR — Storyboard / Shot List

Each scene maps to a time segment in `script.md`.

---

## Scene 1 — [0:00–0:07] HOOK

**Visual:**
- Montage: GitHub repos list → custom node galleries → registry.comfy.org page
- OR: Split screen — left: messy GitHub repo, right: polished registry listing

**On-screen text:**
```
Thousands of custom nodes.
One painful publishing process.
```

**Assets needed:**
- Screenshot: ComfyUI node gallery / marketplace
- Screenshot: registry.comfy.org
- Optional: screen recording of a GitHub repo

---

## Scene 2 — [0:07–0:18] THE PROBLEM

**Visual:**
- Animated checklist appearing one by one, each item = friction:
  - `pyproject.toml` setup
  - GitHub Actions config
  - Fork & PR creation
  - Review follow-up
- Final frame: big red ✗ with "Authors give up"

**On-screen text:**
```
Setup pyproject.toml
Configure GitHub Actions
Open Pull Requests
Wait for reviews...
```

**Assets needed:**
- Code editor screenshot showing pyproject.toml
- GitHub Actions YAML snippet
- GitHub PR creation UI

---

## Scene 3 — [0:18–0:32] THE SOLUTION

**Visual:**
- Comfy-PR logo/title card appears
- Demo screen recording: running `bunx comfy-pr <github-url>`
- Terminal shows: clone → configure → PR created → link printed
- Green checkmarks replacing the red ✗ list from Scene 2

**On-screen text:**
```
Comfy-PR
Automates the entire workflow.
```

**Assets needed:**
- Logo / wordmark
- Terminal recording: `bunx comfy-pr` run
- Animated checklist turning green

---

## Scene 4 — [0:32–0:47] HOW IT WORKS

**Visual — two sub-sections:**

**4a: Slack Bot (0:32–0:40)**
- Screencast: Slack message "@comfyprbot please publish github.com/user/my-node"
- Bot replies with live progress updates
- Architecture diagram: Slack → Master Bot → PR Agent → GitHub

**4b: Dashboard (0:40–0:47)**
- Browser screencast: comfy-pr.vercel.app
- Show stat cards: total repos, open PRs, merged PRs
- Briefly highlight the status table (open / merged / stalled columns)

**On-screen text:**
```
Slack-native AI bot
Master agent → Coding sub-agent → GitHub PR
```
```
Live dashboard: comfy-pr.vercel.app
```

**Assets needed:**
- Slack conversation screenshot (can be mocked)
- Architecture diagram (see `architecture-diagram.md`)
- Screen recording of dashboard

---

## Scene 5 — [0:47–0:56] SCALE / RESULTS

**Visual:**
- Animated counter: "500+ repositories processed"
- Side-by-side: "Before: days" vs "After: minutes"
- OR: timelapse-style montage of PRs being merged on GitHub

**On-screen text:**
```
Hundreds of repos processed.
Days → Minutes.
```

**Assets needed:**
- Stats from the dashboard / MongoDB (real numbers)
- GitHub merged PR screenshots

---

## Scene 6 — [0:56–1:00] CALL TO ACTION

**Visual:**
- Clean dark background
- Comfy-PR logo, centered
- URL fades in

**On-screen text:**
```
Comfy-PR
Built to grow the registry.

github.com/Comfy-Org/Comfy-PR
comfy-pr.vercel.app
```

---

## Production Checklist

- [ ] Record terminal demo: `bunx comfy-pr <url>` (30s clip, trim to 8s)
- [ ] Screen record: dashboard at comfy-pr.vercel.app
- [ ] Mock or capture: Slack bot conversation
- [ ] Create/export: logo/wordmark asset (PNG + dark variant)
- [ ] Capture: registry.comfy.org screenshot
- [ ] Create: architecture diagram (see `architecture-diagram.md`)
- [ ] Choose background music: upbeat, light tech / ambient
- [ ] Voiceover: record from `script.md` or use TTS
