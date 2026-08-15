import { z } from "zod";

export const teamMemberPayloadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(200),
  bio: z.string().max(2000).optional().default(""),
  image: z.string().max(500).optional().default(""),
  imageAlt: z.string().max(200).optional().default(""),
  email: z.string().max(200).optional().default(""),
  linkedin: z.string().max(500).optional().default(""),
  github: z.string().max(500).optional().default(""),
  order: z.coerce.number().int().min(0).optional().default(0),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});
