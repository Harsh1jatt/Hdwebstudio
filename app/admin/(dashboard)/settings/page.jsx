import SettingsForm from "@/components/Admin/settings/SettingsForm";

export const metadata = { title: "Site Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <SettingsForm />
    </div>
  );
}
