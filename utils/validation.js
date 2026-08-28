import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(150).optional().or(z.literal('')),
  phone: z.string().trim().min(6, 'Phone is too short').max(30, 'Phone is too long'),
  business: z.string().trim().max(150).optional().or(z.literal('')),
  website: z.string().trim().max(255).optional().or(z.literal('')),
  service: z.string().trim().max(100).optional().or(z.literal('')),
  budget: z.string().trim().max(100).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Message is too short').max(5000, 'Message is too long'),
  honeypot: z.string().optional().or(z.literal('')),
  source: z.string().trim().max(50).optional().or(z.literal('')),
});
// ContactInput type intentionally omitted for JS runtime
