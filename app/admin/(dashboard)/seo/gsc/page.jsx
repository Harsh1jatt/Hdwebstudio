import GscManager from "./GscManager";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Google Search Console",
};

export default async function GscPage() {
  await requireAdmin();
  return <GscManager />;
}
