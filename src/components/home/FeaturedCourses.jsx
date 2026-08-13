import { motion } from "framer-motion";
import { Star, Users, Clock, ArrowUpRight } from "lucide-react";

const courses = [
  ["Full-Stack Bootcamp","Development","A practical path from frontend fundamentals to production apps.","Alex Morgan","4.9","2.4K","18 weeks","$149"],
  ["Machine Learning A-Z","AI & ML","Build predictive models, neural networks, and intelligent products.","Dr. Sarah Khan","4.9","1.8K","16 weeks","$179"],
  ["UI/UX Masterclass","Design","Research, wireframe, prototype and ship polished product experiences.","Maya Chen","4.8","1.3K","12 weeks","$129"],
  ["Digital Marketing 2026","Marketing","SEO, content, paid media, analytics and growth strategy.","Daniel Brooks","4.8","2.1K","10 weeks","$99"],
  ["Cloud Architecture","Cloud","Design secure, scalable infrastructure for modern applications.","Omar Ali","4.9","940","14 weeks","$159"],
  ["Cybersecurity Fundamentals","Security","Learn practical security principles, testing and defense.","Nora Wilson","4.9","1.1K","12 weeks","$139"],
];

export default function FeaturedCourses() {
  return (
    <section id="courses" className="section-space bg-white/[.012]">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Featured courses</div>
            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Learn by building.</h2>
          </div>
          <a href="/courses" className="inline-flex items-center gap-2 font-semibold text-indigo-300 hover:text-white">View all courses <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map(([title,cat,desc,instructor,rating,students,duration,price],i) => (
            <motion.article key={title} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} whileHover={{y:-7}} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a10] transition hover:border-indigo-400/30">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-600/30 via-purple-600/15 to-cyan-500/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.18),transparent_28%)]" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur">{cat}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold group-hover:text-indigo-200">{title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{desc}</p>
                <p className="mt-4 text-xs font-semibold text-slate-400">By {instructor}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 text-amber-300"><Star className="h-3.5 w-3.5 fill-current" />{rating}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{students}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration}</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xl font-black">{price}</span>
                  <a href="/register" className="rounded-lg bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-indigo-500">Enroll</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
