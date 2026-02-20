#!/usr/bin/env bun
/**
 * Phase 3: Slide Frame Generation
 *
 * Generates HTML slides for each scene and renders them to PNG
 * using Playwright at 1920x1080 resolution
 */

import { chromium } from "playwright";
import { mkdir, readFile } from "fs/promises";
import { join } from "path";

interface SlideConfig {
  sceneNumber: number;
  title: string;
  html: string;
}

function getSlideTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920, height=1080">
  <title>Comfy-PR Intro Slide</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background: #0d1117;
      color: #ffffff;
      width: 1920px;
      height: 1080px;
      overflow: hidden;
    }

    .mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .gradient-text {
      background: linear-gradient(135deg, #ff9900 0%, #ffcc00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glow {
      text-shadow: 0 0 20px rgba(255, 153, 0, 0.5);
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

const SLIDES: SlideConfig[] = [
  // Scene 1: Hook
  {
    sceneNumber: 1,
    title: "Hook",
    html: `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div class="text-center px-20">
          <h1 class="text-8xl font-black mb-8 gradient-text glow">
            Thousands of Nodes
          </h1>
          <div class="text-6xl font-bold text-gray-300 mb-6">
            One Painful Process
          </div>
          <div class="text-3xl text-gray-500 mono">
            registry.comfy.org
          </div>
        </div>
      </div>
    `,
  },

  // Scene 2: The Problem
  {
    sceneNumber: 2,
    title: "Problem",
    html: `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-red-950 via-gray-900 to-black">
        <div class="max-w-4xl">
          <h2 class="text-7xl font-black mb-16 text-red-400">The Problem</h2>
          <ul class="space-y-8 text-5xl">
            <li class="flex items-center gap-6">
              <span class="text-red-500">✗</span>
              <span class="text-gray-300">Setup <code class="mono text-orange-400">pyproject.toml</code></span>
            </li>
            <li class="flex items-center gap-6">
              <span class="text-red-500">✗</span>
              <span class="text-gray-300">Configure GitHub Actions</span>
            </li>
            <li class="flex items-center gap-6">
              <span class="text-red-500">✗</span>
              <span class="text-gray-300">Open Pull Requests</span>
            </li>
            <li class="flex items-center gap-6">
              <span class="text-red-500">✗</span>
              <span class="text-gray-300">Wait for reviews...</span>
            </li>
          </ul>
          <div class="text-6xl font-black text-red-500 mt-16 text-center">
            Most just give up.
          </div>
        </div>
      </div>
    `,
  },

  // Scene 3: The Solution
  {
    sceneNumber: 3,
    title: "Solution",
    html: `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-green-950 via-gray-900 to-black">
        <div class="text-center px-20">
          <div class="text-8xl font-black mb-12 gradient-text glow">
            Comfy-PR
          </div>
          <div class="text-5xl font-bold text-gray-300 mb-16">
            Automates the entire workflow
          </div>
          <div class="bg-gray-900 border-2 border-orange-500 rounded-2xl p-12 mono text-left max-w-4xl mx-auto">
            <div class="text-3xl text-green-400">$ bunx comfy-pr https://github.com/user/my-node</div>
            <div class="mt-6 text-2xl text-gray-400">
              <div>✓ Cloning repo...</div>
              <div>✓ Setting up pyproject.toml...</div>
              <div>✓ Creating GitHub Actions...</div>
              <div>✓ Opening PR...</div>
              <div class="text-orange-400 mt-4">PR: https://github.com/Comfy-Org/...</div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // Scene 4a: How It Works - Bot
  {
    sceneNumber: 4,
    title: "How It Works - Bot",
    html: `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-blue-950 via-gray-900 to-black">
        <div class="text-center px-20">
          <h2 class="text-7xl font-black mb-12 gradient-text">How It Works</h2>
          <div class="text-5xl font-bold text-gray-300 mb-12">
            Slack-native AI Bot
          </div>
          <div class="bg-gray-900 rounded-3xl p-10 max-w-5xl mx-auto text-left">
            <div class="text-3xl space-y-8">
              <div class="flex items-center gap-4">
                <span class="text-6xl">💬</span>
                <span class="text-gray-300">Slack Command</span>
                <span class="text-orange-400">→</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-6xl">🤖</span>
                <span class="text-gray-300">Master Bot (Research)</span>
                <span class="text-orange-400">→</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-6xl">⚡</span>
                <span class="text-gray-300">PR Agent (Coding)</span>
                <span class="text-orange-400">→</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-6xl">🐙</span>
                <span class="text-green-400">GitHub PR Created</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  // Scene 4b: Dashboard
  {
    sceneNumber: 5,
    title: "Dashboard",
    html: `
      <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-950 via-gray-900 to-black px-20">
        <div class="text-6xl font-black mb-8 gradient-text">Live Dashboard</div>
        <div class="text-4xl text-gray-400 mono mb-8">comfy-pr.vercel.app</div>
        <div class="grid grid-cols-3 gap-8 max-w-6xl w-full">
          <div class="bg-gray-900 rounded-2xl p-8 border-2 border-green-500">
            <div class="text-green-400 text-3xl mb-4">Open PRs</div>
            <div class="text-7xl font-black text-white">142</div>
          </div>
          <div class="bg-gray-900 rounded-2xl p-8 border-2 border-blue-500">
            <div class="text-blue-400 text-3xl mb-4">Merged</div>
            <div class="text-7xl font-black text-white">387</div>
          </div>
          <div class="bg-gray-900 rounded-2xl p-8 border-2 border-orange-500">
            <div class="text-orange-400 text-3xl mb-4">Total</div>
            <div class="text-7xl font-black text-white">529</div>
          </div>
        </div>
        <div class="text-3xl text-gray-400 mt-12">
          Real-time tracking: open → merged → live
        </div>
      </div>
    `,
  },

  // Scene 5: Scale/Results
  {
    sceneNumber: 6,
    title: "Scale",
    html: `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-orange-950 via-gray-900 to-black">
        <div class="text-center px-20">
          <div class="text-8xl font-black mb-16 gradient-text glow">
            Hundreds of Repos
          </div>
          <div class="flex items-center justify-center gap-16 text-6xl font-bold mb-16">
            <div class="text-red-400">Days</div>
            <div class="text-orange-400 text-8xl">→</div>
            <div class="text-green-400">Minutes</div>
          </div>
          <div class="text-4xl text-gray-400">
            Turning multi-day processes into minutes
          </div>
        </div>
      </div>
    `,
  },

  // Scene 6: CTA
  {
    sceneNumber: 7,
    title: "Call to Action",
    html: `
      <div class="flex flex-col items-center justify-center h-full bg-black">
        <div class="text-center">
          <div class="text-9xl font-black mb-8 gradient-text glow">
            Comfy-PR
          </div>
          <div class="text-5xl font-bold text-gray-400 mb-20">
            Built to grow the Comfy Community
          </div>
          <div class="space-y-6 text-3xl text-gray-500 mono">
            <div>github.com/Comfy-Org/Comfy-PR</div>
            <div>comfy-pr.vercel.app</div>
          </div>
        </div>
      </div>
    `,
  },
];

async function renderSlide(
  slide: SlideConfig,
  outputDir: string
): Promise<void> {
  console.log(`Rendering slide ${slide.sceneNumber}: ${slide.title}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  try {
    const html = getSlideTemplate(slide.html);
    await page.setContent(html, { waitUntil: "networkidle" });

    // Wait for fonts to load
    await page.waitForTimeout(1000);

    const outputPath = join(outputDir, `scene-${slide.sceneNumber}.png`);
    await page.screenshot({
      path: outputPath,
      fullPage: false,
    });

    console.log(`  ✓ Saved to ${outputPath}`);
  } catch (error) {
    console.error(`  ✗ Failed to render slide ${slide.sceneNumber}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const framesOutputDir = join(projectRoot, "out", "frames");

  console.log("=== Phase 3: Slide Frame Generation ===\n");

  // Ensure output directory exists
  await mkdir(framesOutputDir, { recursive: true });

  // Render each slide
  for (const slide of SLIDES) {
    await renderSlide(slide, framesOutputDir);
  }

  console.log("\n=== Phase 3 Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { SLIDES, renderSlide, getSlideTemplate };
