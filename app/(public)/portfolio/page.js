import PortfolioListing from "@/components/portfolio/PortfolioListing";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getPublishedProjects } from "@/lib/projects";

export const metadata = {
  title: "Portfolio | HD Web Studios",
  description:
    "Explore client websites, web applications, and digital case studies built by HD Web Studios.",
  alternates: {
    canonical: absoluteUrl("/portfolio"),
  },
  openGraph: {
    title: "Portfolio | HD Web Studios",
    description: siteConfig.description,
    url: absoluteUrl("/portfolio"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return <PortfolioListing projects={projects} />;
}
