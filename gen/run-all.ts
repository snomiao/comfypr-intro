#!/usr/bin/env bun
/**
 * Phase 7: Master Runner Script
 *
 * Orchestrates all video generation phases:
 * 1. TTS Audio
 * 2. Static Assets (diagrams, screenshots, terminal)
 * 3. Slide Frames
 * 4. Video Composition
 * 5. Audio Mixing
 */

import { join } from "path";
import { $ } from "bun";

interface Phase {
  number: string;
  name: string;
  script: string;
  required: boolean;
}

const PHASES: Phase[] = [
  {
    number: "1",
    name: "TTS Audio Generation",
    script: "tts.ts",
    required: true,
  },
  {
    number: "2a",
    name: "Diagram Generation",
    script: "diagram.ts",
    required: true,
  },
  {
    number: "2b",
    name: "Screenshot Capture",
    script: "screenshots.ts",
    required: false, // Optional - may fail if sites are down
  },
  {
    number: "3",
    name: "Slide Frame Generation",
    script: "slides.ts",
    required: true,
  },
  {
    number: "4",
    name: "Terminal Mock Screenshot",
    script: "mock-terminal.ts",
    required: false, // Optional - not used in current slides
  },
  {
    number: "5a",
    name: "Video Composition",
    script: "compose.ts",
    required: true,
  },
  {
    number: "5b",
    name: "Audio Mixing",
    script: "mix-audio.ts",
    required: false, // Optional - requires background music
  },
];

async function runPhase(phase: Phase, genDir: string): Promise<boolean> {
  const scriptPath = join(genDir, phase.script);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Phase ${phase.number}: ${phase.name}`);
  console.log(`${"=".repeat(60)}\n`);

  try {
    const result = await Bun.spawn(["bun", scriptPath], {
      stdout: "inherit",
      stderr: "inherit",
      cwd: join(genDir, ".."),
    }).exited;

    if (result !== 0) {
      throw new Error(`Phase ${phase.number} exited with code ${result}`);
    }

    console.log(`\n✓ Phase ${phase.number} completed successfully`);
    return true;
  } catch (error) {
    console.error(`\n✗ Phase ${phase.number} failed:`, error);

    if (phase.required) {
      throw new Error(`Required phase ${phase.number} failed`);
    } else {
      console.warn(`⚠ Continuing despite optional phase failure...`);
      return false;
    }
  }
}

async function checkPrerequisites(): Promise<void> {
  console.log("Checking prerequisites...\n");

  const checks = [
    { name: "ffmpeg", command: "ffmpeg -version" },
    { name: "ffprobe", command: "ffprobe -version" },
    { name: "bun", command: "bun --version" },
  ];

  for (const check of checks) {
    try {
      await $`sh -c ${check.command}`.quiet();
      console.log(`✓ ${check.name} found`);
    } catch (error) {
      console.error(`✗ ${check.name} not found`);
      throw new Error(`Missing prerequisite: ${check.name}. Please install it and try again.`);
    }
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("\n✗ OPENAI_API_KEY not set");
    console.error("Please set it in .env or .env.local file");
    throw new Error("Missing OPENAI_API_KEY");
  }

  console.log("✓ OPENAI_API_KEY found");
  console.log("\n✓ All prerequisites satisfied\n");
}

async function printSummary(results: Map<string, boolean>): Promise<void> {
  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60) + "\n");

  console.log("Phase Results:");
  for (const phase of PHASES) {
    const key = `${phase.number}: ${phase.name}`;
    const success = results.get(key);
    const status = success ? "✓" : success === false ? "⚠" : "⊘";
    const label = success ? "SUCCESS" : success === false ? "SKIPPED" : "NOT RUN";
    console.log(`  ${status} Phase ${phase.number}: ${phase.name} - ${label}`);
  }

  const projectRoot = join(import.meta.dir, "..");
  const outputDir = join(projectRoot, "out");

  console.log("\nOutput Files:");
  console.log(`  Audio:  ${outputDir}/audio/`);
  console.log(`  Assets: ${outputDir}/assets/`);
  console.log(`  Frames: ${outputDir}/frames/`);
  console.log(`  Video:  ${outputDir}/video-raw.mp4`);

  if (results.get("5b: Audio Mixing")) {
    console.log(`  Final:  ${outputDir}/video-final.mp4 ⭐`);
  } else {
    console.log(`  Final:  ${outputDir}/video-raw.mp4 (no music)`);
  }

  console.log("\n" + "=".repeat(60));
}

async function main() {
  const genDir = import.meta.dir;
  const results = new Map<string, boolean>();

  console.log("\n" + "█".repeat(60));
  console.log("█" + " ".repeat(58) + "█");
  console.log("█" + "  Comfy-PR Intro Video Generator".padEnd(58) + "█");
  console.log("█" + " ".repeat(58) + "█");
  console.log("█".repeat(60) + "\n");

  try {
    // Check prerequisites
    await checkPrerequisites();

    // Run each phase
    for (const phase of PHASES) {
      const success = await runPhase(phase, genDir);
      results.set(`${phase.number}: ${phase.name}`, success);
    }

    // Print summary
    await printSummary(results);

    console.log("\n🎉 Video generation complete!\n");
  } catch (error) {
    console.error("\n" + "!".repeat(60));
    console.error("FATAL ERROR");
    console.error("!".repeat(60));
    console.error("\n", error);
    console.error("\nVideo generation failed. Please check the errors above.\n");
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
}

export { runPhase, checkPrerequisites, PHASES };
