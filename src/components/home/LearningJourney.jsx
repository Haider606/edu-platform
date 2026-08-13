import { motion } from "framer-motion";
import { Compass, GraduationCap, ClipboardCheck, Code2, Briefcase, Award, Rocket } from "lucide-react";

const steps = [
  ["Choose a course","Pick a career-focused path that matches your goals.",Compass],
  ["Learn with experts","Follow structured lessons and live instruction.",GraduationCap],
  ["Complete assignments","Practice concepts and receive feedback.",ClipboardCheck],
  ["Build projects","Create portfolio-ready work from real briefs.",Code2],
  ["Join internship","Apply your skills in a guided workplace experience.",Briefcase],
  ["Earn certificate","Complete your course and prove your progress.",Award],
  ["Prepare for career","Polish your portfolio, CV and interview skills.",Rocket],
];

export default function LearningJourney() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">The learning journey</div>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">From first lesson to real opportunity.</h2>
        </div>
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-cyan-400/0 md:left-1/2 md:block" />
          <div className="space-y-8">
            {steps.map(([title,text,Icon],i) => (
              <motion.div key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className={`relative flex items-start gap-5 md:w-1/2 ${i%2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}>
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-[#0a0a10] text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,.15)]"><Icon className="h-4 w-4" /></div>
                <div className="glass flex-1 rounded-2xl p-5"><div className="text-xs font-bold text-indigo-300">0{i+1}</div><h3 className="mt-1 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
