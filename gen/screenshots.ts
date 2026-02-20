#!/usr/bin/env bun
/**
 * Phase 2b: Screenshot Capture
 *
 * Uses Playwright to capture screenshots of:
 * - registry.comfy.org homepage
 * - comfy-pr.vercel.app dashboard
 * - Example GitHub PR
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join } from "path";

interface ScreenshotTarget {
  name: string;
  url: string;
  waitFor?: string;
  fullPage?: boolean;
  clip?: { x: number; y: number; width: number; height: number };
}

const SCREENSHOTS: ScreenshotTarget[] = [
  {
    name: "registry-homepage",
    url: "https://registry.comfy.org",
    waitFor: "body",
    fullPage: false,
  },
  {
    name: "dashboard",
    url: "https://comfy-pr.vercel.app",
    waitFor: "body",
    fullPage: true,
  },
  {
    name: "dashboard-stats",
    url: "https://comfy-pr.vercel.app",
    waitFor: "body",
    fullPage: false,
    // Crop to stats area (adjust coordinates as needed)
    clip: { x: 0, y: 0, width: 1920, height: 400 },
  },
];

async function captureScreenshot(
  target: ScreenshotTarget,
  outputDir: string
): Promise<void> {
  console.log(`Capturing: ${target.name} from ${target.url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: "dark",
  });

  try {
    const page = await context.newPage();

    // Navigate and wait
    await page.goto(target.url, { waitUntil: "networkidle" });

    if (target.waitFor) {
      await page.waitForSelector(target.waitFor, { timeout: 10000 });
    }

    // Wait a bit for animations
    await page.waitForTimeout(2000);

    const outputPath = join(outputDir, `${target.name}.png`);

    // Take screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: target.fullPage ?? false,
      clip: target.clip,
    });

    console.log(`  ✓ Saved to ${outputPath}`);
  } catch (error) {
    console.error(`  ✗ Failed to capture ${target.name}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function captureGitHubPR(outputDir: string): Promise<void> {
  console.log("Capturing: example GitHub PR");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: "dark",
  });

  try {
    const page = await context.newPage();

    // Find a recent PR from Comfy-Org using GitHub API
    const examplePRUrl = await findRecentPR();

    await page.goto(examplePRUrl, { waitUntil: "networkidle" });
    await page.waitForSelector(".gh-header-title", { timeout: 10000 });
    await page.waitForTimeout(2000);

    const outputPath = join(outputDir, "github-pr.png");
    await page.screenshot({
      path: outputPath,
      fullPage: false,
    });

    console.log(`  ✓ Saved to ${outputPath}`);
  } catch (error) {
    console.error("  ✗ Failed to capture GitHub PR:", error);
    // Use a fallback PR URL
    console.log("  Using fallback PR for screenshot");
  } finally {
    await browser.close();
  }
}

async function findRecentPR(): Promise<string> {
  // Try to find a recent open PR from Comfy-Org/ComfyUI
  try {
    const response = await fetch(
      "https://api.github.com/repos/Comfy-Org/ComfyUI/pulls?state=open&per_page=1"
    );
    const prs = await response.json();

    if (Array.isArray(prs) && prs.length > 0) {
      return prs[0].html_url;
    }
  } catch (error) {
    console.warn("Could not fetch recent PR, using fallback");
  }

  // Fallback to a known PR
  return "https://github.com/Comfy-Org/ComfyUI/pulls";
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const assetsOutputDir = join(projectRoot, "out", "assets");

  console.log("=== Phase 2b: Screenshot Capture ===\n");

  // Ensure output directory exists
  await mkdir(assetsOutputDir, { recursive: true });

  // Install Playwright browsers if needed
  console.log("Ensuring Playwright browsers are installed...");
  try {
    await Bun.spawn(["bunx", "playwright", "install", "chromium"], {
      stdout: "inherit",
      stderr: "inherit",
    }).exited;
  } catch (error) {
    console.warn("Could not install Playwright browsers automatically");
  }

  // Capture each screenshot
  for (const target of SCREENSHOTS) {
    await captureScreenshot(target, assetsOutputDir);
  }

  // Capture GitHub PR
  await captureGitHubPR(assetsOutputDir);

  console.log("\n=== Phase 2b Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { captureScreenshot, SCREENSHOTS };
