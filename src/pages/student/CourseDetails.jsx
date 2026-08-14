import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  Play,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

/*
 * The route parameter identifies a course only.
 *
 * Learning tables are not available in the current database, so this page
 * deliberately does not query Supabase and does not treat the parameter as
 * a student/user identifier.
 */
const course = null;

function CourseShell({ data }) {
  const progress = Math.min(100, Math.max(0, Number(data.progress) || 0));
  const completedLessons = Number(data.completedLessons) || 0;
  const totalLessons = Number(data.totalLessons) || 0;
  const remainingLessons = Math.max(totalLessons - completedLessons, 0);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="flex min-h-64 items-center justify-center bg-slate-100">
            {data.thumbnail ? (
              <img
                src={data.thumbnail}
                alt=""
                className="h-full min-h-64 w-full object-cover"
              />
            ) : (
              <BookOpen size={56} className="text-blue-600" strokeWidth={1.5} />
            )}
          </div>

          <div className="p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
              {data.status || "Course"}
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {data.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <UserRound size={16} />
              {data.instructor || "Instructor"}
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              {data.description || "Course description will appear here when course content is available."}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-slate-600">Progress</span>
                <span className="font-bold text-slate-950">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7 }}
                  className="h-full rounded-full bg-blue-600"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">Completed</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{completedLessons}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">Remaining</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{remainingLessons}</p>
              </div>
              <div className="col-span-2 rounded-xl bg-slate-50 p-3 sm:col-span-1">
                <p className="text-[11px] text-slate-500">Last activity</p>
                <p className="mt-1 truncate text-sm font-bold text-slate-950">
                  {data.lastActivity || "No activity"}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={!data.continueUrl}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 sm:w-auto"
            >
              <Play size={16} />
              Continue Learning
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Curriculum</p>
          <h2 className="mt-1 text-lg font-bold text-slate-950">Course content</h2>
          <p className="mt-1 text-sm text-slate-500">
            Modules and lessons will appear here when course content is available.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
            <Circle size={20} />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Curriculum will appear here when course content is available.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Modules, lessons, and completion states are ready to connect later.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function CourseDetails() {
  const { id } = useParams();
  const [loading] = useState(false);
  const [error] = useState(null);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-950">Course couldn't be loaded</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          We couldn't load this course right now. Please try again later.
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BookOpen size={28} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
            Course {id ? "Unavailable" : "Details"}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            Course not found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            The course you're looking for is unavailable.
          </p>

          <Link
            to="/student/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Courses
          </Link>
        </div>
      </motion.div>
    );
  }

  return <CourseShell data={course} />;
}
