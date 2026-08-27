import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    brand: {
      name: { type: String, trim: true, default: "HD Web Studios" },
      shortName: { type: String, trim: true, default: "HDWS" },
      tagline: { type: String, trim: true, default: "" },
      logo: { type: String, trim: true, default: "" },
      favicon: { type: String, trim: true, default: "" },
    },
    contact: {
      email: { type: String, trim: true, default: "contact@hdwebstudios.in" },
      phone: { type: String, trim: true, default: "+917589434135" },
      whatsapp: { type: String, trim: true, default: "+917589434135" },
      address: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "Ludhiana" },
      state: { type: String, trim: true, default: "Punjab" },
      country: { type: String, trim: true, default: "IN" },
      pincode: { type: String, trim: true, default: "141001" },
    },
    social: {
      facebook: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      youtube: { type: String, trim: true, default: "" },
    },
    seo: {
      defaultTitle: { type: String, trim: true, default: "" },
      defaultDescription: { type: String, trim: true, default: "" },
      defaultKeywords: { type: String, trim: true, default: "" },
      defaultOgImage: { type: String, trim: true, default: "" },
      favicon: { type: String, trim: true, default: "" },
    },
    business: {
      businessHours: { type: String, trim: true, default: "Mon-Sat 9:00 AM - 6:00 PM" },
      foundedYear: { type: String, trim: true, default: "" },
      serviceArea: { type: String, trim: true, default: "India" },
    },
    analytics: {
      googleAnalyticsId: { type: String, trim: true, default: "" },
    },
    footer: {
      footerText: { type: String, trim: true, default: "" },
      copyrightText: { type: String, trim: true, default: "" },
    },
    homepage: {
      hero: {
        heading1: { type: String, trim: true, default: "We Build Websites That" },
        heading2: { type: String, trim: true, default: "Grow Businesses." },
        description: {
          type: String,
          trim: true,
          default: "Professional website development, local SEO, and digital growth solutions for businesses in Ludhiana, Punjab and across India. We help you get discovered, build trust, and get contacted.",
        },
        ctaText: { type: String, trim: true, default: "Get a Free Digital Audit" },
        ctaLink: { type: String, trim: true, default: "/contact" },
        secondaryText: { type: String, trim: true, default: "View Our Work" },
        secondaryLink: { type: String, trim: true, default: "/portfolio" },
      },
    },
    servicePage: {
      techStack: {
        type: [
          {
            name: { type: String, required: true },
            icon: { type: String, default: "Circle" },
          },
        ],
        default: [],
      },
      process: {
        type: [
          {
            icon: { type: String, default: "Circle" },
            title: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
        default: [],
      },
      whyChooseUs: {
        type: [
          {
            icon: { type: String, default: "Circle" },
            title: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
        default: [],
      },
      industries: {
        type: [
          {
            icon: { type: String, default: "Circle" },
            name: { type: String, required: true },
          },
        ],
        default: [],
      },
      trustStats: {
        type: [
          {
            icon: { type: String, default: "Users" },
            value: { type: Number, default: 0 },
            suffix: { type: String, default: "" },
            label: { type: String, required: true },
          },
        ],
        default: [],
      },
    },
  },
  { timestamps: true }
);

SiteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne().lean();
  if (!settings) {
    settings = await this.create({});
    settings = settings.toObject();
  }
  return settings;
};

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
