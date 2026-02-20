#!/usr/bin/env bun
/**
 * Phase 5b: Audio Mixing
 *
 * Mixes narration with background music
 * - BG music at -22dB (ducked under voice)
 * - Fade in/out on BG music
 */

import { join } from "path";
import { $ } from "bun";
import { stat } from "fs/promises";

async function getVideoDuration(videoPath: string): Promise<number> {
  try {
    const result =
      await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${videoPath}`.text();
    return parseFloat(result.trim());
  } catch (error) {
    console.error("Could not get video duration");
    throw error;
  }
}

async function mixAudioWithMusic(
  videoPath: string,
  musicPath: string,
  outputPath: string
): Promise<void> {
  console.log("Getting video duration...");
  const duration = await getVideoDuration(videoPath);
  console.log(`Video duration: ${duration.toFixed(2)}s`);

  console.log("\nMixing audio with background music...");
  console.log("Settings:");
  console.log("  - BG music volume: -22dB");
  console.log("  - Fade in: 0→0.5s");
  console.log("  - Fade out: last 2s");

  try {
    // FFmpeg audio filter:
    // 1. Loop background music to match video duration
    // 2. Apply volume reduction (-22dB)
    // 3. Apply fade in/out
    // 4. Mix with original audio
    const filterComplex = [
      // Process background music
      `[1:a]aloop=loop=-1:size=2e9,atrim=duration=${duration},volume=-22dB,afade=t=in:st=0:d=0.5,afade=t=out:st=${duration - 2}:d=2[music]`,
      // Mix music with narration
      "[0:a][music]amix=inputs=2:duration=shortest:weights=1 0.6[aout]",
    ].join(";");

    await $`ffmpeg -i ${videoPath} -i ${musicPath} -filter_complex ${filterComplex} -map 0:v -map [aout] -c:v copy -c:a aac -b:a 192k -y ${outputPath}`.quiet();

    console.log(`\n✓ Final video with music saved to ${outputPath}`);
  } catch (error) {
    console.error("✗ Audio mixing failed:");
    console.error(error);
    throw error;
  }
}

async function downloadBackgroundMusic(outputPath: string): Promise<void> {
  console.log("Checking for background music...");

  try {
    await stat(outputPath);
    console.log("✓ Background music already exists");
    return;
  } catch (error) {
    // File doesn't exist, need to download
  }

  console.log("\nBackground music not found.");
  console.log("Please download royalty-free background music and save it to:");
  console.log(`  ${outputPath}`);
  console.log("\nRecommended sources:");
  console.log("  - https://pixabay.com/music/ (search: 'technology ambient')");
  console.log("  - https://freesound.org/");
  console.log("\nTip: Choose a ~70s ambient/tech track, no attribution required");

  throw new Error("Background music not found. Please download and try again.");
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const videoRawPath = join(projectRoot, "out", "video-raw.mp4");
  const musicPath = join(projectRoot, "out", "assets", "bgmusic.mp3");
  const outputPath = join(projectRoot, "out", "video-final.mp4");

  console.log("=== Phase 5b: Audio Mixing ===\n");

  // Check if background music exists
  await downloadBackgroundMusic(musicPath);

  // Mix audio
  await mixAudioWithMusic(videoRawPath, musicPath, outputPath);

  console.log("\n=== Phase 5b Complete ===");
  console.log(`\nFinal video: ${outputPath}`);
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { mixAudioWithMusic, getVideoDuration };
