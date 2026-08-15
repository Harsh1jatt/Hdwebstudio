import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("MONGODB_URI not set"); process.exit(1); }

const PricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, trim: true, default: "" },
  price: { type: String, required: true, trim: true },
  discountPrice: { type: String, trim: true, default: "" },
  currency: { type: String, trim: true, default: "₹" },
  billingPeriod: { type: String, trim: true, default: "" },
  features: { type: [String], default: [] },
  highlighted: { type: Boolean, default: false },
  badge: { type: String, trim: true, default: "" },
  icon: { type: String, trim: true, default: "" },
  note: { type: String, trim: true, default: "" },
  ctaText: { type: String, trim: true, default: "Get Started" },
  ctaUrl: { type: String, trim: true, default: "/contact" },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

const PricingPlan = mongoose.model("PricingPlan", PricingPlanSchema);

function slugify(str) {
  return String(str || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const data = [
  { title: "One Page Website", price: "₹8,000", discountPrice: "₹6,500", icon: "Globe", features: ["Modern responsive design", "Fast-loading & SEO ready", "Basic contact form", "Delivery in 5-7 days", "Up to 3 revisions included"], note: "Perfect for startups or individuals who need a clean and professional online presence." },
  { title: "Multi-Page Business Website", price: "₹15,000", discountPrice: "₹12,000", popular: true, icon: "Globe", features: ["Up to 7 pages (Home, About, Services, Contact, etc.)", "SEO-friendly architecture", "Custom design & animations", "Admin-friendly structure", "Up to 3 revisions included"], note: "Ideal for small businesses looking for a complete digital identity with multiple pages." },
  { title: "E-commerce Website", price: "₹30,000", discountPrice: "₹25,000", icon: "ShoppingCart", features: ["Product pages with categories", "Cart & Checkout flow", "Payment gateway integration", "Order & inventory management", "Up to 3 revisions included"], note: "Designed for businesses ready to sell online with smooth shopping experiences." },
  { title: "WordPress Website", price: "₹12,000", discountPrice: "₹9,500", icon: "Wordpress", features: ["Business or blog website", "Premium theme setup", "Essential plugins installed", "Easy to manage dashboard", "Up to 3 revisions included"], note: "Great choice if you want a website that's easy to manage with WordPress." },
  { title: "Landing Page Design", price: "₹10,000", discountPrice: "₹7,500", icon: "PenTool", features: ["Conversion-focused design", "A/B testing ready", "Responsive & modern UI", "Delivery in 4 days", "Up to 3 revisions included"], note: "Best for marketing campaigns or single product/service promotions." },
  { title: "Portfolio Website", price: "₹12,000", discountPrice: "₹9,000", icon: "Briefcase", features: ["Showcase projects & case studies", "Image/video gallery support", "SEO & speed optimized", "Custom branding", "Up to 3 revisions included"], note: "Show off your skills, projects, and achievements with a professional portfolio." },
  { title: "SEO Optimization", price: "₹5,000/mo", discountPrice: "₹4,000/mo", icon: "Search", features: ["On-page SEO & keyword optimization", "Google indexing & sitemap setup", "Performance & speed tuning", "Monthly growth report", "Up to 3 revisions included"], note: "Boost your website rankings and visibility with consistent SEO efforts." },
  { title: "Maintenance & Support", price: "₹2,500/mo", discountPrice: "₹2,000/mo", icon: "Wrench", features: ["Regular updates & security", "Backup & monitoring", "Bug fixes & small edits", "Priority support", "Up to 3 revisions included"], note: "Peace of mind with continuous support, updates, and maintenance." },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const slug = slugify(item.title);
    await PricingPlan.findOneAndUpdate(
      { slug },
      {
        name: item.title, slug, price: item.price, discountPrice: item.discountPrice || "",
        icon: item.icon || "", features: item.features, highlighted: item.popular || false,
        badge: item.popular ? "Most Popular" : "", note: item.note || "",
        ctaText: "Get Started", ctaUrl: "/contact", order: i, published: true,
      },
      { upsert: true, new: true }
    );
    console.log(`Upserted: ${item.title}`);
  }
  console.log("Pricing plans seeded successfully");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
