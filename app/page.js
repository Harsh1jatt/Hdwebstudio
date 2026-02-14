import Hero from "@/components/Home/Hero";
import ProofStrip from "@/components/Home/ProofStrip";
import Benefits from "@/components/Home/Benefits";
import PortfolioPreview from "@/components/Home/PortfolioPreview";
import FinalCTA from "@/components/Home/FinalCTA.js";
import Services from "@/components/Home/Services";

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
