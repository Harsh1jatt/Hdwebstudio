import ServicePage from '../../../components/Services/ServicePage.server';
export const metadata = { title: 'Portfolio Websites — Harshdeep Web Studios | Ludhiana', description: 'Portfolio website design for creatives and professionals in Ludhiana.' }
export default function Page(){
  const schema = { "@context":"https://schema.org","@type":"Service","name":"Portfolio Websites","areaServed":"Ludhiana, Punjab, India" };
  return (
    <ServicePage title="Portfolio Websites" subtitle="Showcase your work with elegant portfolio websites" schema={schema}>
      <div><h3 className="text-2xl font-semibold">Portfolio</h3><p className="text-slate-600">Beautiful, minimal and conversion-focused portfolios.</p></div>
    </ServicePage>
  )
}
