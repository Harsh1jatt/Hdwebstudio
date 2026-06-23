import ServicePage from '../../../components/Services/ServicePage.server';
export const metadata = { title: 'E-commerce Development — Harshdeep Web Studios | Ludhiana', description: 'E-commerce development and stores optimized for conversions in Ludhiana and Punjab.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"E-commerce Development","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="E-commerce Development" subtitle="Build high-converting online stores" schema={schema}>
      <div><h3 className="text-2xl font-semibold">E-commerce</h3><p className="text-slate-600">Payment integrations, performance and SEO.</p></div>
    </ServicePage>
  )
}
