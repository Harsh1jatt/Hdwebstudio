import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

import { getPublishedStories } from "@/lib/stories";
import { siteConfig, absoluteUrl } from "@/config/site";

export const metadata = {
  title: { absolute: "Web Stories & Visual Guides | HD Web Studios" },
  description: "Visual stories and guides about web development, Local SEO, and digital growth in Punjab.",
  alternates: { canonical: absoluteUrl("/stories") },
  openGraph: {
    title: "Web Stories & Visual Guides | HD Web Studios",
    description: "Visual guides on web development, SEO, and digital growth.",
    url: absoluteUrl("/stories"),
    type: "website",
  },
};

export default async function StoriesPage() {
  const stories = await getPublishedStories({ page: 1, perPage: 24 });

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900">Stories</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Web Stories</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Quick visual guides on web development, SEO, and digital growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        {stories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-slate-100">
                  {story.posterImage ? (
                    <Image
                      src={story.posterImage}
                      alt={story.posterImageAlt || story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
                      <p className="text-center text-sm font-semibold text-white">{story.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-semibold text-white/80">{story.category || "Story"}</p>
                    <p className="mt-1 text-sm font-bold text-white line-clamp-2">{story.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600 line-clamp-2">{story.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    View story <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <BookOpen className="h-6 w-6 text-slate-400" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">No stories published yet</h2>
            <p className="mt-2 text-sm text-slate-500">Check back soon for visual guides on web development and digital growth.</p>
          </div>
        )}
      </section>
    </div>
  );
}
