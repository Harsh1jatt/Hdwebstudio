import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { getPublishedPostBySlug, getRelatedPublishedPosts } from "@/lib/posts";
import ArticleContent from "@/components/blog/ArticleContent";

import { ArrowRight, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || post.title;

  const ogImage =
    post.ogImage ||
    post.featuredImage ||
    siteConfig.assets.projectPlaceholder;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: siteConfig.name,
      type: "article",
      images: [{ url: absoluteUrl(ogImage) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPublishedPosts(post, { limit: 3 });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt || "",
    author: { "@type": "Person", name: post.author || "Harshdeep" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.assets.logo) },
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    ...(post.featuredImage ? { image: absoluteUrl(post.featuredImage) } : {}),
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                <span>{post.category}</span>
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span>By {post.author}</span>
                {post.publishedAt ? (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                ) : null}
                {post.readingTime ? <span>{post.readingTime} min read</span> : null}
              </div>

              {post.excerpt ? (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/10">
              <Image
                src={post.featuredImage || siteConfig.assets.projectPlaceholder}
                alt={post.featuredImageAlt || post.title}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <article className="text-slate-700">
          <ArticleContent
            content={post.content}
            contentFormat={post.contentFormat}
          />
        </article>
      </section>

      {related.length ? (
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-950">Related posts</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={item.featuredImage || siteConfig.assets.projectPlaceholder}
                      alt={item.featuredImageAlt || item.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-700">
                      Read more <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 p-10 text-white shadow-xl sm:p-14">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Need help turning ideas into a real website?
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
              Tell us what you&apos;re building — we&apos;ll help you choose the right approach.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-blue-700 transition hover:bg-slate-100"
            >
              Book a Free Consultation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

