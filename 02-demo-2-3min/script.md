# Comfy-PR — 2-3 Minute Product Demo Script

**Total runtime: ~2:30 (150 seconds) | ~375 words**
**Tone: conversational, technical but approachable, live demo feel**

---

## [0:00 – 0:15] HOOK & CONTEXT

> "Publishing a ComfyUI custom node to the official registry used to take hours — sometimes days.
>
> You'd fork repos, configure pyproject.toml, set up GitHub Actions, create pull requests, and wait for reviews.
>
> Most developers gave up halfway through.
>
> Comfy-PR changes that. Let me show you."

---

## [0:15 – 0:45] DEMO 1: CLI AUTOMATION

**[Screen recording: Terminal]**

> "Say you've built a custom node on GitHub. Publishing it is one command:
>
> `bunx comfy-pr https://github.com/yourname/amazing-node`
>
> Watch what happens.
>
> Comfy-PR forks the repository to our automation account.
> It clones it locally, analyzes the code, and runs `comfy node init` to generate a proper pyproject.toml with all the right metadata.
>
> Then it creates a GitHub Actions workflow file for automated publishing.
> Commits the changes. Pushes to a new branch. And opens a pull request to the Comfy registry — all in about 30 seconds.
>
> The PR includes a detailed description, links to your original repo, and clear next steps.
>
> That's it. You're done."

---

## [0:45 – 1:15] DEMO 2: SLACK BOT INTEGRATION

**[Screen recording: Slack]**

> "But what if you need help, or want to publish multiple nodes?
>
> We've got a Slack bot.
>
> Just mention it: '@comfyprbot publish github.com/user/my-node'
>
> The bot spins up an AI coding agent — not just a script, an actual autonomous agent that understands your repo structure.
>
> It researches the codebase, identifies what needs to be added, makes the changes, and creates the PR.
> All while giving you live progress updates in the thread.
>
> You can ask it questions. You can tell it to fix issues. It's like having a DevOps engineer on call, 24/7.
>
> And if the PR gets reviewer feedback? The bot can respond to that too."

---

## [1:15 – 1:50] DEMO 3: DASHBOARD & TRACKING

**[Screen recording: comfy-pr.vercel.app]**

> "Every node that goes through Comfy-PR shows up on this dashboard.
>
> Here you can see we've processed over 500 repositories.
> 142 pull requests are currently open and under review.
> 387 have already been merged and published to the registry.
>
> You get full visibility: which nodes are stuck, which reviewers are active, which PRs need attention.
>
> Click any row to see the PR on GitHub, the original repo, the author, labels, and status.
>
> Export everything to CSV or YAML for your own analysis.
>
> It's not just automation — it's transparency. The whole Comfy community can see what's in the pipeline."

---

## [1:50 – 2:15] ARCHITECTURE & FEATURES

**[Diagram overlay]**

> "Under the hood, Comfy-PR uses a master-worker agent architecture.
>
> The master bot lives in Slack. It handles communication, searches documentation, and coordinates tasks.
>
> When code changes are needed, it spawns worker agents — isolated coding bots that clone repos, make edits, run tests, and create commits.
>
> Each worker runs in its own sandbox, so dozens of nodes can be processed in parallel without conflicts.
>
> And because we cache GitHub API responses with SQLite, the whole system is fast — even with hundreds of requests per day."

---

## [2:15 – 2:30] RESULTS & CTA

**[Stats + end card]**

> "Since launch, Comfy-PR has cut the average publishing time from multiple days to under 10 minutes.
>
> Hundreds of custom nodes are now available that might never have been published otherwise.
>
> The code is open source. The dashboard is live. The Slack bot is ready.
>
> Try it yourself: bunx comfy-pr, or visit comfy-pr.vercel.app.
>
> Comfy-PR — built to grow the Comfy community."

---

## Production Notes

- **Pacing**: ~2.5 words/second, conversational not rushed
- **Screen recordings**: Terminal, Slack, Dashboard — all in dark mode
- **Transitions**: 0.3s crossfades between sections
- **Music**: Same ambient tech track from 60s intro, -22dB
- **Captions**: Burn in subtitles for key commands and URLs
- **Highlight**: Use orange boxes/arrows to draw attention to UI elements during screen recordings
