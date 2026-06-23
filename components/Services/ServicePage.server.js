import React from 'react';

export default function ServicePage({ title, subtitle, children, schema }){
  return (
    <section className="py-20 px-6 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">{title}</h1>
          <p className="text-lg text-slate-600">{subtitle}</p>
        </div>

        <div className="space-y-10">{children}</div>
      </div>
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </section>
  )
}
