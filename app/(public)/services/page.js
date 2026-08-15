import { getPublishedServices } from "@/lib/services";
import ServicesListing from "@/components/services/ServicesListing";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return <ServicesListing services={services} />;
}
