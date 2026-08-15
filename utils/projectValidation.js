import { z } from "zod";

const optionalUrlOrPath = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" || value.startsWith("/") || /^https?:\/\/[^\s]+$/i.test(value),
    "Must be a valid http(s) URL or site-relative path"
  );

const stringListSchema = z.array(z.string().trim().min(1)).default([]);

const testimonialSchema = z
  .object({
    quote: z.string().trim().optional().or(z.literal("")),
    author: z.string().trim().optional().or(z.literal("")),
    role: z.string().trim().optional().or(z.literal("")),
  })
  .default({});

export const projectPayloadSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  title: z.string().trim().min(1, "Title is required"),
  shortDescription: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  client: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  projectType: z.string().trim().optional().or(z.literal("")),
  year: z.string().trim().optional().or(z.literal("")),
  challenge: z.string().trim().optional().or(z.literal("")),
  solution: z.string().trim().optional().or(z.literal("")),
  results: stringListSchema,
  features: stringListSchema,
  technologies: stringListSchema,
  services: stringListSchema,
  featuredImage: optionalUrlOrPath.optional().or(z.literal("")),
  thumbnail: optionalUrlOrPath.optional().or(z.literal("")),
  gallery: z.array(optionalUrlOrPath).default([]),
  demoUrl: optionalUrlOrPath.optional().or(z.literal("")),
  liveUrl: optionalUrlOrPath.optional().or(z.literal("")),
  githubUrl: optionalUrlOrPath.optional().or(z.literal("")),
  caseStudyUrl: optionalUrlOrPath.optional().or(z.literal("")),
  testimonial: testimonialSchema,
  seoTitle: z.string().trim().optional().or(z.literal("")),
  seoDescription: z.string().trim().optional().or(z.literal("")),
  ogImage: optionalUrlOrPath.optional().or(z.literal("")),
  published: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
  featured: z.boolean().default(false),
});

export function parseProjectPayload(body) {
  return projectPayloadSchema.safeParse(body);
}
