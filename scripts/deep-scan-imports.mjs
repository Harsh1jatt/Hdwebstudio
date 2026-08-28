import fs from "fs";
import path from "path";
import * as lucideIcons from "lucide-react";

const allLucideIcons = new Set(Object.keys(lucideIcons));

function findFiles(dir, exts = [".jsx", ".js", ".mjs"]) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === "node_modules" || item.name === ".next" || item.name === ".git") continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(findFiles(full, exts));
    } else if (exts.some((ext) => item.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

const targetDirs = ["./app", "./components", "./config", "./lib", "./models", "./utils"];
let allFiles = [];
targetDirs.forEach((d) => (allFiles = allFiles.concat(findFiles(d))));

console.log(`\n=======================================================`);
console.log(`  PRECISE SCANNING ${allFiles.length} CODE FILES FOR MISSING ICONS  `);
console.log(`=======================================================\n`);

let missingCount = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");

  // Collect imported identifiers from lucide-react (including aliases: import { X as Y })
  const importedLucide = new Set();
  const lucideMatches = content.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/g);
  for (const match of lucideMatches) {
    match[1].split(",").forEach((item) => {
      const parts = item.trim().split(/\s+as\s+/);
      importedLucide.add(parts[parts.length - 1].trim());
    });
  }

  // 1. Check JSX component usages: <IconName ... or <IconName />
  const jsxMatches = content.matchAll(/<([A-Z][a-zA-Z0-9]+)[\s/>]/g);
  for (const match of jsxMatches) {
    const tagName = match[1];
    if (allLucideIcons.has(tagName)) {
      if (importedLucide.has(tagName)) continue;

      // Check if imported from anywhere else or defined in file
      const isImportedElsewhere = new RegExp(`import\\s+.*\\b${tagName}\\b.*from`).test(content);
      const isLocallyDefined = new RegExp(`(function|const|class|let|var)\\s+${tagName}\\b`).test(content);
      const isParam = new RegExp(`\\(\\s*\\{[^}]*\\b${tagName}\\b[^}]*\\}\\s*\\)`).test(content);

      if (!isImportedElsewhere && !isLocallyDefined && !isParam) {
        console.error(`❌ MISSING JSX ICON in ${file}: <${tagName} /> used but not imported!`);
        missingCount++;
      }
    }
  }

  // 2. Check icon object properties: icon: IconName, or Icon: IconName
  const propMatches = content.matchAll(/\b(?:icon|Icon)\s*:\s*([A-Z][a-zA-Z0-9]+)\b/g);
  for (const match of propMatches) {
    const iconName = match[1];
    if (iconName === "Icon") continue;
    if (allLucideIcons.has(iconName)) {
      if (importedLucide.has(iconName)) continue;

      const isImportedElsewhere = new RegExp(`import\\s+.*\\b${iconName}\\b.*from`).test(content);
      const isLocallyDefined = new RegExp(`(function|const|class|let|var)\\s+${iconName}\\b`).test(content);

      if (!isImportedElsewhere && !isLocallyDefined) {
        console.error(`❌ MISSING ICON PROPERTY in ${file}: icon: ${iconName} used but not imported!`);
        missingCount++;
      }
    }
  }
}

console.log(`\nScan complete. Missing icon imports: ${missingCount}\n`);
if (missingCount > 0) process.exit(1);
