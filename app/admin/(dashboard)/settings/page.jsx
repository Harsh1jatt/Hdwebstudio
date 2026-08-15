import { requireAdmin } from "@/lib/auth";
import SettingsForm from "@/components/Admin/settings/SettingsForm";
export const metadata = { title: "Settings" };
export default async function AdminSettingsPage() {
  await requireAdmin();
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-950 mb-6">Site Settings</h1>
      <SettingsForm />
    </div>
  );
}
