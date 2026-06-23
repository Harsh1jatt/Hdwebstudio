import ServiceContactForm from '../../../components/common/ServiceContactForm.client'

export const metadata = {
  title: 'Branding Agency Services — Logo, Identity & Positioning',
  description: 'Strategic brand design and identity systems for startups and enterprises. Clarify positioning, messaging and visual systems that scale.'
}

const jsonLd = { "@context": "https://schema.org", "@type": "Service", "serviceType": "Branding", "provider": { "@type": "Organization", "name": "Harshdeep Web Studios" }};

export default function Page(){
  return (
    <main className="prose max-w-none">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <h1>Branding Services — Identity, Messaging & Positioning</h1>
      <p>We help businesses find their voice through strategic naming, messaging frameworks, and scalable design systems.</p>

      <h2>Services included</h2>
      <ul>
        <li>Brand strategy workshops</li>
        <li>Visual identity & logo design</li>
        <li>Design systems and component libraries</li>
        <li>Brand guidelines and rollout</li>
      </ul>

      <h3>Pricing</h3>
      <p>Brand projects typically start at $15,000 and vary by scope.</p>

      <h3>Testimonials</h3>
      <blockquote>"Their brand work helped us articulate a clear message and reposition for enterprise buyers." — CEO</blockquote>

      <h3>FAQ</h3>
      <p>Do you do naming? Yes, we offer naming and trademark-ready checks as part of extended packages.</p>

      <aside>
        <h3>Get a brand brief</h3>
        <ServiceContactForm service="Branding" />
      </aside>
    </main>
  )
}
