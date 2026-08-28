import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Website Development Company in Ludhiana | HD Web Studios",
    template: "%s | HD Web Studios",
  },
  description:
    "HD Web Studios is a professional website development company in Ludhiana, Punjab. We engineer high-speed business websites, local SEO, and digital growth systems.",
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "HD Web Studios | Website Development Company in Ludhiana",
    description:
      "HD Web Studios builds high-speed business websites, local SEO, and digital growth solutions for businesses across India.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "HD Web Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HD Web Studios | Website Development Company in Ludhiana",
    description:
      "HD Web Studios builds high-speed business websites, local SEO, and digital growth solutions for businesses across India.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-X5WDX0TLD9";

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}