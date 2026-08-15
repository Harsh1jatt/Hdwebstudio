import { z } from "zod";

const highlightSchema = z.object({
  icon: z.string().min(1).default("Circle"),
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
});

const iconTextSchema = z.object({
  icon: z.string().min(1).default("Circle"),
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
});

const heroStatSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const faqSchema = z.object({
  q: z.string().min(1, "Question is required"),
  a: z.string().min(1, "Answer is required"),
});

export const servicePayloadSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  icon: z.string().min(1, "Icon is required"),
  eyebrow: z.string().min(1, "Eyebrow is required"),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  shortDescription: z.string().optional().or(z.literal("")),
  description: z.string().min(1, "Description is required"),
  category: z.string().optional().or(z.literal("")),
  accent: z.enum(["blue", "emerald", "purple", "orange"]).default("blue"),
  order: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
  heroStats: z.array(heroStatSchema).default([]),
  overview: z.object({
    heading: z.string().min(1, "Overview heading is required"),
    paragraphs: z.array(z.string().min(1)).default([]),
    highlights: z.array(highlightSchema).default([]),
  }),
  whatYouGet: z.array(iconTextSchema).default([]),
  faq: z.array(faqSchema).default([]),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  ogImage: z.string().optional().or(z.literal("")),
});

export function parseServicePayload(body) {
  return servicePayloadSchema.safeParse(body);
}
