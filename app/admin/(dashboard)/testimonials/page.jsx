import { requireAdmin } from "@/lib/auth";
import TestimonialsManager from "@/components/Admin/testimonials/TestimonialsManager";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  await requireAdmin();
  return <TestimonialsManager />;
}
