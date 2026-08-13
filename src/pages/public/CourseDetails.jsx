import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const courseData = {
  "full-stack-bootcamp": {
    title: "Full-Stack Web Development Bootcamp",
    category: "Web Development",
    instructor: "Alex Morgan",
    rating: "4.9",
    students: "2,400",
    duration: "12 weeks",
    price: "$49",
    description:
      "Learn modern frontend and backend development by building production-style applications from start to finish.",
    lessons: [
      "HTML, CSS and modern JavaScript",
      "React and component architecture",
      "APIs and backend fundamentals",
      "Databases and authentication",
      "Deployment and production workflows",
    ],
  },

  "machine-learning-a-z": {
    title: "Machine Learning A-Z",
    category: "AI & Machine Learning",
    instructor: "Dr. Sarah Khan",
    rating: "4.8",
    students: "1,800",
    duration: "14 weeks",
    price: "$59",
    description:
      "Build a strong understanding of machine learning concepts and apply them to practical problems.",
    lessons: [
      "Python for machine learning",
      "Data preparation",
      "Supervised learning",
      "Model evaluation",
      "Practical machine learning projects",
    ],
  },
};

const defaultCourse = {
  title: "Professional Skills Masterclass",
  category: "Professional Development",
  instructor: "EduVerse Instructor",
  rating: "4.8",
  students: "1,000+",
  duration: "10 weeks",
  price: "$49",
  description:
    "Develop practical skills through structured lessons, exercises and project-based learning.",
  lessons: [
    "Core concepts and foundations",
    "Practical exercises",
    "Real-world workflows",
    "Portfolio project",
    "Career preparation",
  ],
};

export default function CourseDetails() {
  const { id } = useParams();

  const course = courseData[id] || defaultCourse;

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.4fr_.6fr] lg:items-center lg:pb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
              {course.category}
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
              {course.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {course.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </span>

              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {course.students} students
              </span>

              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {course.duration}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/30 to-cyan-500/10">
              <PlayCircle className="h-16 w-16 text-white/80" />
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Course price</p>
                <p className="mt-1 text-4xl font-bold">{course.price}</p>
              </div>
            </div>

            <Link
              to="/admission"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold transition hover:bg-indigo-500"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.5fr_.5fr]">
        <div>
          <h2 className="text-3xl font-bold">Course overview</h2>

          <p className="mt-5 leading-8 text-slate-400">
            This course combines structured learning with practical exercises
            so you can turn concepts into useful skills.
          </p>

          <h2 className="mt-14 text-3xl font-bold">What you'll learn</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {course.lessons.map((lesson) => (
              <div
                key={lesson}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                <span className="text-sm text-slate-300">{lesson}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-3xl font-bold">Curriculum</h2>

          <div className="mt-6 space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-300">
                  {index + 1}
                </span>

                <div>
                  <p className="font-semibold">{lesson}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Practical learning module
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="sticky top-28 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h3 className="text-lg font-bold">Your instructor</h3>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold">
                {course.instructor
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <p className="font-semibold">{course.instructor}</p>
                <p className="text-sm text-slate-500">
                  Industry instructor
                </p>
              </div>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <h3 className="font-bold">Requirements</h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Basic computer skills and a willingness to practice. Specific
              prerequisites may vary by course level.
            </p>
          </div>
        </aside>
      </section>

      {/* Reviews */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Student reviews</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              "The project-based structure made the concepts much easier to understand.",
              "I liked the balance between lessons and practical exercises.",
              "The course gave me a much clearer direction for my learning journey.",
            ].map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  "{review}"
                </p>

                <p className="mt-5 text-sm font-semibold text-white">
                  Student {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}