import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const templateDir = path.join(rootDir, "slides", "_template");
const slidesDir = path.join(rootDir, "slides");

const [date, shortName] = process.argv.slice(2);

if (!date || !shortName) {
  console.error("Usage: npm run new -- YYYY-MM-DD short-name");
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("Date must use YYYY-MM-DD.");
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(shortName)) {
  console.error("Short name must use lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

const deckDirName = `${date}-${shortName}`;
const targetDir = path.join(slidesDir, deckDirName);

try {
  await mkdir(targetDir);
} catch (error) {
  if (error && error.code === "EEXIST") {
    console.error(`Presentation already exists: slides/${deckDirName}`);
    process.exit(1);
  }

  throw error;
}

await cp(templateDir, targetDir, { recursive: true });

const deckPath = path.join(targetDir, "deck.md");
const template = await readFile(deckPath, "utf8");
const title = shortName
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(" ");

const updated = template
  .replaceAll("{{TITLE}}", title)
  .replaceAll("{{DATE}}", date)
  .replaceAll("{{SHORT_NAME}}", shortName);

await writeFile(deckPath, updated);

console.log(`Created slides/${deckDirName}`);
