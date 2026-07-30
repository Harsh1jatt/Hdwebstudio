import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/Footer";
import Script from "next/script";
import { getServices } from "@/lib/getServices";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const SITE_URL = "https://hdwebstudios.in";

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",

      "@id": `${SITE_URL}/#organization`,

      name: "HD Web Studios",

      url: SITE_URL,

      logo: `${SITE_URL}/logo.png`,

      image: `${SITE_URL}/og-default.png`,

      description:
        "Professional Website Development Company in Ludhiana offering Next.js, React, MERN Stack, SEO, eCommerce and Custom Software Development.",

      email: "contact@hdwebstudios.in",

      telephone: "+917589434135",

      founder: {
        "@type": "Person",
        name: "Harshdeep",
      },

      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+917589434135",
        contactType: "Customer Support",
        areaServed: "IN",
        availableLanguage: [
          "English",
          "Hindi",
          "Punjabi",
        ],
      },
    },

    {
      "@type": "LocalBusiness",

      "@id": `${SITE_URL}/#localbusiness`,

      name: "HD Web Studios",

      url: SITE_URL,

      logo: `${SITE_URL}/logo.png`,

      image: `${SITE_URL}/og-image.png`,

      telephone: "+917589434135",

      email: "contact@hdwebstudios.in",

      priceRange: "₹₹",

      address: {
        "@type": "PostalAddress",

        addressLocality: "Ludhiana",

        addressRegion: "Punjab",

        postalCode: "141001",

        addressCountry: "IN",
      },

      geo: {
        "@type": "GeoCoordinates",

        latitude: 30.900965,

        longitude: 75.857277,
      },

      areaServed: {
        "@type": "Country",
        name: "India",
      },

      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",

          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],

          opens: "09:00",

          closes: "18:00",
        },
      ],
    },

    {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      url: SITE_URL,

      name: "HD Web Studios",

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      inLanguage: "en-IN",
    },
  ],
};

export default function PublicLayout({ children }) {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Navbar services={getServices()} />

      <main>{children}</main>

      <WhatsAppFloat />

      <Footer />
    </>
  );
}