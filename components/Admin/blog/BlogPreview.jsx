"use client";

import Image from "next/image";
import ArticleContent from "@/components/blog/ArticleContent";
import { estimateReadingTimeMinutes } from "@/lib/content/textFromContent";

export default function BlogPreview({ form }) {
  const readingTime = estimateReadingTimeMinutes(
    form.content,
    form.contentFormat || "html"
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Preview</p>
        <p className="mt-1 text-xs text-slate-500">
          Approximate public article appearance
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {form.category ? (
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {form.category}
          </span>
        ) : null}

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {form.title || "Untitled post"}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          {form.author ? <span>By {form.author}</span> : null}
          <span>{new Date().toLocaleDateString()}</span>
          <span>{readingTime} min read</span>
        </div>

        {form.excerpt ? (
          <p className="mt-4 text-lg leading-8 text-slate-600">{form.excerpt}</p>
        ) : null}

        {form.featuredImage ? (
          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src={form.featuredImage}
              alt={form.featuredImageAlt || form.title || "Featured image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        ) : null}

        <div className="mt-8">
          <ArticleContent
            content={form.content}
            contentFormat={form.contentFormat || "html"}
          />
        </div>

        {form.tags?.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
