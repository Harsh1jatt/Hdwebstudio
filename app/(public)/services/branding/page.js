import Link from 'next/link'
import {
  Compass,
  PenTool,
  LayoutGrid,
  BookOpenCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import ServiceContactForm from '@/components/common/ServiceContactForm.client'

export const metadata = {
  title: 'Branding Agency Services — Logo, Identity & Positioning | Harshdeep Web Studios',
  description:
    'Strategic brand design and identity systems for startups and enterprises. We clarify positioning, messaging, naming, and visual systems that scale — from brand strategy to design systems.',
  alternates: {
    canonical: 'https://www.harshdeepwebstudios.com/services/branding',
  },
  openGraph: {
    title: 'Branding Agency Services — Logo, Identity & Positioning',
    description:
      'Strategic brand design and identity systems for startups and enterprises. Clarify positioning, messaging and visual systems that scale.',
    url: 'https://www.harshdeepwebstudios.com/services/branding',
    type: 'website',
  },
}

const included = [
  {
    icon: Compass,
    title: 'Brand strategy workshops',
    description:
      'Structured sessions to define your audience, positioning, and the message you want to own in the market.',
  },
  {
    icon: PenTool,
    title: 'Visual identity & logo design',
    description:
      'A distinct mark, color system, and typography built to work across digital, print, and product.',
  },
  {
    icon: LayoutGrid,
    title: 'Design systems & component libraries',
    description:
      'Reusable UI components and documented patterns so your team ships consistent design at speed.',
  },
  {
    icon: BookOpenCheck,
    title: 'Brand guidelines & rollout',
    description:
      'A practical guidelines doc plus hands-on support rolling the new identity across your channels.',
  },
]

const process = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We audit your current brand, market, and competitors, then interview stakeholders to surface what makes you different.',
  },
  {
    step: '02',
    title: 'Define',
    description:
      'We lock in positioning and messaging pillars before any visual work starts, so design decisions have a strategic anchor.',
  },
  {
    step: '03',
    title: 'Design',
    description:
      'Logo, color, type, and system components are designed and stress-tested across real use cases — web, product, print.',
  },
  {
    step: '04',
    title: 'Deliver',
    description:
      'You get a documented guidelines system, source files, and a rollout plan so the identity ships consistently.',
  },
]

const faqs = [
  {
    question: 'Do you offer naming services?',
    answer:
      'Yes. Naming and trademark-readiness checks are available as part of our extended branding packages.',
  },
  {
    question: 'How long does a branding project take?',
    answer:
      'Most engagements run 6–10 weeks depending on scope, from strategy workshops through final guidelines and rollout support.',
  },
  {
    question: 'What do we actually receive at the end?',
    answer:
      'A documented brand guidelines system, source files for the logo and identity assets, and — where scoped — a component library ready for your design and dev teams.',
  },
  {
    question: 'Do you work with early-stage startups or only enterprises?',
    answer:
      'Both. We scope engagements differently for early-stage teams versus enterprises repositioning an existing brand, so the workshops and deliverables match where you actually are.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Branding',
  name: 'Branding Services — Identity, Messaging & Positioning',
  description:
    'Strategic brand design and identity systems for startups and enterprises, including brand strategy, visual identity, design systems, and brand guidelines.',
  provider: {
    '@type': 'Organization',
    name: 'Harshdeep Web Studios',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '15000',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '15000',
      priceCurrency: 'USD',
    },
  },
}

export default function Page() {
  return (
    <main className="bg-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Branding
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Identity, messaging & positioning built to scale
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            We help businesses find their voice through strategic naming,
            messaging frameworks, and design systems — so your brand holds up
            from a pitch deck to a product interface.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700"
            >
              Get a brand brief
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-50"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Services included */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Services included
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Every engagement is scoped around your stage — pick a single
            deliverable or the full identity system.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {included.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-slate-200 p-5 transition-shadow duration-150 hover:shadow-md hover:shadow-slate-900/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-slate-100 bg-slate-50/60 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How we work
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, description }) => (
              <div key={step}>
                <span className="text-sm font-semibold text-blue-600">
                  {step}
                </span>
                <h3 className="mt-2 text-[15px] font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Pricing
          </h2>
          <p className="mt-3 text-slate-600">
            Brand projects typically start at{' '}
            <strong className="font-semibold text-slate-900">$15,000</strong>{' '}
            and scale with scope — naming, design systems, and rollout
            support are scoped separately based on what you need.
          </p>
          <ul className="mt-5 space-y-2.5">
            {[
              'Fixed-scope proposal before any work begins',
              'Milestone-based delivery, not open-ended retainers',
              'Source files and documentation included at handoff',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y border-slate-100 bg-slate-900 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
            &ldquo;Their brand work helped us articulate a clear message and
            reposition for enterprise buyers.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-medium text-slate-400">
            — CEO, client engagement
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-slate-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-slate-900">
                  {faq.question}
                  <span className="ml-4 text-slate-400 transition-transform duration-150 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-slate-100 bg-slate-50/60 px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Get a brand brief
          </h2>
          <p className="mt-3 text-slate-600">
            Tell us where your brand stands today and where you need it to
            go — we&apos;ll follow up with a scoped proposal.
          </p>
          <div className="mt-8 text-left">
            <ServiceContactForm service="Branding" />
          </div>
        </div>
      </section>
    </main>
  )
}
