import { absoluteUrl, siteConfig } from "@/config/site";
import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: { absolute: "Contact Website Developers in Ludhiana | HD Web Studios" },
  description:
    "Contact HD Web Studios in Ludhiana, Punjab. Speak directly with our lead web developer for custom Next.js websites, local SEO, and free digital consultations.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Website Developers in Ludhiana | HD Web Studios",
    description:
      "Get in touch for custom Next.js website development, local SEO, and software solutions in Ludhiana, Punjab.",
    url: absoluteUrl("/contact"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Website Developers in Ludhiana | HD Web Studios",
    description:
      "Speak directly with our engineering team for website development in Ludhiana, Punjab.",
  },
};

const contactFaqs = [
  {
    q: "Where is HD Web Studios located in Ludhiana?",
    a: "HD Web Studios is located at Kakka Rd, Subhash Nagar, Ludhiana, Punjab 141007, India. We serve clients locally across Ludhiana, Punjab, and globally through remote collaboration.",
  },
  {
    q: "How quickly will you respond to my website inquiry?",
    a: "We respond to all contact form submissions, WhatsApp messages, and email inquiries within 24 business hours. For urgent inquiries, you can reach us directly via WhatsApp.",
  },
  {
    q: "Can we schedule an in-person meeting or video consultation?",
    a: "Yes. We offer in-person discovery meetings in Ludhiana as well as Google Meet or Zoom video consultations for clients across India and internationally.",
  },
];

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#contactpage`,
    name: "Contact HD Web Studios",
    description: "Contact our web development studio in Ludhiana, Punjab.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
