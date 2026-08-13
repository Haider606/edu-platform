import { motion } from "framer-motion";
import { GraduationCap, Radio, BrainCircuit, ClipboardCheck, Boxes, Briefcase, Award, Headphones } from "lucide-react";

const features = [
  [GraduationCap,"Expert instructors","Learn from people who build in the real world.","lg:col-span-2"],
  [Radio,"Live classes","Ask questions, collaborate and stay accountable.",""],
  [BrainCircuit,"AI learning","Personalized guidance when you need it.",""],
  [ClipboardCheck,"Assignments","Practice with structured feedback.",""],
  [Boxes,"Real projects","Build portfolio evidence, not just notes.",""],
  [Briefcase,"Internships","Turn learning into workplace experience.","lg:col-span-2"],
  [Award,"Certificates","Show verified progress to employers.",""],
  [Headphones,"Career support","Get practical help beyond the classroom.",""],
];

export default function WhyChooseUs() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <div className="max-w-2xl">
          <div className="eyebrow">Why EduPlatform</div>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">A learning system, not another video library.</h2>
        </div>
        <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon,title,text,span],i) => (
            <motion.div key={title} initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.04}} className={`glass rounded-2xl p-6 ${span}`}>
              <div className="flex h-full min-h-40 flex-col justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 text-indigo-300"><Icon className="h-5 w-5" /></div>
                <div className="mt-8"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
