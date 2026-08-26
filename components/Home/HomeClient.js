import PortfolioSection from "./PortfolioSection";
import ServicesSection from "./ServicesSection";
import FounderSection from "./FounderSection";
import BenefitsSection from "./BenefitsSection";
import ProcessSection from "./ProcessSection";
import AuditFormSection from "./AuditFormSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import FinalCTASection from "./FinalCTASection";

export default function HomeClient({ services = [], projects = [], testimonials = [], faqs = [] }) {
  return (
    <>
      <PortfolioSection projects={projects} />
      <ServicesSection services={services} />
      <FounderSection />
      <BenefitsSection />
      <ProcessSection />
      <AuditFormSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <FinalCTASection />
    </>
  );
}
