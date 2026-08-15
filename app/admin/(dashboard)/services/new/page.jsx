import { requireAdmin } from "@/lib/auth";
import NewServicePageClient from "./NewServicePageClient";

export const metadata = {
  title: "New Service",
};

export default async function NewServicePage() {
  await requireAdmin();
  return <NewServicePageClient />;
}
