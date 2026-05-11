import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const slidesDir = path.join(rootDir, "slides");
const publicDir = path.join(rootDir, "public");
const themePath = path.join(rootDir, "themes", "presentations.css");
const marpBin = path.join(
  rootDir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "marp.cmd" : "marp",
);

const deckDirPattern = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/;

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

const deckDirs = await findDeckDirectories();
const decks = [];

for (const entry of deckDirs) {
  const match = entry.name.match(deckDirPattern);

  if (!match) {
    continue;
  }

  const [, date, shortName] = match;
  const sourceDir = path.join(slidesDir, entry.name);
  const deckPath = path.join(sourceDir, "deck.md");
  const outputDir = path.join(publicDir, date, shortName);
  const outputPath = path.join(outputDir, "index.html");

  await ensureFile(deckPath);
  await mkdir(outputDir, { recursive: true });

  const assetsDir = path.join(sourceDir, "assets");
  if (await pathExists(assetsDir)) {
    await cp(assetsDir, path.join(outputDir, "assets"), { recursive: true });
  }

  await runMarp(deckPath, outputPath);

  const markdown = await readFile(deckPath, "utf8");
  decks.push({
    date,
    shortName,
    title: readTitle(markdown, shortName),
    href: `${date}/${shortName}/`,
  });
}

decks.sort((left, right) => {
  const byDate = right.date.localeCompare(left.date);
  if (byDate !== 0) {
    return byDate;
  }

  return left.shortName.localeCompare(right.shortName);
});

await writeFile(path.join(publicDir, "index.html"), renderIndex(decks));
await writeFile(path.join(publicDir, ".nojekyll"), "");

console.log(`Built ${decks.length} presentation${decks.length === 1 ? "" : "s"}.`);

async function findDeckDirectories() {
  if (!(await pathExists(slidesDir))) {
    return [];
  }

  return readdir(slidesDir, { withFileTypes: true });
}

async function ensureFile(filePath) {
  let fileStats;

  try {
    fileStats = await stat(filePath);
  } catch {
    throw new Error(`Missing required file: ${path.relative(rootDir, filePath)}`);
  }

  if (!fileStats.isFile()) {
    throw new Error(`Expected a file: ${path.relative(rootDir, filePath)}`);
  }
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function runMarp(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      marpBin,
      [
        "--html",
        "--allow-local-files",
        "--theme-set",
        themePath,
        "--output",
        outputPath,
        inputPath,
      ],
      {
        cwd: rootDir,
        stdio: "inherit",
      },
    );

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Marp exited with code ${code}.`));
    });
  });
}

function readTitle(markdown, fallback) {
  const frontMatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);

  if (frontMatterMatch) {
    const titleLine = frontMatterMatch[1]
      .split("\n")
      .find((line) => line.trim().startsWith("title:"));

    if (titleLine) {
      return titleLine.replace(/^title:\s*/, "").trim().replace(/^["']|["']$/g, "");
    }
  }

  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return fallback;
}

function renderIndex(decks) {
  const items = decks.length
    ? decks
        .map(
          (deck) => `<li><a href="${deck.href}">${escapeHtml(deck.title)}</a><span>${deck.date} / ${escapeHtml(deck.shortName)}</span></li>`,
        )
        .join("")
    : "<li><span>No presentations yet.</span><span>Run <code>npm run new -- YYYY-MM-DD short-name</code></span></li>";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>presentations</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #f9fafb;
        color: #111827;
      }
      main {
        max-width: 860px;
        margin: 0 auto;
        padding: 48px 24px 64px;
      }
      h1 {
        margin: 0 0 12px;
      }
      p {
        color: #4b5563;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 32px 0 0;
      }
      li {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 18px;
        margin-bottom: 12px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
      }
      a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }
      a:hover {
        text-decoration: underline;
      }
      span {
        color: #6b7280;
      }
      code {
        background: #f3f4f6;
        border-radius: 6px;
        padding: 2px 6px;
      }
      @media (max-width: 640px) {
        li {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>presentations</h1>
      <p>Static decks published at <code>/YYYY-MM-DD/short-name/</code>.</p>
      <ul>${items}</ul>
    </main>
  </body>
</html>`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
