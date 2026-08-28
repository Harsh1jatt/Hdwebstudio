import { requireAdmin } from "@/lib/auth";
import KeywordsManager from "./KeywordsManager";

export const metadata = { title: "Keyword Clustering & Intent Hub | HD Web Studios" };

export default async function AdminKeywordsPage() {
  await requireAdmin();
  return <KeywordsManager />;
}
