import { getPublishedServices } from "@/lib/services";

export async function getServices() {
  const services = await getPublishedServices();

  return services.map((service) => ({
    slug: service.slug,
    href: `/services/${service.slug}`,
    label: service.eyebrow,
    description:
      service.shortDescription ||
      (service.description?.length > 90
        ? `${service.description.slice(0, 90)}...`
        : service.description),
    icon: service.icon,
  }));
}
