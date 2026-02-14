import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-12">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-600">
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <p>© {new Date().getFullYear()} Harshdeep Web Studios. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
