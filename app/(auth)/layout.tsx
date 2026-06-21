"use client";

import Logo from "@/components/Logo/Logo";
import { routes } from "@/utils/routes";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <main className="h-screen w-full bg-slate-50 flex items-stretch text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-brand-ink lg:w-[45%] xl:w-[40%] bg-white flex flex-col justify-between p-8 sm:p-12 md:p-20 relative z-10 shadow-2xl shadow-slate-200/50">
        <Link href={routes.login}>
          <Logo />
        </Link>

        <div className="w-full max-w-md mx-auto my-auto py-12">{children}</div>

        <p className="text-xs text-slate-400 text-center lg:text-left">
          &copy; 2026 Aba Padhxu. All rights reserved.
        </p>
      </div>

      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] bg-slate-950 relative overflow-hidden items-center justify-center p-16">
        {/* Dynamic Abstract Geometric Glowing Background Components */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/15 blur-[140px] pointer-events-none" />

        {/* Linear Grid Mesh Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        {/* Floating Interactive Decorative Card Overlay UI */}
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-2xl shadow-2xl relative z-10 transform translate-y-4 hover:-translate-y-0 transition-transform duration-700 ease-out">
          {/* Header Row Mock */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-amber-500/70" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="text-xs font-mono text-slate-500 ml-2">
                metrics_pipeline.yaml
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400">
              Live Monitoring
            </div>
          </div>

          {/* Static Chart Mock Layout */}
          <div className="space-y-5">
            <div className="h-4 w-1/3 bg-slate-800 rounded-md animate-pulse" />

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950/50 border border-slate-800/50 p-4 rounded-xl space-y-1">
                <span className="text-xs font-medium text-slate-500">
                  API Requests
                </span>
                <p className="text-xl font-bold tracking-tight text-white">
                  412.9k
                </p>
                <span className="text-[10px] font-semibold text-emerald-400">
                  +14.2%
                </span>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/50 p-4 rounded-xl space-y-1">
                <span className="text-xs font-medium text-slate-500">
                  Avg. Latency
                </span>
                <p className="text-xl font-bold tracking-tight text-white">
                  24.1ms
                </p>
                <span className="text-[10px] font-semibold text-emerald-400">
                  -4.8%
                </span>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/50 p-4 rounded-xl space-y-1">
                <span className="text-xs font-medium text-slate-500">
                  Server Status
                </span>
                <p className="text-xl font-bold tracking-tight text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Optimal
                </p>
                <span className="text-[10px] font-medium text-slate-500">
                  99.99% Uptime
                </span>
              </div>
            </div>

            {/* Simulated Graphic Lines */}
            <div className="pt-4 h-32 w-full flex items-end gap-2">
              {[
                40, 55, 45, 60, 75, 65, 80, 95, 85, 100, 90, 115, 130, 110, 145,
              ].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-linear-to-t from-indigo-600 to-violet-400 rounded-t-sm opacity-80"
                  style={{ height: `${(height / 145) * 100}%` }}
                />
              ))}
            </div>

            <p className="text-sm text-slate-400 text-center font-medium pt-2">
              “The absolute fastest execution architecture we’ve ever
              experienced.”
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
