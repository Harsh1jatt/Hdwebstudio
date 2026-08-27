import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens");

const optionalString = (min = 0) =>
  z.string().trim().optional().or(z.literal("")).refine((v) => v === undefined || v.length >= min);

const siteRelativePathOrEmpty = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => value === "" || value.startsWith("/") || value.startsWith("http"),
    "Image must be a valid URL or a site-relative path starting with /"
  );

const contentSchema = z.string().trim().min(1, "Content is required");

export const postPayloadSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: slugSchema,
  excerpt: optionalString(0).default(""),
  content: contentSchema,
  contentFormat: z.enum(["html", "markdown"]).optional().default("html"),
  focusKeyword: optionalString(0).default(""),
  secondaryKeywords: z.array(z.string().trim().min(1)).optional().default([]),
  featuredImage: siteRelativePathOrEmpty.default(""),
  featuredImageAlt: optionalString(0).default(""),
  category: z.string().trim().min(1, "Category is required"),
  tags: z.array(z.string().trim().min(1)).default([]),
  author: z.string().trim().min(1, "Author is required"),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.coerce.date().optional().nullable(),
  readingTime: z.coerce.number().int().min(0).optional().default(0),
  seoTitle: optionalString(0).default(""),
  seoDescription: optionalString(0).default(""),
  ogImage: siteRelativePathOrEmpty.default(""),
});

export const postPatchSchema = postPayloadSchema.partial().extend({
  slug: slugSchema.optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  status: z.enum(["draft", "published"]).optional(),
});

export function parsePostPayload(body) {
  return postPayloadSchema.safeParse(body);
}

export function parsePostPatchPayload(body) {
  return postPatchSchema.safeParse(body);
}

