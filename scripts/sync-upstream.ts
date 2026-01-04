#!/usr/bin/env bun
import { mkdir, writeFile, rm, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const UPSTREAM_REPO = "VoltAgent/awesome-claude-code-subagents";
const UPSTREAM_BRANCH = "main";
const CONTENT_PATH = "categories";
const LOCAL_CONTENT_PATH = "./content";
const TEMP_DIR = "/tmp/upstream-sync";

function getLatestCommit(): string {
  const sha = execSync(`git -C "${TEMP_DIR}/repo" rev-parse HEAD`, {
    encoding: "utf-8",
  }).trim();
  return sha;
}

async function cloneRepo(): Promise<string> {
  if (existsSync(TEMP_DIR)) {
    await rm(TEMP_DIR, { recursive: true });
  }
  await mkdir(TEMP_DIR, { recursive: true });

  const repoUrl = `https://github.com/${UPSTREAM_REPO}.git`;
  const repoPath = join(TEMP_DIR, "repo");

  execSync(
    `git clone --depth 1 --branch ${UPSTREAM_BRANCH} --filter=blob:none --sparse "${repoUrl}" "${repoPath}"`,
    { stdio: "pipe" },
  );

  execSync(`git -C "${repoPath}" sparse-checkout set ${CONTENT_PATH}`, {
    stdio: "pipe",
  });

  return join(repoPath, CONTENT_PATH);
}

async function copyDirectory(src: string, dest: string): Promise<number> {
  let count = 0;

  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      count += await copyDirectory(srcPath, destPath);
    } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      if (!existsSync(destPath)) {
        const content = await readFile(srcPath, "utf-8");
        await writeFile(destPath, content);
        count++;
      }
    }
  }

  return count;
}

async function syncContent(): Promise<void> {
  const extractedPath = await cloneRepo();
  const commitSha = getLatestCommit();

  // Create content directory if it doesn't exist (don't delete existing)
  await mkdir(LOCAL_CONTENT_PATH, { recursive: true });

  await copyDirectory(extractedPath, LOCAL_CONTENT_PATH);
  await writeFile(".upstream-commit", commitSha);
  await rm(TEMP_DIR, { recursive: true });

  execSync("bun format", { stdio: "pipe" });
}

syncContent().catch(() => {
  process.exit(1);
});
