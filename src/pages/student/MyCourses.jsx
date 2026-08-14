import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const FILTERS = ["All", "In Progress", "Completed"];

/*
 * Stage 2 data contract.
 *
 * This page intentionally starts with an empty collection because the
 * learning tables are not available in the current database.
 */
const courses = [];

function CourseCard({ course }) {
  const progress = Math.min(100, Math.max(0, Number(course.progress) || 0));

  return (
    <Link
      to={`/student/courses/${course.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 text-blue-600">
            <BookOpen size={38} strokeWidth={1.6} />
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
          {course.status || "In Progress"}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-bold text-slate-950">
          {course.title}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500">
          {course.instructor || "Instructor"}
        </p>

        {course.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {course.description}
          </p>
        )}

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              {course.completedLessons ?? 0} of {course.totalLessons ?? 0} lessons
            </span>
            <span className="font-bold text-slate-900">{progress}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Clock3 size={14} />
            {course.lastActivity || "No recent activity"}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            Open course
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PageMessage({ type = "empty", title, description, action }) {
  const isError = type === "error";

  return (
    <div
      className={[
        "rounded-2xl border bg-white px-6 py-14 text-center sm:px-10",
        isError ? "border-red-100" : "border-slate-200",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl",
          isError ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600",
        ].join(" ")}
      >
        {isError ? <Sparkles size={24} /> : <BookOpen size={24} />}
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-950">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default function MyCourses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [error] = useState(null);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "In Progress" && course.status === "In Progress") ||
        (activeFilter === "Completed" && course.status === "Completed");

      const matchesSearch =
        !normalizedSearch ||
        [course.title, course.instructor, course.description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Learning</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Continue learning and keep progressing toward your goals.
          </p>
        </div>

        <Link
          to="/courses"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Courses
          <ArrowRight size={16} />
        </Link>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "rounded-xl px-3.5 py-2 text-xs font-semibold transition",
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <SlidersHorizontal size={14} />
          <span>Filters are ready for connected course data.</span>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="aspect-[16/9] animate-pulse bg-slate-100" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                <div className="h-2 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <PageMessage
          type="error"
          title="Courses couldn't be loaded"
          description="We couldn't load your course information right now. Please try again later."
        />
      ) : filteredCourses.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <PageMessage
          title="No courses yet"
          description="You haven't enrolled in any courses yet."
          action={
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Courses
              <ArrowRight size={16} />
            </Link>
          }
        />
      )}
    </motion.div>
  );
}
