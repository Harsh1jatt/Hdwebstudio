import ServicePage from '@/components/Services/ServicePage.server';
export const metadata = { title: 'Landing Page Design — Harshdeep Web Studios | Ludhiana', description: 'High-converting landing page design services targeting Ludhiana, Punjab.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Landing Page Design","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Landing Page Design" subtitle="Conversion-focused landing pages to capture leads" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Landing Pages</h3><p className="text-slate-600">Optimized for speed and conversions with clear CTAs.</p></div>
    </ServicePage>
  )
}
