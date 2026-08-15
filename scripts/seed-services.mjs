/**
 * Seed services from lib/services-data.js into MongoDB.
 *
 * Usage:
 *   npm run seed:services
 *   node --env-file=.env.local scripts/seed-services.mjs
 *
 * Safe to run multiple times — upserts by slug.
 */

import mongoose from "mongoose";
import {
  serviceList,
  serviceAccentBySlug,
} from "../lib/services-data.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI is not set. Use: npm run seed:services"
  );
  process.exit(1);
}

const HighlightSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    text: String,
  },
  { _id: false }
);

const OverviewSchema = new mongoose.Schema(
  {
    heading: String,
    paragraphs: [String],
    highlights: [HighlightSchema],
  },
  { _id: false }
);

const IconTextItemSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    text: String,
  },
  { _id: false }
);

const HeroStatSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
  },
  { _id: false }
);

const FaqSchema = new mongoose.Schema(
  {
    q: String,
    a: String,
  },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    icon: String,
    eyebrow: String,
    title: String,
    tagline: String,
    shortDescription: String,
    description: String,
    category: String,
    accent: String,
    order: Number,
    published: Boolean,
    heroStats: [HeroStatSchema],
    overview: OverviewSchema,
    whatYouGet: [IconTextItemSchema],
    faq: [FaqSchema],
    seoTitle: String,
    seoDescription: String,
    ogImage: String,
  },
  { timestamps: true }
);

const Service =
  mongoose.models?.Service || mongoose.model("Service", ServiceSchema);

function buildSeedDoc(service, index) {
  return {
    slug: service.slug,
    icon: service.icon,
    eyebrow: service.eyebrow,
    title: service.title,
    tagline: service.tagline,
    shortDescription: service.description?.slice(0, 160) || "",
    description: service.description,
    category: service.eyebrow,
    accent: serviceAccentBySlug[service.slug] || "blue",
    order: index,
    published: true,
    heroStats: service.heroStats || [],
    overview: service.overview,
    whatYouGet: service.whatYouGet || [],
    faq: service.faq || [],
    seoTitle: `${service.eyebrow} | HD Web Studios`,
    seoDescription: service.description,
    ogImage: "",
  };
}

async function seed() {
  await mongoose.connect(MONGODB_URI);

  let upserted = 0;

  for (let index = 0; index < serviceList.length; index += 1) {
    const service = serviceList[index];
    const doc = buildSeedDoc(service, index);

    await Service.findOneAndUpdate(
      { slug: service.slug },
      { $set: doc },
      { upsert: true, new: true, runValidators: true }
    );

    upserted += 1;
    console.log(`Upserted service: ${service.slug}`);
  }

  console.log(`\nDone. ${upserted} service(s) upserted.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
