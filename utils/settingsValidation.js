import { z } from "zod";

const optStr = z.string().max(500).optional();

export const settingsPayloadSchema = z.object({
  brand: z.object({
    name: optStr,
    shortName: optStr,
    tagline: optStr,
    logo: optStr,
    favicon: optStr,
  }).optional(),
  contact: z.object({
    email: optStr,
    phone: optStr,
    whatsapp: optStr,
    address: optStr,
    city: optStr,
    state: optStr,
    country: optStr,
    pincode: optStr,
  }).optional(),
  social: z.object({
    facebook: optStr,
    instagram: optStr,
    linkedin: optStr,
    twitter: optStr,
    github: optStr,
    youtube: optStr,
  }).optional(),
  seo: z.object({
    defaultTitle: optStr,
    defaultDescription: z.string().max(1000).optional(),
    defaultKeywords: z.string().max(1000).optional(),
    defaultOgImage: optStr,
    favicon: optStr,
  }).optional(),
  business: z.object({
    businessHours: optStr,
    foundedYear: optStr,
    serviceArea: optStr,
  }).optional(),
  analytics: z.object({
    googleAnalyticsId: optStr,
  }).optional(),
  brandVoice: z.object({
    tone: optStr,
    positioning: z.string().max(1000).optional(),
    targetAudience: z.string().max(1000).optional(),
    coreLocations: z.array(z.string().max(100)).optional(),
    preferredTerminology: z.array(z.string().max(100)).optional(),
    forbiddenClaims: z.array(z.string().max(200)).optional(),
    writingStyle: optStr,
    aiAutoPublish: z.boolean().optional(),
  }).optional(),
  footer: z.object({
    footerText: z.string().max(2000).optional(),
    copyrightText: z.string().max(500).optional(),
  }).optional(),
  homepage: z.object({
    hero: z.object({
      heading1: optStr,
      heading2: optStr,
      description: z.string().max(1000).optional(),
      ctaText: optStr,
      ctaLink: optStr,
      secondaryText: optStr,
      secondaryLink: optStr,
    }).optional(),
  }).optional(),
  servicePage: z.object({
    techStack: z.array(z.object({
      name: z.string().max(100),
      icon: z.string().max(50).optional(),
    })).optional(),
    process: z.array(z.object({
      icon: z.string().max(50).optional(),
      title: z.string().max(100),
      text: z.string().max(500),
    })).optional(),
    whyChooseUs: z.array(z.object({
      icon: z.string().max(50).optional(),
      title: z.string().max(200),
      text: z.string().max(500),
    })).optional(),
    industries: z.array(z.object({
      icon: z.string().max(50).optional(),
      name: z.string().max(100),
    })).optional(),
    trustStats: z.array(z.object({
      icon: z.string().max(50).optional(),
      value: z.number().optional(),
      suffix: z.string().max(10).optional(),
      label: z.string().max(100),
    })).optional(),
  }).optional(),
});
