import { absoluteUrl, siteConfig } from "@/config/site";
import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Contact HD Web Studios | Get a Free Website Audit in Ludhiana",
  description:
    "Get in touch with HD Web Studios in Ludhiana, Punjab. Contact us for website development, local SEO, and digital growth solutions.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact HD Web Studios",
    description:
      "Get in touch for website development, local SEO, and digital growth solutions in Ludhiana, Punjab.",
    url: absoluteUrl("/contact"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact HD Web Studios",
    description:
      "Get in touch for website development, local SEO, and digital growth solutions.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
