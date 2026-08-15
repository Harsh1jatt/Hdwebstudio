import { requireAdmin } from "@/lib/auth";
import ProjectsManager from "@/components/Admin/projects/ProjectsManager";

export const metadata = {
  title: "Projects",
};

export default async function AdminProjectsPage() {
  await requireAdmin();
  return <ProjectsManager />;
}
