import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  ["AK","Ayesha Khan","Full-Stack Bootcamp","EduPlatform gave me a structure I was missing. The projects made the difference.","4.9"],
  ["JM","James Miller","Digital Marketing 2026","The instructors explain things clearly and the assignments feel connected to real work.","5.0"],
  ["SC","Sofia Chen","UI/UX Masterclass","I went from collecting tutorials to actually shipping a complete product case study.","4.9"],
  ["OH","Omar Hassan","Machine Learning A-Z","The combination of live support and AI practice helped me stay consistent.","4.8"],
];

export default function Testimonials() {
  return (
    <section className="section-space bg-white/[.012]">
      <div className="section-shell">
        <div className="text-center">
          <div className="eyebrow">Learner stories</div>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Progress feels better together.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.map(([initials,name,course,quote,rating],i) => (
            <motion.article key={name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} className="glass rounded-2xl p-6 sm:p-7">
              <div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black">{initials}</div><div><div className="font-bold">{name}</div><div className="text-xs text-slate-500">{course}</div></div></div><Quote className="h-6 w-6 text-indigo-400/50" /></div>
              <div className="mt-6 flex gap-1">{Array.from({length:5}).map((_,n)=><Star key={n} className="h-4 w-4 fill-amber-300 text-amber-300" />)}<span className="ml-1 text-xs text-slate-500">{rating}</span></div>
              <p className="mt-5 leading-7 text-slate-400">“{quote}”</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
