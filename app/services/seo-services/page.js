import ServiceContactForm from '../../../components/common/ServiceContactForm.client'

const jsonLd = { "@context": "https://schema.org", "@type": "Service", "serviceType": "SEO", "provider": { "@type": "Organization", "name": "HD Web Studios" }};

export default function Page(){
  return (
    <main className="prose max-w-none">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <h1>SEO Services — Rank Higher, Convert Better</h1>
      <p>Our SEO approach pairs deep technical audits with content-driven growth to increase organic visibility and drive qualified leads.</p>
      <h3>What we do</h3>
      <ul>
        <li>Technical SEO audits & fixes</li>
        <li>Keyword research & content planning</li>
        <li>On-page optimization & schema markup</li>
        <li>Link building and outreach</li>
      </ul>

      <aside>
        <h3>Request SEO audit</h3>
        <ServiceContactForm service="SEO" />
      </aside>
    </main>
  )
}
