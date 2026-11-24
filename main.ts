import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny single-line excuse a developer gives when code breaks in
// production. One scene, one twist: the "fix" was the only thing
// holding production together. Said the way a dev says it mid-incident:
// "prod", not "production".
const LINE =
  "Prod is down because the bug I fixed last week was load-bearing.";

const length = [...LINE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and fail hard if the file is not byte-for-byte the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`wrote entry.txt (${length} characters)`);
