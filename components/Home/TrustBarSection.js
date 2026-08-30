import { CheckCircle2, Gauge, Clock3, ShieldCheck } from "lucide-react";

export default function TrustBarSection({ projectCount = 0, serviceCount = 0 }) {
  const trustItems = [
    { icon: CheckCircle2, value: projectCount > 0 ? `${projectCount}+` : "100% Custom", label: "Projects Delivered", description: "Production Next.js deployments" },
    { icon: Gauge, value: "< 0.8s", label: "Sub-Second LCP", description: "Optimized Core Web Vitals speed" },
    { icon: Clock3, value: "7–14 Days", label: "Guaranteed Delivery", description: "Fast turnaround with zero delays" },
    { icon: ShieldCheck, value: "100%", label: "Source Code Ownership", description: "Full GitHub & database transfer" },
  ];

  return (
    <section className="relative border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 shadow-xs md:grid-cols-4 md:divide-y-0">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="group relative p-6 transition-colors duration-200 hover:bg-white sm:p-7">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-2xl font-black tracking-tight text-slate-950">{item.value}</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-800">{item.label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{item.description}</p>
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
