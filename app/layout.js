import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "HD Web Studio",
      image: "https://hdwebstudio.vercel.app/landing_img.webp",
      "@id": "https://hdwebstudio.vercel.app",
      url: "https://hdwebstudio.vercel.app",
      telephone: "+91-7589434135",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        addressCountry: "India",
      },
      areaServed: "Ludhiana",
    }),
  }}
/>

        <div className="bg-slate-50 text-slate-900 antialiased">
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
