import ServicePage from '../../../components/Services/ServicePage.server';

export const metadata = {
  title: 'Web Development — Harshdeep Web Studios | Ludhiana, Punjab, India',
  description: 'Premium web development services in Ludhiana, Punjab. Build fast, secure, conversion-focused websites tailored for your business.'
}

export default function Page(){
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development",
    "areaServed": "Ludhiana, Punjab, India",
  };

  return (
    <ServicePage title="Web Development" subtitle="High-performance websites and web apps for businesses in Ludhiana, Punjab" schema={schema}>
      <div>
        <h3 className="text-2xl font-semibold mb-3">Hero</h3>
        <p className="text-slate-600 mb-6">We craft fast, scalable websites optimized for conversions and SEO.</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Benefits</h3>
        <ul className="list-disc pl-6 text-slate-700">
          <li>Mobile-first, responsive design</li>
          <li>SEO-friendly architecture</li>
          <li>Scalable backend and APIs</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Process</h3>
        <ol className="list-decimal pl-6 text-slate-700">
          <li>Discovery & Wireframes</li>
          <li>Design & Prototyping</li>
          <li>Development & Launch</li>
        </ol>
      </div>

    </ServicePage>
  )
}
