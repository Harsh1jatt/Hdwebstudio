import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 text-slate-950">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: August 2025</p>

        <div className="space-y-8 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>
              When you visit our website, we may collect personal information that you voluntarily
              provide through our contact forms, audit request forms, or other interactions. This
              information may include:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number / WhatsApp number</li>
              <li>Business name</li>
              <li>Project details or message</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 ml-5 list-disc space-y-1">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Send project quotes, proposals, and relevant communications</li>
              <li>Improve our website and services</li>
              <li>Maintain internal records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Data Protection</h2>
            <p>
              We take appropriate security measures to protect your personal information. We do not
              sell, trade, or rent your personal data to third parties. Your information is only
              shared with third parties when necessary to fulfill a service you have requested, or
              when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Cookies &amp; Analytics</h2>
            <p>
              Our website uses Google Analytics to understand how visitors interact with our site.
              Google Analytics uses cookies to collect information such as how often users visit
              this site, what pages they visit, and what other sites they used prior to coming to
              this site. You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Your Rights</h2>
            <p>
              You have the right to request access to the personal data we hold about you, to
              request correction of any inaccurate data, and to request deletion of your data. To
              exercise any of these rights, please contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.email}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Contact</h2>
            <p>
              For questions about this privacy policy, please contact us at{" "}
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
