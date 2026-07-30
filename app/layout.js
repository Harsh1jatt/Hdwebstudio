import "./globals.css";

export const metadata = {
  title: {
    default: "HD Web Studios",
    template: "%s | HD Web Studios",
  },
  description:
    "HD Web Studios - Website Development and Digital Solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}