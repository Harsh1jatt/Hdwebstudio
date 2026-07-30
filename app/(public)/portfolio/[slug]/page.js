import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Image from 'next/image';

const staticProjects = [
  {
    slug: 'raretech',
    title: 'Raretech Institute Management System',
    category: 'Full Website + Admin Panel + Exam Portal',
    desc: 'Modern website and admin panel for institute management.',
    tech: ['Next.js','MongoDB','Node.js'],
    img: '/projects/raretech.png',
    live: 'http://raretech.co.in/',
  },
  {
    slug: 'jmdsolar',
    title: 'JMD Solar Energy Website',
    category: 'WordPress Business Website',
    desc: 'Business website for solar energy firm.',
    tech: ['WordPress','PHP'],
    img: '/projects/jmdsolar.png',
    live: 'https://jmdsolarenergy.ct.ws/',
  },
  {
    slug: 'luxe',
    title: 'Luxury Jewelry E-Commerce UI',
    category: 'Premium Frontend Demo',
    desc: 'E-commerce UI design for luxury brand.',
    tech: ['Next.js','Tailwind'],
    img: '/projects/luxe.png',
    live: 'https://luxe-jewel-blueprint.vercel.app/',
  },
  {
    slug: 'restaurant',
    title: 'Restaurant Website Demo',
    category: 'Conversion Focused Landing',
    desc: 'Landing page demo for restaurant.',
    tech: ['Next.js','Tailwind'],
    img: '/projects/restaurant.png',
    live: 'https://restrorantdemo1.vercel.app/',
  },
];

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const proj = staticProjects.find(p=>p.slug===slug);
  return {
    title: proj ? `${proj.title} — HD Web Studio` : 'Project — HD Web Studio',
    description: proj ? proj.desc : 'Project case study',
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = params;
  let project = null;
  try {
    await connectDB();
    project = await Project.findOne({ slug }).lean();
  } catch (e) {
    // ignore DB errors and fallback to static
    console.error('project fetch error', e);
  }

  if (!project) {
    project = staticProjects.find(p=>p.slug===slug) || null;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Project not found</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-slate-600">{project.category}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden shadow">
            <Image src={project.img} alt={project.title} width={1200} height={700} className="object-cover" />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Overview</h3>
            <p className="text-slate-700 mb-4">{project.desc}</p>

            <h4 className="font-semibold mb-2">Tech & Tools</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech?.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded bg-slate-100 text-sm">{t}</span>
              ))}
            </div>

            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">View Live</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
