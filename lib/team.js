import connectDB from "./db";
import TeamMember from "../models/TeamMember";

function normalizeDbMember(doc) {
  if (!doc) return null;
  return {
    name: doc.name,
    role: doc.role,
    bio: doc.bio || "",
    image: doc.image || "",
    imageAlt: doc.imageAlt || "",
    email: doc.email || "",
    linkedin: doc.linkedin || "",
    github: doc.github || "",
    order: doc.order ?? 0,
    featured: doc.featured,
    published: doc.published,
  };
}

export async function getPublishedTeamMembers() {
  try {
    await connectDB();
    const totalCount = await TeamMember.countDocuments();
    if (totalCount > 0) {
      const docs = await TeamMember.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();
      return docs.map(normalizeDbMember);
    }
  } catch (error) {
    console.error("[team] Failed to load from DB:", error);
  }
  return [];
}
