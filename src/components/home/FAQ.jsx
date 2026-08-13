import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const questions = [
  ["What courses can I take?","You can choose from practical paths across development, AI, design, marketing, business, cybersecurity, cloud and communication."],
  ["Do I receive a certificate?","Yes. When you complete the required course work, your platform certificate is issued so you can add it to your professional profile."],
  ["Are classes live?","Selected programs include live classes with instructors, plus recorded material so you can review lessons at your own pace."],
  ["How do internships work?","Eligible learners can join a guided internship pathway where they work on practical briefs, receive feedback and build portfolio evidence."],
  ["How do payments work?","You can choose a plan and complete the payment through the available checkout options. Your access is activated after confirmation."],
  ["What can the AI features do?","EduAI can explain concepts, generate practice, help structure study plans and provide learning feedback. It supports instructors rather than replacing them."],
];

export default function FAQ() {
  const [open,setOpen] = useState(0);
  return (
    <section className="section-space">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">FAQ</div>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Questions, answered.</h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {questions.map(([q,a],i) => (
            <div key={q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">
              <button onClick={()=>setOpen(open===i ? -1 : i)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold">
                <span>{q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${open===i ? "rotate-180 text-indigo-300" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open===i && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p className="px-5 pb-5 text-sm leading-7 text-slate-500">{a}</p></motion.div>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
