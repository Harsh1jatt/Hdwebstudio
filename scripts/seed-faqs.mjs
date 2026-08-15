import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("MONGODB_URI not set"); process.exit(1); }

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  category: { type: String, trim: true, default: "General" },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const FAQ = mongoose.model("FAQ", FAQSchema);

const data = [
  { q: "What kind of digital solutions do you provide?", a: "We help businesses build and improve their digital presence with solutions tailored to their needs. This can include professional business websites, lead-generation websites, e-commerce experiences, custom web applications, business portals, admin dashboards, client systems, and other digital tools that help businesses operate and grow more effectively." },
  { q: "Do you only build websites?", a: "No. A website is often just one part of a business's digital ecosystem. We focus on understanding the problem first and then building the right solution around it." },
  { q: "I have an idea but don't know what solution I need. Can you help?", a: "Absolutely. You don't need to know the technical details or even have a complete plan before contacting us. Tell us about your business, the problem you're facing, or what you want to achieve." },
  { q: "How much does a website or digital solution cost?", a: "The investment depends entirely on what your business needs. A simple business website and a custom business platform have very different requirements, so we don't believe in forcing every client into the same package." },
  { q: "How long does it take to complete a project?", a: "The timeline depends on the scope and complexity of your project. A focused business website may be completed within a few weeks, while larger projects may require more time." },
  { q: "Can you improve my existing website or digital presence?", a: "Yes. If you already have a website or an existing digital system, we can review it and identify opportunities to improve its design, user experience, performance, mobile experience, SEO foundations, conversion flow, or overall functionality." },
  { q: "Can you build a custom system for my business?", a: "Yes. If your business has a process that is currently handled manually or through multiple disconnected tools, we can help turn that process into a custom digital solution." },
  { q: "Will I be able to manage and update my website or content?", a: "Yes. We can provide an appropriate content management or administration system based on your requirements." },
  { q: "Do you help with SEO and getting more customers online?", a: "Yes. We build digital experiences with search visibility and conversions in mind." },
  { q: "Do you provide support after the project is completed?", a: "Yes. We can continue supporting you after launch with maintenance, updates, improvements, troubleshooting, content changes, performance optimization, and future feature development." },
  { q: "Do you work with businesses outside Ludhiana and Punjab?", a: "Yes. While we work with businesses in Ludhiana and across Punjab, we also work remotely with clients from different locations." },
  { q: "How do I get started?", a: "Simply get in touch with us and tell us about your business, your current situation, and what you want to achieve." },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    await FAQ.findOneAndUpdate(
      { question: item.q },
      { question: item.q, answer: item.a, category: "General", published: true, order: i, featured: false },
      { upsert: true, new: true }
    );
    console.log(`Upserted FAQ ${i + 1}: ${item.q.slice(0, 50)}...`);
  }
  console.log("FAQs seeded successfully");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
