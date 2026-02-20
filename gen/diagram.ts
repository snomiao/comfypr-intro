#!/usr/bin/env bun
/**
 * Phase 2a: Diagram Generation
 *
 * Renders architecture-diagram.md Mermaid block to PNG
 * using @mermaid-js/mermaid-cli (mmdc)
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { $ } from "bun";

async function extractMermaidDiagram(mdPath: string): Promise<string> {
  const content = await readFile(mdPath, "utf-8");

  // Extract Mermaid code block
  const mermaidMatch = content.match(/```mermaid\n([\s\S]+?)\n```/);

  if (!mermaidMatch) {
    throw new Error("No Mermaid diagram found in architecture-diagram.md");
  }

  return mermaidMatch[1];
}

async function renderMermaidDiagram(mermaidCode: string, outputPath: string): Promise<void> {
  console.log("Rendering Mermaid diagram...");

  // Create a temporary .mmd file
  const tempMmdPath = join(import.meta.dir, "temp-diagram.mmd");
  await writeFile(tempMmdPath, mermaidCode);

  try {
    // Render using mmdc with dark theme and custom config
    const configPath = join(import.meta.dir, "mermaid-config.json");

    // Create mermaid config
    const config = {
      theme: "dark",
      themeVariables: {
        primaryColor: "#ff9900",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#ff9900",
        lineColor: "#666666",
        secondaryColor: "#1a1a2e",
        tertiaryColor: "#0d1117",
        background: "#0d1117",
        mainBkg: "#1a1a2e",
        textColor: "#ffffff",
        fontSize: "18px",
      },
      flowchart: {
        curve: "basis",
        padding: 20,
      },
    };

    await writeFile(configPath, JSON.stringify(config, null, 2));

    // Run mmdc
    await $`bunx mmdc -i ${tempMmdPath} -o ${outputPath} -c ${configPath} -w 1920 -H 1080 -b transparent`.quiet();

    console.log(`✓ Diagram rendered to ${outputPath}`);
  } catch (error) {
    console.error("✗ Failed to render Mermaid diagram:", error);
    throw error;
  }
}

async function main() {
  const projectRoot = join(import.meta.dir, "..");
  const diagramMdPath = join(projectRoot, "architecture-diagram.md");
  const assetsOutputDir = join(projectRoot, "out", "assets");
  const outputPath = join(assetsOutputDir, "arch-diagram.png");

  console.log("=== Phase 2a: Diagram Generation ===\n");

  // Ensure output directory exists
  await mkdir(assetsOutputDir, { recursive: true });

  // Extract Mermaid code
  const mermaidCode = await extractMermaidDiagram(diagramMdPath);
  console.log(`Extracted Mermaid diagram (${mermaidCode.length} chars)`);

  // Render diagram
  await renderMermaidDiagram(mermaidCode, outputPath);

  console.log("\n=== Phase 2a Complete ===");
}

// Run if executed directly
if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { extractMermaidDiagram, renderMermaidDiagram };
