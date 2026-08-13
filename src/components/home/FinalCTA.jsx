import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-space pt-8">
      <div className="section-shell">
        <motion.div initial={{opacity:0,scale:.98}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} className="relative overflow-hidden rounded-[2rem] border border-indigo-400/20 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-500/10 px-6 py-16 text-center sm:px-10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-indigo-200"><Sparkles className="h-3.5 w-3.5" /> Start your next chapter</div>
            <h2 className="mx-auto max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">Your next opportunity starts with what you learn today.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">Build the skills, confidence and evidence you need to move forward.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500">Start Learning <ArrowRight className="h-4 w-4" /></a>
              <a href="/courses" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold hover:bg-white/10">Browse Courses</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
