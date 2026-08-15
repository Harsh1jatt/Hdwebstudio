import { siteConfig, whatsAppUrl } from "@/config/site";

export const metadata = {
  title: "Thank you | HD Web Studios",
  description:
    "Thanks for contacting HD Web Studios. We will reach out soon.",
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Thank you!</h1>
        <p className="mb-6 text-slate-600">
          We received your details and will contact you within 24 hours.
        </p>
        <p className="text-sm text-slate-500">
          If it&apos;s urgent, WhatsApp us at{" "}
          <a href={whatsAppUrl()} className="text-blue-600">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
