import { motion } from "framer-motion";

const companies = ["Microsoft","Google","Amazon","Adobe","IBM","Meta","Netflix","Spotify"];

export default function TrustedCompanies() {
  return (
    <section className="border-y border-white/[.06] bg-white/[.018] py-10">
      <div className="section-shell">
        <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center">
          <p className="text-sm font-semibold text-slate-500">Built for ambitious learners</p>
          <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
            {companies.map((name) => (
              <div key={name} className="text-sm font-bold tracking-tight text-slate-500 transition hover:text-white">{name}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
