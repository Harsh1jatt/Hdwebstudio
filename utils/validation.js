import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone is too short'),
  business: z.string().optional().or(z.literal('')),
  message: z.string().min(6, 'Message is too short'),
  honeypot: z.string().optional().or(z.literal('')),
});
// ContactInput type intentionally omitted for JS runtime
