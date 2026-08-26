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
