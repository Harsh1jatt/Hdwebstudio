export default function FAQ(){
  const items = [
    { q: 'How long does a website take?', a: 'Typically 7–21 days depending on scope.' },
    { q: 'Do you provide hosting?', a: 'We can include hosting and maintenance as part of the package.' },
    { q: 'Do you offer SEO?', a: 'Yes — on-page SEO and technical SEO are included in our packages.' },
  ];
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it,i)=> (
            <div key={i} className="bg-white p-6 rounded-2xl shadow"> 
              <h4 className="font-semibold mb-2">{it.q}</h4>
              <p className="text-slate-600 text-sm">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
