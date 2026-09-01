import { z } from "zod";

export const pricingPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name is too long"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid slug format"
    ),

  description: z
    .string()
    .max(1000, "Description is too long")
    .optional()
    .default(""),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  discountPrice: z
    .union([
      z.coerce.number().min(0, "Discount price cannot be negative"),
      z.literal(""),
      z.undefined(),
      z.null(),
    ])
    .optional()
    .transform((value) => {
      if (
        value === "" ||
        value === undefined ||
        value === null
      ) {
        return undefined;
      }

      return value;
    }),

  currency: z
    .string()
    .trim()
    .max(10, "Currency is too long")
    .optional()
    .default("₹"),

  billingPeriod: z
    .enum([
      "one-time",
      "monthly",
      "yearly",
      "per-project",
    ])
    .default("one-time"),

  features: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Feature cannot be empty")
        .max(300, "Feature is too long")
    )
    .default([]),

  highlighted: z
    .boolean()
    .default(false),

  badge: z
    .string()
    .trim()
    .max(100, "Badge is too long")
    .optional()
    .default(""),

  icon: z
    .string()
    .trim()
    .max(50, "Icon name is too long")
    .optional()
    .default(""),

  note: z
    .string()
    .trim()
    .max(500, "Note is too long")
    .optional()
    .default(""),

  ctaText: z
    .string()
    .trim()
    .max(100, "CTA text is too long")
    .optional()
    .default("Get Started"),

  ctaUrl: z
    .string()
    .trim()
    .max(500, "CTA URL is too long")
    .optional()
    .default("/contact"),

  order: z.coerce
    .number()
    .int()
    .min(0, "Order cannot be negative")
    .default(0),

  published: z
    .boolean()
    .default(true),
});