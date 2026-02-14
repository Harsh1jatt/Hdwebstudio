import Hero from "@/components/Home/Hero";
import ProofStrip from "@/components/Home/ProofStrip";
import Benefits from "@/components/Home/Benefits";
import PortfolioPreview from "@/components/Home/PortfolioPreview";
import FinalCTA from "@/components/Home/FinalCTA.js";
import Services from "@/components/Home/Services";
export const metadata = {
  title: "Website Developer in Ludhiana | HD Web Studio – Web Design & SEO Agency",
  description:
    "HD Web Studio is a growth-focused web development agency in Ludhiana. We build high-converting business websites, admin portals, and SEO-optimized platforms that generate real clients.",
  keywords: [
    "Website Developer in Ludhiana",
    "Web Design Company in Ludhiana",
    "SEO Services Ludhiana",
    "Ludhiana Web Development Agency",
    "Business Website Developer Ludhiana",
  ],
  openGraph: {
    title: "HD Web Studio – Website Development Agency in Ludhiana",
    description:
      "We build high-performance websites that help Ludhiana businesses generate more leads and sales.",
    url: "https://hdwebstudio.vercel.app",
    siteName: "HD Web Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Benefits />
      <Services />
      <PortfolioPreview />
      <FinalCTA />
    </>
  );
}
