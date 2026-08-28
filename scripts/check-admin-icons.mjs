import fs from "fs";
import path from "path";

function findFiles(dir, exts = [".jsx", ".js"]) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(findFiles(full, exts));
    } else if (exts.some(ext => item.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

const adminFiles = [
  ...findFiles("./components/Admin"),
  ...findFiles("./app/admin"),
];

console.log(`Scanning ${adminFiles.length} admin files for missing icon imports...`);

let issuesFound = 0;

for (const file of adminFiles) {
  const content = fs.readFileSync(file, "utf8");
  
  // Extract lucide-react imports
  const lucideMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
  const importedIcons = new Set();
  if (lucideMatch) {
    lucideMatch[1].split(",").forEach(i => importedIcons.add(i.trim()));
  }

  // Find all JSX tags starting with Uppercase: <IconName ...
  const tagMatches = content.matchAll(/<([A-Z][a-zA-Z0-9]+)[\s/>]/g);
  for (const match of tagMatches) {
    const tagName = match[1];
    // Known Lucide icons commonly used:
    const commonLucideIcons = [
      "Sparkles", "Plus", "Trash2", "Pencil", "ExternalLink", "Search", "Bot", "Loader2", 
      "CheckCircle2", "AlertCircle", "AlertTriangle", "FileText", "Briefcase", "BookOpen",
      "Play", "Settings", "ChevronDown", "ChevronUp", "ChevronRight", "ChevronLeft",
      "RefreshCw", "Layers", "Home", "Mail", "Phone", "Users", "DollarSign", "ImageIcon",
      "BarChart3", "HelpCircle", "LogOut", "PanelLeft", "PanelLeftClose", "Activity", "Clock",
      "ArrowUpRight", "ArrowRight", "ArrowLeft", "Copy", "Eye", "Send", "Check", "X"
    ];

    if (commonLucideIcons.includes(tagName) && !importedIcons.has(tagName)) {
      // Check if it's imported from another local component or defined locally
      const localImport = content.match(new RegExp(`import\\s+.*\\b${tagName}\\b.*from`));
      const localDef = content.match(new RegExp(`function\\s+${tagName}\\b|const\\s+${tagName}\\b`));
      if (!localImport && !localDef) {
        console.error(`❌ MISSING IMPORT in ${file}: <${tagName} /> used but not imported from lucide-react!`);
        issuesFound++;
      }
    }
  }
}

if (issuesFound === 0) {
  console.log("✅ No missing Lucide imports detected in admin files.");
} else {
  console.log(`Found ${issuesFound} missing import issue(s).`);
}
