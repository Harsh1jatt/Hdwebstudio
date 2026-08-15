import { requireAdmin } from "@/lib/auth";
import NewTestimonialPageClient from "./NewTestimonialPageClient";

export const metadata = { title: "New Testimonial" };

export default async function NewTestimonialPage() {
  await requireAdmin();
  return <NewTestimonialPageClient />;
}
