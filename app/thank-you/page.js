export const metadata = {
  title: 'Thank you — HD Web Studio',
  description: 'Thanks for contacting HD Web Studio. We will reach out soon.',
};

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
        <p className="text-slate-600 mb-6">We received your details and will contact you within 24 hours.</p>
        <p className="text-sm text-slate-500">If it's urgent, WhatsApp us at <a href="https://wa.me/917589434135" className="text-blue-600">+91 75894 34135</a>.</p>
      </div>
    </section>
  );
}
