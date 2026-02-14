import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "Harshdeep Web Studios",
  description: "MERN-driven websites, fast performance, and clean design.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="bg-slate-50 text-slate-900 antialiased">
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
