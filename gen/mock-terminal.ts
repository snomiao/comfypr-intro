#!/usr/bin/env bun
/**
 * Phase 4: Terminal Mock Screenshot
 *
 * Generates a static terminal screenshot showing
 * a mocked `bunx comfy-pr` execution with colored ANSI output
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join } from "path";
import Convert from "ansi-to-html";

const convert = new Convert({
  fg: "#c9d1d9",
  bg: "#0d1117",
  newline: true,
  escapeXML: true,
  stream: false,
});

function generateTerminalANSI(): string {
  // Simulated terminal output with ANSI color codes
  return `\x1b[1;36m$\x1b[0m bunx comfy-pr https://github.com/example/my-custom-node

\x1b[2m[comfy-pr]\x1b[0m Starting automation...

\x1b[34m→\x1b[0m Forking repository to ComfyNodePRs/my-custom-node
\x1b[32m✓\x1b[0m Fork created successfully

\x1b[34m→\x1b[0m Cloning forked repository
\x1b[32m✓\x1b[0m Repository cloned to ./workspace/my-custom-node

\x1b[34m→\x1b[0m Running \x1b[33mcomfy node init\x1b[0m
\x1b[32m✓\x1b[0m pyproject.toml initialized

\x1b[34m→\x1b[0m Creating GitHub Actions workflow
\x1b[32m✓\x1b[0m Workflow file created: .github/workflows/publish.yml

\x1b[34m→\x1b[0m Committing changes
\x1b[32m✓\x1b[0m Committed: "Add pyproject.toml and GitHub Actions workflow"

\x1b[34m→\x1b[0m Pushing to fork
\x1b[32m✓\x1b[0m Pushed to PR-my-custom-node branch

\x1b[34m→\x1b[0m Creating pull request
\x1b[32m✓\x1b[0m Pull request created

\x1b[1;32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m

\x1b[1;32m✓ Automation complete!\x1b[0m

\x1b[1mPull Request:\x1b[0m
  \x1b[36mhttps://github.com/Comfy-Org/registry/pull/1234\x1b[0m

\x1b[2mNext steps:\x1b[0m
  • Wait for CI checks to pass
  • Address any review comments
  • PR will be merged automatically once approved

\x1b[1;36m$\x1b[0m `;
}

function getTerminalHTML(ansiOutput: string): string {
  const html = convert.toHtml(ansiOutput);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920, height=1080">
  <title>Terminal Output</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 60px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 22px;
      line-height: 1.6;
      background: #0d1117;
      color: #c9d1d9;
      width: 1920px;
      height: 1080px;
      box-sizing: border-box;
      overflow: hidden;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    /* Terminal window chrome */
    .terminal-window {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 0;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }

    .terminal-header {
      background: #0d1117;
      border-bottom: 1px solid #30363d;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      border-radius: 12px 12px 0 0;
    }

    .terminal-buttons {
      display: flex;
      gap: 8px;
    }

    .terminal-button {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }

    .terminal-button.close { background: #ff5f56; }
    .terminal-button.minimize { background: #ffbd2e; }
    .terminal-button.maximize { background: #27c93f; }

    .terminal-title {
      margin-left: 20px;
      color: #8b949e;
      font-size: 16px;
    }

    .terminal-content {
      padding: 30px;
      max-height: 920px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="terminal-window">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <div class="terminal-button close"></div>
        <div class="terminal-button minimize"></div>
        <div class="terminal-button maximize"></div>
      </div>
      <div class="terminal-title">bash — comfy-pr</div>
    </div>
    <div class="terminal-content">
      <pre>${html}</pre>
    </div>
  </div>
</body>
</html>`;
}

async function renderTerminal(outputPath: string): Promise<void> {
  console.log("Rendering terminal mock screenshot...");

  const ansiOutput = generateTerminalANSI();
  const html = getTerminalHTML(ansiOutput);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  try {
    await page.setContent(html, { waitUntil: "networkidle" });

    // Wait for fonts to load
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: outputPath,
      fullPage: false,
    });

    console.log(`✓ Terminal screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error("✗ Failed to render terminal:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const assetsOutputDir = join(projectRoot, "out", "assets");
  const outputPath = join(assetsOutputDir, "terminal-demo.png");

  console.log("=== Phase 4: Terminal Mock Screenshot ===\n");

  // Ensure output directory exists
  await mkdir(assetsOutputDir, { recursive: true });

  await renderTerminal(outputPath);

  console.log("\n=== Phase 4 Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { renderTerminal, generateTerminalANSI, getTerminalHTML };
