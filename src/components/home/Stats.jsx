import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, UserRoundCheck, FolderKanban, HeartHandshake } from "lucide-react";

const stats = [
  ["10,000+","Students",Users],
  ["250+","Courses",BookOpen],
  ["100+","Instructors",UserRoundCheck],
  ["500+","Projects",FolderKanban],
  ["95%","Satisfaction",HeartHandshake],
];

export default function Stats() {
  const ref = useRef(null);
  const visible = useInView(ref, { once:true, amount:.35 });
  return (
    <section className="section-space">
      <div ref={ref} className="section-shell">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/[.07] via-white/[.02] to-cyan-500/[.06] p-6 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map(([value,label,Icon],i) => <Stat key={label} value={value} label={label} Icon={Icon} active={visible} delay={i*.08} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({value,label,Icon,active,delay}) {
  const [shown,setShown] = useState("0");
  useEffect(() => {
    if (!active) return;
    const match = value.replace(/,/g,"").match(/(\d+)(.*)/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    let start = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += Math.max(1, Math.ceil(target/30));
        if (start >= target) { start = target; clearInterval(interval); }
        setShown(start.toLocaleString()+suffix);
      }, 35);
      return () => clearInterval(interval);
    }, delay*1000);
    return () => clearTimeout(timer);
  }, [active, value, delay]);
  return <motion.div initial={{opacity:0,y:15}} animate={active ? {opacity:1,y:0}: {}} className="text-center">
    <Icon className="mx-auto h-5 w-5 text-indigo-300" />
    <div className="mt-3 text-3xl font-black">{shown}</div>
    <div className="mt-1 text-xs text-slate-500">{label}</div>
  </motion.div>;
}
