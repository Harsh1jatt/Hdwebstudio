import { requireAdmin } from "@/lib/auth";
import EditTestimonialPageClient from "./EditTestimonialPageClient";

export const metadata = { title: "Edit Testimonial" };

export default async function EditTestimonialPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditTestimonialPageClient testimonialId={id} />;
}
