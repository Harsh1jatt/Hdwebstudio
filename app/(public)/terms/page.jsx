import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}. Read our terms and conditions for using our website and services.`,
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">Terms of Service</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: August 28, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none space-y-8 text-base leading-7 text-slate-600">
          <div>
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using the {siteConfig.name} website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">2. Services</h2>
            <p className="mt-3">
              {siteConfig.name} provides website development, web application development, SEO, and digital growth services. Service details, pricing, and scope are discussed and agreed upon before project commencement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">3. Project Agreements</h2>
            <p className="mt-3">
              Each project is governed by a separate agreement that outlines the scope, timeline, pricing, deliverables, and payment terms. These Terms of Service supplement (and do not replace) individual project agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property</h2>
            <p className="mt-3">
              Upon full payment, you receive ownership of the deliverables created specifically for your project. {siteConfig.name} retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">5. Content</h2>
            <p className="mt-3">
              You are responsible for providing accurate and lawful content for your website. You warrant that all content you provide does not infringe on any third-party rights.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">6. Limitation of Liability</h2>
            <p className="mt-3">
              {siteConfig.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid for the specific service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">7. Third-Party Services</h2>
            <p className="mt-3">
              We may use third-party tools, platforms, and services as part of project delivery. The use of such services is subject to their respective terms and policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">8. Warranty</h2>
            <p className="mt-3">
              We warrant that our services will be performed professionally and in accordance with the agreed project scope. Specific warranty terms are outlined in individual project agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">9. Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">10. Contact</h2>
            <p className="mt-3">
              For questions about these terms, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:underline">{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
