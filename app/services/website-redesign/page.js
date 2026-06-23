import ServicePage from '../../../components/Services/ServicePage.server';
export const metadata = { title: 'Website Redesign — Harshdeep Web Studios | Ludhiana', description: 'Modern website redesign services in Ludhiana to improve conversions and performance.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Website Redesign","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Website Redesign" subtitle="Refresh your online presence with a conversion-first redesign" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Why redesign?</h3><p className="text-slate-600">Improve UX, speed and conversions.</p></div>
    </ServicePage>
  )
}
