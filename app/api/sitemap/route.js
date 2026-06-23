import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Project from '../../../models/Project';

const staticRoutes = ['/', '/about', '/services', '/portfolio', '/pricing', '/contact', '/thank-you'];

function buildUrl(host, path) {
  return `${host}${path}`;
}

export async function GET(req) {
  try {
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'https://hdwebstudio.vercel.app';
    let urls = staticRoutes.map(p=>buildUrl(host, p));

    try {
      await connectDB();
      const projects = await Project.find().lean();
      projects.forEach(p=>urls.push(buildUrl(host, `/portfolio/${p.slug}`)));
    } catch (e) {
      // ignore DB errors
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Sitemap error' }, { status: 500 });
  }
}
