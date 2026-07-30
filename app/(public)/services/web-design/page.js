import ServiceContactForm from '@/components/common/ServiceContactForm.client'

export const metadata = {
  title: 'Web Design Agency — Premium Website Design Services',
  description: 'Premium web design services focused on conversion, performance and brand storytelling. End-to-end design, development, and growth for agencies and startups.'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Design",
  "provider": {
    "@type": "Organization",
    "name": "Harshdeep Web Studios"
  },
  "description": "Premium web design focused on conversion, brand, and performance.",
  "areaServed": "Global"
};

export default function Page() {
  return (
    <main className="prose max-w-none">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <header>
        <h1>Web Design that Converts — Premium Websites for Agencies & Startups</h1>
        <p className="lead">We design fast, accessible, and conversion-focused websites that scale revenue and strengthen your brand.</p>
      </header>

      <section>
        <h2>Why choose our Web Design service?</h2>
        <p>
          We combine strategic UX, brand-forward visuals, and performant implementation to build websites that don’t just look great—they generate measurable business results. Our process prioritizes clarity in the user journey, speed on every device, and content architecture built for search engines.
        </p>
        <p>
          Our team focuses on understanding your users, mapping conversion paths, and crafting micro-interactions that guide decisions. We design with accessibility, with modern responsive practices and image optimization baked in.
        </p>
      </section>

      <section>
        <h3>What’s included</h3>
        <ul>
          <li>Discovery & stakeholder workshops</li>
          <li>Information architecture & wireframes</li>
          <li>High-fidelity visual design and interactive prototypes</li>
          <li>Front-end development (Next.js + Tailwind / React)</li>
          <li>Performance optimization, accessibility audits, and SEO guidance</li>
          <li>Post-launch support & tracking</li>
        </ul>
      </section>

      <section>
        <h3>Typical timeline</h3>
        <p>Most mid-size websites (10–30 pages) take 8–12 weeks from kickoff to launch. Faster MVP timelines can be achieved with phased delivery and component-based development.</p>
      </section>

      <section>
        <h3>Pricing</h3>
        <p>Design + build packages typically start at $12,000 for a conversion-focused marketing website. Tailored enterprise solutions are priced after discovery.</p>
        <table>
          <thead>
            <tr><th>Package</th><th>Best for</th><th>Starting</th></tr>
          </thead>
          <tbody>
            <tr><td>Launch</td><td>Small businesses & portfolios</td><td>$12,000</td></tr>
            <tr><td>Growth</td><td>SaaS & Agencies</td><td>$25,000</td></tr>
            <tr><td>Enterprise</td><td>Large product sites</td><td>Custom</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Testimonials</h3>
        <blockquote>
          "Working with Harshdeep Web Studios boosted our lead quality and reduced bounce rate—our demo requests grew 84% in three months." — Product Lead, SaaS Company
        </blockquote>
      </section>

      <section>
        <h3>Frequently asked questions</h3>
        <h4>Do you provide content and photography?</h4>
        <p>Yes — we can handle copywriting, image sourcing, and QA. We prefer collaborating with your team but can take full ownership if needed.</p>
        <h4>Will the site be fast?</h4>
        <p>Performance is a core deliverable. We measure Lighthouse scores, optimize assets, and apply modern caching and image strategies.</p>
      </section>

      <aside>
        <h3>Request a proposal</h3>
        <ServiceContactForm service="Web Design" />
      </aside>

      <section>
        <h3>Detailed Overview</h3>
        <p>
          (Long-form content: Our approach begins with research—competitive analysis, user interviews, and analytics review. We develop a lean information architecture that supports SEO and conversion. Wireframes show the layout and desktop/mobile flows. High-fidelity designs focus on clarity of messaging and hierarchy. The development phase uses component-driven patterns, automated testing, and CI/CD to ensure fast, reliable launches. Post-launch we monitor KPIs, run A/B tests, and iterate on the highest-impact pages.)
        </p>
        <p>
          We counsel on analytics setup, event tracking, and dashboards so business stakeholders can see results in real-time. Long-term, we help set up a content cadence and technical roadmap to keep your site competitive and fast.
        </p>
      </section>
    </main>
  )
}
