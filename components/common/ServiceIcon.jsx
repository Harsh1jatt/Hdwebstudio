"use client";

import { resolveIcon } from "@/lib/icons";

/**
 * Renders a Lucide icon from a string name stored in service/CMS data.
 */
export default function ServiceIcon({
  name,
  className = "",
  size = 16,
  strokeWidth = 2,
}) {
  const Icon = resolveIcon(name);

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
