# Comfy-PR — Key Talking Points & Messaging

Reference for narration, slide text, social posts, and presenter notes.

---

## Elevator Pitch (1 sentence)

> Comfy-PR automates the entire publishing workflow for ComfyUI Custom Node authors — from repo configuration to pull request — so nodes get into the registry faster.

---

## The Problem (Pain Points)

1. **Publishing is multi-step and technical**
   - Authors must configure `pyproject.toml` with exact metadata
   - Must set up GitHub Actions CI/CD workflow files
   - Must fork, branch, and submit PRs to Comfy-Org
   - Must respond to review comments and iterate

2. **High drop-off rate**
   - Many capable authors abandon the process mid-way
   - Registry growth is bottlenecked by author friction, not talent

3. **No standardized tooling**
   - Each author reinvents the wheel for configuration
   - Inconsistent PR quality slows reviewers

---

## The Solution (Value Props)

| What Comfy-PR does                   | Why it matters                              |
| ------------------------------------ | ------------------------------------------- |
| Auto-configures `pyproject.toml`     | Authors skip the spec-reading               |
| Auto-creates GitHub Actions workflow | CI/CD works out of the box                  |
| Opens PR with template + description | Reviewers get consistent quality            |
| Slack-native AI bot for assistance   | Authors get help in their existing workflow |
| AI coding agents for all changes     | No manual git operations needed             |
| Dashboard for status tracking        | Org-wide visibility on registry pipeline    |
| Rule-based follow-ups                | Nothing falls through the cracks            |

---

## How It Works (3 Steps)

1. **Trigger** — Run `bunx comfy-pr <github-url>` or mention the Slack bot
2. **Automate** — Comfy-PR forks the repo, adds configs, creates a PR
3. **Track** — Dashboard shows the node's journey from open → merged → live

---

## Key Technical Highlights (for developer audiences)

- **Stack**: Bun + TypeScript + Next.js + MongoDB
- **Bot architecture**: Master-worker pattern (Slack bot → PR coding sub-agents)
- **Caching**: SQLite-backed GitHub API cache, 5-min TTL, reduces rate limits
- **Integrations**: GitHub API, Slack Socket Mode, Notion, OpenAI
- **Deployment**: Vercel (dashboard), Docker / Cloud Run (services)
- **Performance**: tsgo-compatible TypeScript, ~33s clean builds

---

## Audience-Specific Angles

### For Custom Node Authors

> "Stop fighting the publishing process. Comfy-PR handles it — you just write the code."

### For Comfy-Org Contributors / Reviewers

> "More consistent PRs, faster reviews, less back-and-forth."

### For AI / Developer Tool Enthusiasts

> "A real-world master-worker AI agent system that automates GitHub workflows end-to-end."

### For the ComfyUI Community

> "More nodes in the registry means more tools for everyone."

---

## Stats / Numbers to Include (replace with real data)

- `[N]` repositories processed
- `[N]` PRs opened automatically
- `[N]` nodes successfully published
- Days → minutes turnaround time

_(Pull real numbers from comfy-pr.vercel.app dashboard before recording)_

---

## Social Media / Video Description

**YouTube / X description:**

> Comfy-PR automates the entire ComfyUI Custom Node publishing workflow. From pyproject.toml setup to GitHub Actions to pull requests — done in minutes, not days.
>
> Dashboard: comfy-pr.vercel.app
> GitHub: github.com/Comfy-Org/Comfy-PR
