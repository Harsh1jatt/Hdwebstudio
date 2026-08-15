import { z } from "zod";

export const faqPayloadSchema = z.object({
  question: z.string().min(1, "Question is required").max(500),
  answer: z.string().min(1, "Answer is required").max(5000),
  category: z.string().max(100).optional().default("General"),
  published: z.boolean().optional().default(true),
  order: z.coerce.number().int().min(0).optional().default(0),
  featured: z.boolean().optional().default(false),
});
