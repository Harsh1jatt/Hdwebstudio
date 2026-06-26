import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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

        {process.env.GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GA_MEASUREMENT_ID}');`,
            }}
          />
        )}

        <div className="bg-slate-50 text-slate-900 antialiased">
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
