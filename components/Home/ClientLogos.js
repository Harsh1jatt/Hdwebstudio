export default function ClientLogos(){
  const logos = ['/vercel.svg','/next.svg','/logo.png'];
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6 bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-center gap-8">
          {logos.map((src,i)=> (
            <img key={i} src={src} alt={`client-${i}`} className="h-10 opacity-90"/>
          ))}
        </div>
      </div>
    </section>
  )
}
