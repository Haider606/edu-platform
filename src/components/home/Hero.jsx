import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, BookOpen, Trophy } from "lucide-react";
import Hero3D from "./Hero3D";

const stats = [
  { value: "10K+", label: "Learners", icon: Users },
  { value: "250+", label: "Courses", icon: BookOpen },
  { value: "95%", label: "Success Rate", icon: Trophy },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden pt-16 lg:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="section-shell relative">
        <div className="grid min-h-[760px] items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="eyebrow">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_14px_#22d3ee]" />
              AI-Powered Learning Platform
            </div>

            <h1 className="text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              Learn Skills.
              <br />
              Build Your <span className="text-gradient">Future.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Master practical, career-ready skills with expert instructors,
              live classes, real projects, AI-powered guidance, and a path from
              learning to opportunity.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold shadow-[0_0_35px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[.03] px-6 py-3.5 font-bold text-white transition hover:border-indigo-400/40 hover:bg-white/[.07]"
              >
                <Play className="h-4 w-4 fill-current" />
                Explore Courses
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[.025] p-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="px-3 text-center">
                  <Icon className="mx-auto mb-2 h-4 w-4 text-indigo-300" />
                  <div className="text-xl font-black sm:text-2xl">{value}</div>
                  <div className="mt-1 text-[11px] text-slate-500 sm:text-xs">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: .94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .9, delay: .15 }}
            className="relative h-[480px] lg:h-[650px]"
          >
            <Hero3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
