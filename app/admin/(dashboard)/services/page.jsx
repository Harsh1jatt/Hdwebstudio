import { requireAdmin } from "@/lib/auth";
import ServicesManager from "@/components/Admin/services/ServicesManager";

export const metadata = {
  title: "Services",
};

export default async function AdminServicesPage() {
  await requireAdmin();

  return <ServicesManager />;
}
