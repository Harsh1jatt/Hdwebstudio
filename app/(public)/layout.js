import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { getPublishedServices } from "@/lib/services";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/settings";

export default async function PublicLayout({ children }) {
  const [services, settings] = await Promise.all([
    getPublishedServices(),
    getSiteSettings(),
  ]);

  // Map services for navbar
  const navServices = services.map((s) => ({
    slug: s.slug,
    href: `/services/${s.slug}`,
    label: s.eyebrow || s.title,
    description: s.shortDescription || "",
    icon: s.icon,
  }));

  // Map services for footer
  const footerServices = services.slice(0, 4).map((s) => ({
    title: s.title || s.eyebrow,
    slug: s.slug,
  }));

  // DB settings override hardcoded defaults
  const site = {
    ...siteConfig,
    name: settings.brand?.name || siteConfig.name,
    shortName: settings.brand?.shortName || siteConfig.shortName,
    phone: settings.contact?.phone || siteConfig.phone,
    email: settings.contact?.email || siteConfig.email,
    address: {
      city: settings.contact?.city || siteConfig.address.city,
      state: settings.contact?.state || siteConfig.address.state,
      country: settings.contact?.country || siteConfig.address.country,
      pincode: settings.contact?.pincode || siteConfig.address.pincode,
    },
    socials: {
      facebook: settings.social?.facebook || siteConfig.socials.facebook,
      instagram: settings.social?.instagram || siteConfig.socials.instagram,
      linkedin: settings.social?.linkedin || siteConfig.socials.linkedin,
      twitter: settings.social?.twitter || "",
      github: settings.social?.github || siteConfig.socials.github,
      youtube: settings.social?.youtube || "",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: absoluteUrl(settings.brand?.logo || siteConfig.assets.logo),
        image: absoluteUrl(settings.brand?.logo || siteConfig.assets.ogImage),
        description: siteConfig.description,
        email: site.email,
        telephone: site.phone,
        founder: { "@type": "Person", name: "Harshdeep" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          contactType: "Customer Support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Punjabi"],
        },
        sameAs: Object.values(site.socials).filter(Boolean),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#localbusiness`,
        name: site.name,
        url: site.url,
        logo: absoluteUrl(settings.brand?.logo || siteConfig.assets.logo),
        image: absoluteUrl(settings.brand?.logo || siteConfig.assets.ogImage),
        telephone: site.phone,
        email: site.email,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.pincode,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: 30.900965, longitude: 75.857277 },
        areaServed: { "@type": "Country", name: "India" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar services={navServices} logoUrl={settings.brand?.logo || siteConfig.assets.logo} />

      <main>{children}</main>

      <WhatsAppFloat />

      <Footer services={footerServices} site={site} />
    </>
  );
}
