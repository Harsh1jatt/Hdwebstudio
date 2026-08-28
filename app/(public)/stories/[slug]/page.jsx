import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getPublishedStoryBySlug, getRelatedStories, getAllPublishedStorySlugs } from "@/lib/stories";
import { absoluteUrl, siteConfig } from "@/config/site";
import StoryViewer from "./StoryViewer";

export async function generateStaticParams() {
  const slugs = await getAllPublishedStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getPublishedStoryBySlug(slug);
  if (!story) return {};

  const rawTitle = story.seoTitle || `${story.title} | Web Story`;
  const title = {
    absolute: rawTitle.includes("HD Web Studios")
      ? rawTitle
      : `${rawTitle} | HD Web Studios`,
  };
  const description = story.seoDescription || story.description || story.title;

  return {
    title,
    description,
    alternates: { canonical: story.canonicalUrl || absoluteUrl(`/stories/${story.slug}`) },
    robots: story.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      images: [story.ogImage || story.posterImage].filter(Boolean).map((img) => ({ url: absoluteUrl(img) })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [story.ogImage || story.posterImage].filter(Boolean).map((img) => absoluteUrl(img)),
    },
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = await getPublishedStoryBySlug(slug);
  if (!story) notFound();

  const related = await getRelatedStories(story, { limit: 4 });

  const storyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.description || "",
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.assets?.logo || "/logo.svg") },
    },
    datePublished: story.publishedAt || story.createdAt,
    dateModified: story.updatedAt,
    mainEntityOfPage: absoluteUrl(`/stories/${story.slug}`),
    ...(story.posterImage ? { image: absoluteUrl(story.posterImage) } : {}),
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }} />

      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-6">
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600">
            <ArrowLeft size={16} /> All Stories
          </Link>
          <div className="mt-6">
            {story.category && (
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">{story.category}</span>
            )}
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{story.title}</h1>
            {story.description && <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{story.description}</p>}
            <p className="mt-3 text-sm text-slate-500">
              By {story.publisher}
              {story.publishedAt && <> · {new Date(story.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</>}
            </p>
          </div>
        </div>
      </section>

      {/* Story Viewer */}
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6">
        <StoryViewer slides={story.slides} storyTitle={story.title} />
      </section>

      {/* Share & CTA */}
      <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slate-950">Need help with your website?</h2>
          <p className="mt-3 text-slate-600">We build professional websites and digital solutions for businesses across India.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-600">
              Get a Free Audit <ArrowRight size={16} />
            </Link>
            <Link href="/stories" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600">
              More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-950">Related Stories</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/stories/${item.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[9/16] overflow-hidden bg-slate-100">
                    {item.posterImage ? (
                      <Image src={item.posterImage} alt={item.posterImageAlt || item.title} fill className="object-cover" sizes="25vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                        <p className="text-center text-xs font-semibold text-white">{item.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
