import { z } from "zod";

export const pricingPayloadSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().max(1000).optional().default(""),
  price: z.string().min(1, "Price is required").max(50),
  discountPrice: z.string().max(50).optional().default(""),
  currency: z.string().max(10).optional().default("₹"),
  billingPeriod: z.string().max(50).optional().default(""),
  features: z.array(z.string().max(300)).optional().default([]),
  highlighted: z.boolean().optional().default(false),
  badge: z.string().max(100).optional().default(""),
  icon: z.string().max(50).optional().default(""),
  note: z.string().max(500).optional().default(""),
  ctaText: z.string().max(100).optional().default("Get Started"),
  ctaUrl: z.string().max(500).optional().default("/contact"),
  order: z.coerce.number().int().min(0).optional().default(0),
  published: z.boolean().optional().default(true),
});
