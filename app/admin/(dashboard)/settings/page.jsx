import SettingsForm from "@/components/Admin/settings/SettingsForm";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Site Settings" };

export default async function SettingsPage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <SettingsForm />
    </div>
  );
}
