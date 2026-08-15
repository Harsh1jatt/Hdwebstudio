import { z } from "zod";

export const testimonialPayloadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().max(100).optional().default(""),
  company: z.string().max(100).optional().default(""),
  content: z.string().min(1, "Content is required").max(2000),
  rating: z.coerce.number().min(1).max(5).optional().default(5),
  image: z.string().max(500).optional().default(""),
  imageAlt: z.string().max(200).optional().default(""),
  location: z.string().max(100).optional().default(""),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  order: z.coerce.number().int().min(0).optional().default(0),
});
