import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your information.`,
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none space-y-8 text-base leading-7 text-slate-600">
          <div>
            <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="mt-3">
              When you visit our website or contact us through our forms, we may collect the following personal information:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name</li>
              <li>Project details you voluntarily provide</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Respond to your enquiries and provide project quotes</li>
              <li>Communicate about our services</li>
              <li>Improve our website and services</li>
              <li>Send relevant updates (only if you opt in)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">3. Data Protection</h2>
            <p className="mt-3">
              We take appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Your data is stored securely and is only accessed by authorised team members.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">4. Third-Party Services</h2>
            <p className="mt-3">
              We may use third-party services (such as Cloudinary for image hosting and Google Analytics for website analytics) that collect information as part of their normal operation. These services have their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">5. Cookies</h2>
            <p className="mt-3">
              Our website uses essential cookies for authentication and session management. We also use Google Analytics cookies to understand how visitors use our website. You can control cookie settings through your browser.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">6. Your Rights</h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">7. Data Retention</h2>
            <p className="mt-3">
              We retain your information only as long as necessary to fulfil the purposes for which it was collected, or as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">8. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">9. Contact Us</h2>
            <p className="mt-3">
              If you have questions about this privacy policy, please contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:underline">{siteConfig.email}</a>{" "}
              or call us at {siteConfig.phoneDisplay}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
