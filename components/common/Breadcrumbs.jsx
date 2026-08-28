import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";

/**
 * Reusable Breadcrumbs Component
 * Renders both accessible HTML breadcrumb navigation and matching BreadcrumbList JSON-LD.
 *
 * @param {Array<{ label: string, href?: string }>} items - Breadcrumb items list
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  const fullItems = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/#breadcrumb`,
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? absoluteUrl(item.href) : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center text-xs text-slate-500 font-medium py-3 overflow-x-auto"
      >
        <ol className="flex items-center gap-1.5 whitespace-nowrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.label + index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight size={12} className="text-slate-400 shrink-0" aria-hidden="true" />
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-[320px]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {isFirst && <Home size={12} className="shrink-0" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
