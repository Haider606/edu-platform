import { motion } from "framer-motion";
import { Code2, BrainCircuit, Megaphone, Palette, BriefcaseBusiness, ShieldCheck, Cloud, Languages } from "lucide-react";

const items = [
  [Code2,"Web Development","Build modern websites and apps","42 courses"],
  [BrainCircuit,"AI & ML","Train models and ship AI products","31 courses"],
  [Megaphone,"Digital Marketing","Grow brands with measurable strategy","28 courses"],
  [Palette,"UI/UX Design","Design experiences people love","24 courses"],
  [BriefcaseBusiness,"Business","Turn ideas into sustainable businesses","35 courses"],
  [ShieldCheck,"Cyber Security","Protect systems and digital assets","22 courses"],
  [Cloud,"Cloud Computing","Master scalable cloud infrastructure","19 courses"],
  [Languages,"English & Communication","Communicate with confidence","18 courses"],
];

export default function Categories() {
  return (
    <section id="categories" className="section-space">
      <div className="section-shell">
        <SectionIntro eyebrow="Explore your path" title="Skills that move careers forward." text="Choose a high-demand path and learn through practical, guided experiences." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon,title,desc,count],i) => (
            <motion.a href="/courses" key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.04}} whileHover={{y:-6}} className="group glass glow-border rounded-2xl p-6 transition">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 transition group-hover:bg-indigo-500/20 group-hover:text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{desc}</p>
              <div className="mt-5 text-xs font-semibold text-indigo-300">{count}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({eyebrow,title,text}) {
  return (
    <div className="max-w-2xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-500">{text}</p>
    </div>
  );
}
