# 2-3 Minute Product Demo

Full feature demonstration with live screen recordings showing Comfy-PR in action.

## Purpose

Convert interested viewers into users by showing actual product capabilities and workflows.

## Target Platforms

- **YouTube** (main channel)
- **Landing page "Watch Demo"** section
- **Documentation** (embedded tutorial)
- **Conference talks** / presentations

## Files

| File            | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| `script.md`     | Full narration script (~2:30, 375 words)              |
| `storyboard.md` | Shot-by-shot visual plan with highlights and overlays |
| `demo-flow.md`  | Recording checklist and screen capture guide          |

## Production Approach

**This video requires real screen recordings.** Unlike the 60s intro (which can be fully automated with generated slides), this demo needs:

1. **Terminal recording** — actual `bunx comfy-pr` execution
2. **Slack recording** — bot conversation in real workspace
3. **Dashboard recording** — walkthrough of comfy-pr.vercel.app

See `demo-flow.md` for detailed recording instructions.

## Recording Checklist

### Pre-Production

- [ ] Set up demo repository on GitHub
- [ ] Configure Slack workspace with bot
- [ ] Ensure dashboard has real data loaded
- [ ] Test terminal commands (dry run)

### Recording

- [ ] Terminal demo (30s raw footage)
- [ ] Slack bot interaction (30s raw footage)
- [ ] Dashboard walkthrough (35s raw footage)
- [ ] Architecture diagram (static or animated)

### Post-Production

- [ ] Edit and trim recordings
- [ ] Add orange highlights and arrows
- [ ] Burn in subtitles
- [ ] Mix narration audio
- [ ] Add background music (-22dB)
- [ ] Export final video

## Automated Generation (Partial)

Some elements can be automated:

```bash
# Generate narration audio from script.md
bun ../gen/tts.ts --script=02-demo-2-3min/script.md --output=../out/02-demo-2-3min/audio/

# Render architecture diagram
bun ../gen/diagram.ts --input=../shared/architecture-diagram.md --output=../out/02-demo-2-3min/assets/
```

But screen recordings must be captured manually.

## Key Messages

- **CLI**: One command publishes a node in ~30 seconds
- **Slack Bot**: Conversational AI agent handles complex requests
- **Dashboard**: Full visibility into the publishing pipeline
- **Architecture**: Master-worker agent pattern with parallel processing
- **Results**: 500+ repos, days → minutes

## Video Stats

- **Duration**: ~2:30 (150 seconds)
- **Word count**: ~375 words
- **Sections**: 6
- **Tone**: Conversational, technical, live demo feel
- **Style**: Screen recordings with narration + text overlays

## Tools Needed

- **Screen recording**: OBS Studio or QuickTime
- **Video editing**: DaVinci Resolve, Final Cut Pro, or Adobe Premiere
- **Audio editing**: Audacity or Adobe Audition
- **Annotations**: Camtasia or ScreenFlow (for orange highlights)
