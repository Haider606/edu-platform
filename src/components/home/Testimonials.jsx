import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Khan",
    initials: "AK",
    course: "Full-Stack Development",
    rating: 5,
    quote:
      "The biggest difference for me was the practical approach. I wasn't just watching lessons — I was building projects and understanding why things worked.",
  },
  {
    name: "Hamza Malik",
    initials: "HM",
    course: "Digital Marketing",
    rating: 5,
    quote:
      "The course structure made it much easier to stay consistent. The assignments gave me a reason to actually apply what I learned every week.",
  },
  {
    name: "Sara Ahmed",
    initials: "SA",
    course: "UI/UX Design",
    rating: 5,
    quote:
      "I really liked how the learning experience connected design theory with actual portfolio work. It gave me a much clearer direction.",
  },
  {
    name: "Usman Raza",
    initials: "UR",
    course: "AI & Machine Learning",
    rating: 4,
    quote:
      "The explanations were structured in a way that helped me break difficult topics into smaller pieces. The project work was especially useful.",
  },
  {
    name: "Maham Ali",
    initials: "MA",
    course: "Cybersecurity Fundamentals",
    rating: 5,
    quote:
      "I appreciated that the focus was on understanding rather than simply completing videos. The practical exercises helped reinforce everything.",
  },
  {
    name: "Bilal Hassan",
    initials: "BH",
    course: "Cloud Architecture",
    rating: 5,
    quote:
      "The learning path gave me a much better understanding of what skills I should focus on and how they connect to real-world roles.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Learner stories
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Learning should lead to{" "}
              <span className="text-blue-600">real progress.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Hear from learners who are building practical skills and taking
              their next steps with greater confidence.
            </p>

            <div className="mt-8 hidden gap-3 lg:flex">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl sm:p-10">
              <div className="absolute right-8 top-8 text-blue-100">
                <Quote className="h-16 w-16 fill-current" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < active.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="mt-7 max-w-2xl text-xl font-medium leading-8 tracking-tight text-slate-900 sm:text-2xl sm:leading-9">
                    “{active.quote}”
                  </blockquote>

                  <div className="mt-9 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {active.initials}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-950">
                        {active.name}
                      </p>

                      <p className="mt-0.5 text-sm text-slate-500">
                        {active.course}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-9 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex gap-1.5">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.name}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show testimonial from ${testimonial.name}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-7 bg-blue-600"
                          : "w-1.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2 lg:hidden">
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <span className="hidden text-xs font-medium text-slate-400 sm:block">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}