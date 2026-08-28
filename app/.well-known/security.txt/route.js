import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export async function GET() {
  const content = `Contact: mailto:${siteConfig.email}
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, hi, pa
Canonical: ${siteConfig.url}/.well-known/security.txt
Policy: ${siteConfig.url}/privacy
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
