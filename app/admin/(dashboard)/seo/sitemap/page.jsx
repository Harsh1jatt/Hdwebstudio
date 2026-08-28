import SitemapManager from "./SitemapManager";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Sitemap Manager",
};

export default async function SitemapPage() {
  await requireAdmin();
  return <SitemapManager />;
}
