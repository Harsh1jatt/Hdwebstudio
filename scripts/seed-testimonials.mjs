import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("MONGODB_URI not set"); process.exit(1); }

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, trim: true, default: "" },
  company: { type: String, trim: true, default: "" },
  content: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  image: { type: String, trim: true, default: "" },
  imageAlt: { type: String, trim: true, default: "" },
  location: { type: String, trim: true, default: "" },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

const data = [
  { name: "Aman Kumar", role: "Founder, Raretech Institute", location: "Ludhiana, Punjab", content: "Harshdeep delivered our complete institute website, admin panel, and online exam portal on time and within budget. Our student admissions process is now much more organized and digital.", order: 0 },
  { name: "Priya Sharma", role: "Owner, JMD Solar Energy", location: "Punjab", content: "The website gave our business a much more professional online presence. The team was easy to communicate with, explained everything clearly, and provided support after launch.", order: 1 },
  { name: "Rohit Mehta", role: "Business Owner", location: "Ludhiana, Punjab", content: "The entire process was transparent and straightforward. I liked that everything was explained clearly and there were no unexpected costs during the project.", order: 2 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  for (const item of data) {
    await Testimonial.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
    console.log(`Upserted: ${item.name}`);
  }
  console.log("Testimonials seeded successfully");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
