import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "full-stack-bootcamp",
    category: "Web Development",
    level: "Beginner",
    price: 49,
    rating: 4.9,
    students: 2400,
    duration: "12 weeks",
    title: "Full-Stack Web Development Bootcamp",
    instructor: "Alex Morgan",
    description:
      "Learn modern frontend and backend development by building production-style applications.",
  },
  {
    id: "machine-learning-a-z",
    category: "AI & Machine Learning",
    level: "Intermediate",
    price: 59,
    rating: 4.8,
    students: 1800,
    duration: "14 weeks",
    title: "Machine Learning A-Z",
    instructor: "Dr. Sarah Khan",
    description:
      "Understand machine learning fundamentals and build practical predictive models.",
  },
  {
    id: "ui-ux-masterclass",
    category: "UI/UX Design",
    level: "Beginner",
    price: 39,
    rating: 4.9,
    students: 1300,
    duration: "8 weeks",
    title: "UI/UX Design Masterclass",
    instructor: "Emma Wilson",
    description:
      "Design user-centered digital experiences from research to polished interfaces.",
  },
  {
    id: "digital-marketing",
    category: "Digital Marketing",
    level: "Beginner",
    price: 35,
    rating: 4.7,
    students: 2100,
    duration: "7 weeks",
    title: "Digital Marketing Strategy",
    instructor: "Daniel Lee",
    description:
      "Learn SEO, content strategy, social media and performance marketing.",
  },
  {
    id: "cloud-architecture",
    category: "Cloud Computing",
    level: "Advanced",
    price: 69,
    rating: 4.8,
    students: 920,
    duration: "10 weeks",
    title: "Cloud Architecture",
    instructor: "Michael Chen",
    description:
      "Learn how to design scalable and reliable cloud infrastructure.",
  },
  {
    id: "cybersecurity-fundamentals",
    category: "Cyber Security",
    level: "Intermediate",
    price: 55,
    rating: 4.8,
    students: 1500,
    duration: "9 weeks",
    title: "Cybersecurity Fundamentals",
    instructor: "James Carter",
    description:
      "Build a strong foundation in security principles, threats and defense.",
  },
];

const categories = [
  "All",
  "Web Development",
  "AI & Machine Learning",
  "UI/UX Design",
  "Digital Marketing",
  "Cloud Computing",
  "Cyber Security",
];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel = level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  return (
    <main className="min-h-screen bg-[#050508] px-5 pb-24 pt-32 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300"
          >
            Explore the library
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold sm:text-6xl"
          >
            Learn skills that move your{" "}
            <span className="text-gradient">career forward.</span>
          </motion.h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Practical courses created around real skills, projects and
            professional outcomes.
          </p>
        </section>

        {/* Search */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-500"
            >
              <option value="All">All levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Results */}
        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="text-slate-300">{filteredCourses.length}</span>{" "}
            courses
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.12),transparent_30%)]" />

                <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 backdrop-blur">
                  <BookOpen className="h-6 w-6 text-indigo-300" />
                </div>

                <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                  {course.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold leading-7 text-white">
                  {course.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {course.description}
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  By{" "}
                  <span className="text-slate-300">{course.instructor}</span>
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {course.duration}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-2xl font-bold">${course.price}</span>

                  <Link
                    to={`/courses/${course.id}`}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-600"
                  >
                    View Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold">No courses found.</p>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}