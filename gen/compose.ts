#!/usr/bin/env bun
/**
 * Phase 5a: Video Composition
 *
 * Combines slide frames with audio narration using FFmpeg
 * Adds crossfade transitions between scenes
 */

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { $ } from "bun";

interface Timings {
  [key: string]: {
    duration: number;
    text: string;
    title: string;
  };
}

async function loadTimings(timingsPath: string): Promise<Timings> {
  const content = await readFile(timingsPath, "utf-8");
  return JSON.parse(content);
}

async function composeVideo(
  framesDir: string,
  audioDir: string,
  outputPath: string
): Promise<void> {
  console.log("Loading timing information...");
  const timingsPath = join(audioDir, "timings.json");
  const timings = await loadTimings(timingsPath);

  // Build FFmpeg filter_complex for crossfade transitions
  const scenes = Object.keys(timings).sort();
  const crossfadeDuration = 0.5; // 0.5 second crossfade

  console.log(`Composing video with ${scenes.length} scenes...`);
  console.log("Scene durations:");
  scenes.forEach((scene, i) => {
    console.log(`  ${i + 1}. ${timings[scene].title}: ${timings[scene].duration.toFixed(2)}s`);
  });

  // Build FFmpeg inputs
  const inputs: string[] = [];
  const filterParts: string[] = [];

  scenes.forEach((scene, i) => {
    const sceneNum = i + 1;
    const framePath = join(framesDir, `scene-${sceneNum}.png`);
    const duration = timings[scene].duration;

    inputs.push("-loop", "1", "-t", duration.toString(), "-i", framePath);
  });

  // Build crossfade filter chain
  let currentStream = "[0:v]";
  for (let i = 1; i < scenes.length; i++) {
    const prevDuration = scenes.slice(0, i).reduce((sum, s) => sum + timings[s].duration, 0);
    const fadeOffset = prevDuration - crossfadeDuration;

    const nextStream = `[v${i}]`;
    filterParts.push(
      `${currentStream}[${i}:v]xfade=transition=fade:duration=${crossfadeDuration}:offset=${fadeOffset}${nextStream}`
    );
    currentStream = nextStream;
  }

  // Final output stream
  const finalStream = currentStream;
  filterParts.push(`${finalStream}format=yuv420p[outv]`);

  const filterComplex = filterParts.join(";");

  // Add audio
  const audioPath = join(audioDir, "narration-full.mp3");

  console.log("\nRunning FFmpeg...");
  console.log("This may take a while...\n");

  try {
    const ffmpegArgs = [
      ...inputs,
      "-i",
      audioPath,
      "-filter_complex",
      filterComplex,
      "-map",
      "[outv]",
      "-map",
      `${scenes.length}:a`,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-r",
      "30",
      "-pix_fmt",
      "yuv420p",
      "-shortest",
      "-y",
      outputPath,
    ];

    await $`ffmpeg ${ffmpegArgs}`.quiet();

    console.log(`\n✓ Video composed to ${outputPath}`);
  } catch (error) {
    console.error("✗ FFmpeg composition failed:");
    console.error(error);
    throw error;
  }
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const framesDir = join(projectRoot, "out", "frames");
  const audioDir = join(projectRoot, "out", "audio");
  const outputPath = join(projectRoot, "out", "video-raw.mp4");

  console.log("=== Phase 5a: Video Composition ===\n");

  // Check ffmpeg availability
  try {
    await $`ffmpeg -version`.quiet();
  } catch (error) {
    console.error("ERROR: ffmpeg not found in PATH");
    console.error("Please install ffmpeg: apt install ffmpeg");
    process.exit(1);
  }

  await composeVideo(framesDir, audioDir, outputPath);

  console.log("\n=== Phase 5a Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { composeVideo, loadTimings };
