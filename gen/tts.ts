#!/usr/bin/env bun
/**
 * Phase 1: TTS Audio Generation
 *
 * Reads script.md, extracts scene narration text,
 * calls OpenAI TTS API for each scene,
 * saves to out/audio/scene-{n}.mp3
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import OpenAI from "openai";
import { $ } from "bun";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Scene {
  number: number;
  timeRange: string;
  title: string;
  text: string;
}

async function parseScript(scriptPath: string): Promise<Scene[]> {
  const content = await readFile(scriptPath, "utf-8");
  const scenes: Scene[] = [];

  // Match pattern: ## [0:00 – 0:07] TITLE
  const sceneRegex = /## \[([\d:]+) – ([\d:]+)\] (.+?)\n\n> "(.+?)"/gs;

  let match;
  let sceneNumber = 1;

  while ((match = sceneRegex.exec(content)) !== null) {
    const [, startTime, endTime, title, text] = match;

    // Clean up text: remove line breaks within the quote
    const cleanText = text.replace(/\n> /g, " ").trim();

    scenes.push({
      number: sceneNumber++,
      timeRange: `${startTime} – ${endTime}`,
      title: title.trim(),
      text: cleanText,
    });
  }

  return scenes;
}

async function generateAudio(scene: Scene, outputDir: string): Promise<string> {
  console.log(`[${scene.number}] Generating TTS for: ${scene.title}`);
  console.log(`    Text: "${scene.text.substring(0, 60)}..."`);

  const mp3Path = join(outputDir, `scene-${scene.number}.mp3`);

  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: scene.text,
      speed: 1.0,
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(mp3Path, buffer);

    // Get duration using ffprobe
    const duration = await getAudioDuration(mp3Path);
    console.log(`    ✓ Saved to ${mp3Path} (${duration.toFixed(2)}s)`);

    return mp3Path;
  } catch (error) {
    console.error(`    ✗ Failed to generate audio for scene ${scene.number}:`, error);
    throw error;
  }
}

async function getAudioDuration(filePath: string): Promise<number> {
  try {
    const result =
      await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${filePath}`.text();
    return parseFloat(result.trim());
  } catch (error) {
    console.warn(`Could not get duration for ${filePath}, using 0`);
    return 0;
  }
}

async function generateTimingsFile(scenes: Scene[], outputDir: string): Promise<void> {
  const timings: Record<string, { duration: number; text: string; title: string }> = {};

  for (const scene of scenes) {
    const mp3Path = join(outputDir, `scene-${scene.number}.mp3`);
    const duration = await getAudioDuration(mp3Path);

    timings[`scene-${scene.number}`] = {
      duration,
      text: scene.text,
      title: scene.title,
    };
  }

  const timingsPath = join(outputDir, "timings.json");
  await writeFile(timingsPath, JSON.stringify(timings, null, 2));
  console.log(`\n✓ Timings saved to ${timingsPath}`);
}

async function concatenateAudio(scenes: Scene[], outputDir: string): Promise<void> {
  console.log("\nConcatenating audio files...");

  // Create a concat list file for ffmpeg
  const concatList = scenes.map((scene) => `file 'scene-${scene.number}.mp3'`).join("\n");

  const concatListPath = join(outputDir, "concat-list.txt");
  await writeFile(concatListPath, concatList);

  const outputPath = join(outputDir, "narration-full.mp3");

  try {
    // Using ffmpeg concat with 0.3s silence between clips
    await $`ffmpeg -f concat -safe 0 -i ${concatListPath} -af "apad=pad_dur=0.3" ${outputPath} -y`.quiet();
    console.log(`✓ Full narration saved to ${outputPath}`);
  } catch (error) {
    console.error("✗ Failed to concatenate audio:", error);
    throw error;
  }
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const scriptPath = join(projectRoot, "script.md");
  const audioOutputDir = join(projectRoot, "out", "audio");

  console.log("=== Phase 1: TTS Audio Generation ===\n");

  // Ensure output directory exists
  await mkdir(audioOutputDir, { recursive: true });

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY environment variable not set");
    console.error("Please set it in .env or .env.local file");
    process.exit(1);
  }

  // Parse script
  const scenes = await parseScript(scriptPath);
  console.log(`Found ${scenes.length} scenes in script.md\n`);

  // Generate audio for each scene
  for (const scene of scenes) {
    await generateAudio(scene, audioOutputDir);
  }

  // Generate timings file
  await generateTimingsFile(scenes, audioOutputDir);

  // Concatenate all audio
  await concatenateAudio(scenes, audioOutputDir);

  console.log("\n=== Phase 1 Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { parseScript, generateAudio, getAudioDuration };
