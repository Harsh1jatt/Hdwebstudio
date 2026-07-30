import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminMobileNav from "@/components/admin/layout/AdminMobileNav";

export const metadata = {
  title: {
    default: "Admin Dashboard | HD Web Studios",
    template: "%s | Admin | HD Web Studios",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="lg:flex lg:min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1 lg:pl-72">
          <div className="border-b border-slate-200 bg-white lg:hidden">
            <AdminMobileNav />
          </div>

          <AdminHeader />

          <main className="min-h-[calc(100vh-4rem)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}