import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  ["Starter","$19","For focused self-paced learners",["Course access","Assignments","Community support","Certificate"]],
  ["Professional","$49","For learners who want guided momentum",["Everything in Starter","Live classes","AI tutor","Mentor feedback","Project reviews"]],
  ["Career","$89","For learners preparing for opportunity",["Everything in Professional","Internship pathway","Career support","Portfolio review","Interview preparation"]],
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-space">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Simple pricing</div>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Choose the pace that fits you.</h2>
          <p className="mt-4 text-slate-500">Start small, upgrade when you are ready. No confusing tiers.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
          {plans.map(([name,price,desc,features],i) => {
            const featured = i === 1;
            return <motion.div key={name} whileHover={{y:-7}} className={`relative rounded-3xl p-7 ${featured ? "glow-border bg-gradient-to-b from-indigo-500/15 to-white/[.03]" : "glass"}`}>
              {featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest">Most popular</div>}
              <h3 className="text-xl font-black">{name}</h3>
              <p className="mt-2 min-h-12 text-sm text-slate-500">{desc}</p>
              <div className="mt-7"><span className="text-4xl font-black">{price}</span><span className="text-slate-500"> / month</span></div>
              <a href="/register" className={`mt-7 block rounded-xl px-4 py-3 text-center text-sm font-bold ${featured ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/5 hover:bg-white/10"}`}>Get started</a>
              <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                {features.map(f => <div key={f} className="flex gap-3 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />{f}</div>)}
              </div>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}
