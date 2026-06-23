import ServicePage from '../../../components/Services/ServicePage.server';
export const metadata = { title: 'Custom Web Applications — Harshdeep Web Studios | Ludhiana', description: 'Custom web app development for businesses in Ludhiana and Punjab.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Custom Web Applications","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Custom Web Applications" subtitle="Tailored web applications for unique business workflows" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Custom Apps</h3><p className="text-slate-600">Booking systems, CRMs, dashboards and more.</p></div>
    </ServicePage>
  )
}
