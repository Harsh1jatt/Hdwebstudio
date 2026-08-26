import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms & Conditions",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 text-slate-950">Terms &amp; Conditions</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: August 2025</p>

        <div className="space-y-8 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the {siteConfig.name} website ({siteConfig.url}), you agree to
              be bound by these Terms &amp; Conditions. If you do not agree with any part of these
              terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Services</h2>
            <p>
              {siteConfig.name} provides website development, local SEO, digital growth consulting,
              and related digital services. All project scopes, timelines, and pricing are agreed
              upon before work begins. Work commences only after an advance payment is received.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Project Process</h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Project scope and timeline are confirmed after an initial discussion</li>
              <li>Advance payment is required before work begins</li>
              <li>Revisions are included as specified in the project agreement</li>
              <li>Additional revisions or scope changes may incur additional costs</li>
              <li>Final payment is due before project files are delivered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Intellectual Property</h2>
            <p>
              Upon full payment, all deliverables (website design, code, content) become the property
              of the client. {siteConfig.name} reserves the right to display completed work in its
              portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p>
              {siteConfig.name} will perform services with professional care and skill. However, we
              cannot guarantee specific business outcomes such as rankings, traffic, leads, or
              revenue. SEO and digital marketing results depend on many factors beyond our control,
              including competition, content, and algorithm changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Contact</h2>
            <p>
              For questions about these terms, please contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              or call {siteConfig.phoneDisplay}.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
