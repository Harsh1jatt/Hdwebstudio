import { notFound, permanentRedirect } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function WorkRedirectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  permanentRedirect(`/portfolio/${slug}`);
}
