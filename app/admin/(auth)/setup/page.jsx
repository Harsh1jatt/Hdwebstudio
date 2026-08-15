import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import SetupAdminPageClient from "./SetupAdminPageClient";

export default async function AdminSetupPage() {
  await connectDB();
  const adminCount = await Admin.countDocuments();

  if (adminCount > 0) {
    redirect("/admin/login");
  }

  return <SetupAdminPageClient />;
}
