import { requireAdmin } from "@/lib/auth";
import NewFAQPageClient from "./NewFAQPageClient";

export const metadata = { title: "New FAQ" };

export default async function NewFAQPage() {
  await requireAdmin();
  return <NewFAQPageClient />;
}
