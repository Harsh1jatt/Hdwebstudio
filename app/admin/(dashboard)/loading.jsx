import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function AdminLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <AdminLoader message="Loading dashboard data..." />
    </div>
  );
}
