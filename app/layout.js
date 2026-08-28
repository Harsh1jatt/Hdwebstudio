import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: {
    default: "HD Web Studios",
    template: "%s | HD Web Studios",
  },
  description:
    "HD Web Studios is a professional website development company in Ludhiana, Punjab. We build business websites, local SEO, and digital growth solutions for businesses across India.",
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