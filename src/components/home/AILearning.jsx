import { motion } from "framer-motion";
import { Bot, Sparkles, CheckCircle2, MessageCircle, Lightbulb, Target } from "lucide-react";

const features = [
  ["Instant explanations","Ask questions and get simple explanations at your level.",Lightbulb],
  ["Assignment feedback","Receive guidance before you submit your final work.",CheckCircle2],
  ["Personal study plans","Turn your goals into an achievable weekly plan.",Target],
  ["Practice generation","Create quizzes and challenges around your weak areas.",Sparkles],
  ["24/7 learning companion","Keep learning when a teacher is not online.",MessageCircle],
];

export default function AILearning() {
  return (
    <section className="section-space bg-gradient-to-b from-indigo-950/10 to-transparent">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> AI-powered</div>
            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Your AI tutor, whenever you need it.</h2>
            <p className="mt-5 leading-7 text-slate-500">Use AI to understand difficult concepts, practice deliberately, and move faster without replacing the human instructors who guide your journey.</p>
            <div className="mt-8 space-y-4">
              {features.map(([title,text,Icon],i) => (
                <motion.div key={title} initial={{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06}} className="flex gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300"><Icon className="h-4 w-4" /></div>
                  <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass glow-border rounded-3xl p-4 sm:p-6">
            <div className="rounded-2xl border border-white/10 bg-[#08080d]">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400"><Bot className="h-5 w-5 text-white" /></div>
                <div><div className="text-sm font-bold">EduAI Tutor</div><div className="text-xs text-emerald-400">● Online</div></div>
              </div>
              <div className="space-y-5 p-5">
                <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-3 text-sm">Can you explain React state in a simple way?</div>
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[.04] px-4 py-3 text-sm leading-6 text-slate-300">
                  Think of state as memory for a component. When the memory changes, React updates the screen so your interface stays in sync.
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" /> AI is preparing a practice question...</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
