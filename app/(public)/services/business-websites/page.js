import ServicePage from '@/components/Services/ServicePage.server';
export const metadata = { title: 'Business Websites — Harshdeep Web Studios | Ludhiana', description: 'Professional business website development in Ludhiana and Punjab.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Business Websites","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Business Websites" subtitle="Professional websites for small and medium businesses" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Business Sites</h3><p className="text-slate-600">Fast, secure and easy to manage websites for businesses.</p></div>
    </ServicePage>
  )
}
