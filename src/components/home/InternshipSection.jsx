import { motion } from "framer-motion";
import { BriefcaseBusiness, Users, FolderKanban, BadgeCheck, MessageSquareQuote, ArrowRight, TrendingUp } from "lucide-react";

const benefits = [
  ["Real client briefs",FolderKanban],
  ["Mentor feedback",Users],
  ["Portfolio projects",BriefcaseBusiness],
  ["Completion proof",BadgeCheck],
  ["Career confidence",TrendingUp],
];

export default function InternshipSection() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-950/50 via-[#0b0b12] to-cyan-950/20 p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
            <div>
              <div className="eyebrow">Internship experience</div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Don&apos;t just learn it. <span className="text-gradient">Build it.</span></h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-400">Turn your coursework into evidence. Work through guided projects, receive feedback, and finish with something you can confidently show.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map(([label,Icon]) => <div key={label} className="flex items-center gap-3 text-sm font-semibold text-slate-300"><Icon className="h-4 w-4 text-cyan-300" />{label}</div>)}
              </div>
              <a href="/register" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-indigo-100">Join the journey <ArrowRight className="h-4 w-4" /></a>
            </div>
            <motion.div initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} className="grid grid-cols-2 gap-3">
              {[
                ["92%","Project completion"],
                ["4.8/5","Mentor rating"],
                ["500+","Projects shipped"],
                ["87%","Confidence gain"],
              ].map(([value,label]) => <div key={label} className="glass rounded-2xl p-5"><div className="text-2xl font-black">{value}</div><div className="mt-2 text-xs leading-5 text-slate-500">{label}</div></div>)}
              <div className="col-span-2 glass rounded-2xl p-5">
                <div className="flex items-start gap-3"><MessageSquareQuote className="mt-1 h-5 w-5 text-indigo-300" /><p className="text-sm leading-6 text-slate-300">“The internship made my portfolio feel real. I knew what to talk about in interviews because I had actually built things.”</p></div>
                <div className="mt-3 text-xs font-semibold text-slate-500">— Ayesha, Full-Stack graduate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
