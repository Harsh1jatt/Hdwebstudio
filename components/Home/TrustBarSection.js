import { CheckCircle2, Gauge, Clock3, ShieldCheck } from "lucide-react";

export default function TrustBarSection({ projectCount = 0, serviceCount = 0 }) {
  const trustItems = [
    { icon: CheckCircle2, value: projectCount > 0 ? `${projectCount}+` : "Custom", label: "Projects Delivered", description: "Real-world digital projects" },
    { icon: Gauge, value: "Fast", label: "Performance Focused", description: "Built for speed and usability" },
    { icon: Clock3, value: "7\u201314 Days", label: "Typical Launch", description: "For standard business websites" },
    { icon: ShieldCheck, value: "100%", label: "Project Ownership", description: "Your website, content and data" },
  ];
  return (
    <section className="relative border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 md:grid-cols-4 md:divide-y-0">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="group relative px-5 py-6 transition-colors duration-200 hover:bg-white sm:px-6">
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:border-blue-200 group-hover:bg-blue-100">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{item.value}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
