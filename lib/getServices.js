import fs from "fs";
import path from "path";

export function getServices() {
  const servicesPath = path.join(process.cwd(), "app", "(public)", "services");

  const folders = fs
    .readdirSync(servicesPath, { withFileTypes: true })
    .filter((item) => item.isDirectory());

  return folders.map((folder) => ({
    href: `/services/${folder.name}`,
    label: folder.name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
  }));
}