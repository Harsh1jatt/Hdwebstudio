import ServicePage from '@/components/Services/ServicePage.server';
export const metadata = { title: 'Local SEO — Harshdeep Web Studios | Ludhiana', description: 'Local SEO services targeting Ludhiana and Punjab businesses to drive nearby customers.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Local SEO","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Local SEO" subtitle="Get found by nearby customers in Ludhiana and Punjab" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Local SEO</h3><p className="text-slate-600">GMB, citations and local content optimization.</p></div>
    </ServicePage>
  )
}
