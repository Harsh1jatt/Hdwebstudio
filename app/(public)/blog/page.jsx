import Link from "next/link";
import Image from "next/image";

import { getFeaturedAndLatestPublishedPosts, getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/config/site";

import { ArrowRight } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "";
  const title = category
    ? `${category} Articles | HD Web Studios Blog`
    : "Blog | HD Web Studios";
  const description = category
    ? `Read our latest articles about ${category.toLowerCase()} for businesses.`
    : "Practical articles on web development, SEO, and digital growth for businesses.";

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(category ? `/blog?category=${encodeURIComponent(category)}` : "/blog"),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/blog"),
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function BlogListingPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const category = params?.category || "";
  const perPage = 6;

  const { featured } = await getFeaturedAndLatestPublishedPosts();
  const latest = await getPublishedPosts({ page, perPage, category: category || undefined });

  const featuredSlugs = new Set((featured || []).map((p) => p.slug));
  const latestFiltered = latest.filter((p) => !featuredSlugs.has(p.slug));

  const hasNextPage = latest.length === perPage;

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Blog</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Insights on SEO, design, and web engineering
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Practical articles that help you build faster, clearer experiences — and improve conversions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
              !category ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            All
          </Link>
          {["Web Development", "SEO", "Digital Growth", "Design", "Business"].map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === cat ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {featured?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-950">Featured posts</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.featuredImage || siteConfig.assets.projectPlaceholder}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{post.category}</p>
                  <h3 className="mt-3 text-lg font-bold text-slate-950">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span>By {post.author}</span>
                    <span>{post.readingTime ? `${post.readingTime} min read` : ""}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-950">{page === 1 ? "Latest posts" : "More posts"}</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestFiltered.length ? (
            latestFiltered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.featuredImage || siteConfig.assets.projectPlaceholder}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{post.category}</p>
                  <h3 className="mt-3 text-lg font-bold text-slate-950">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span>By {post.author}</span>
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Read more <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center md:col-span-2 lg:col-span-3">
              <p className="text-sm font-semibold text-slate-900">No posts found.</p>
              <p className="mt-1 text-sm text-slate-500">Try creating a post in the admin dashboard.</p>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {page > 1 ? (
              <Link
                href={`/blog?page=${page - 1}`}
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Previous
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-400">
                Previous
              </span>
            )}
          </div>

          {hasNextPage ? (
            <Link
              href={`/blog?page=${page + 1}`}
              className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Next <ArrowRight size={16} />
            </Link>
          ) : (
            <span className="inline-flex items-center rounded-xl bg-slate-950/50 px-5 py-3 text-sm font-semibold text-white/60">
              Next
            </span>
          )}
        </div>
      </section>
    </div>
  );
}

