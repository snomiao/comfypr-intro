# 60-Second Intro Video

Quick hook video for landing pages, social media, and README embeds.

## Purpose

Generate awareness and interest in Comfy-PR by highlighting the problem and solution in 60 seconds.

## Target Platforms

- **GitHub README** (embedded)
- **Landing page hero** (comfy-pr.vercel.app)
- **Twitter/X** (native upload)
- **LinkedIn** (native upload)
- **YouTube Shorts** (vertical crop)

## Files

| File                      | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `script.md`               | Full narration script with timings       |
| `storyboard.md`           | Shot list and visual planning            |
| `talking-points.md`       | Messaging guide and key value props      |
| `architecture-diagram.md` | Mermaid diagram for "How It Works" scene |
| `TODO.md`                 | Automated generation pipeline checklist  |

## Quick Generate

```bash
# From project root
cd 01-intro-60s
bun ../gen/run-all.ts --video=01-intro-60s
```

Output: `../out/01-intro-60s/video-final.mp4`

## Manual Production

See `storyboard.md` for shot-by-shot guide if recording manually.

## Key Messages

- **Problem**: Publishing custom nodes is a painful, multi-step process
- **Solution**: Comfy-PR automates the entire workflow
- **How**: Slack bot → AI agents → GitHub PR
- **Results**: Days → Minutes

## Video Stats

- **Duration**: ~60 seconds
- **Word count**: ~155 words
- **Scenes**: 6
- **Tone**: Energetic, developer-friendly
