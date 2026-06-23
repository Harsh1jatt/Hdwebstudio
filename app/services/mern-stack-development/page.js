import ServicePage from '../../../components/Services/ServicePage.server';
export const metadata = { title: 'MERN Stack Development — Harshdeep Web Studios | Ludhiana', description: 'MERN stack (Mongo, Express, React, Node) development services in Ludhiana and Punjab.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"MERN Stack Development","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="MERN Stack Development" subtitle="Full-stack MERN solutions for startups and enterprises" schema={schema}>
      <div><h3 className="text-2xl font-semibold">MERN</h3><p className="text-slate-600">Robust full-stack applications using the MERN stack.</p></div>
    </ServicePage>
  )
}
