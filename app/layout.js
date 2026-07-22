import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/common/Footer";
import Script from "next/script";
import { getServices } from "@/lib/getServices";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
const SITE_URL = "https://hdwebstudios.in";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "HD Web Studios | Website Development Company in Ludhiana | Next.js & MERN Experts",
    template: "%s | HD Web Studios",
  },

  description:
    "HD Web Studios is a professional website development company in Ludhiana, Punjab. We build modern websites, eCommerce stores, custom software, MERN Stack applications, Next.js websites, SEO solutions, and digital experiences for businesses across India.",

  keywords: [
    "HD Web Studios",
    "Website Development Company Ludhiana",
    "Website Designer Ludhiana",
    "Website Developer Punjab",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "SEO Services Ludhiana",
    "Business Website",
    "Custom Software Development",
    "eCommerce Website Development",
    "Web Design Company India",
    "Digital Agency Punjab",
  ],

  applicationName: "HD Web Studios",

  authors: [
    {
      name: "Harshdeep",
      url: SITE_URL,
    },
  ],

  creator: "Harshdeep",

  publisher: "HD Web Studios",

  category: "Technology",

  classification: "Website Development Company",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: SITE_URL,
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url: SITE_URL,

    title:
      "HD Web Studios | Website Development Company in Ludhiana",

    description:
      "Professional Website Development, Next.js, React, MERN Stack, SEO and Custom Software Development for businesses.",

    siteName: "HD Web Studios",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HD Web Studios",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "HD Web Studios",

    description:
      "Professional Website Development Company in Ludhiana.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",

    shortcut: "/favicon.ico",

    apple: "/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HD Web Studios",
  },

  verification: {
    google: "", // Add after Search Console verification
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
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

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Navbar services={getServices()}/>

        <main>{children}</main>
<WhatsAppFloat/>
        <Footer />
      </body>
    </html>
  );
}