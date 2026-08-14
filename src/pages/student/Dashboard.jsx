import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  CalendarDays,
  Clock3,
  Play,
  Award,
  Flame,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const demoData = {
  stats: {
    enrolled: 6,
    completed: 2,
    assignmentsDue: 3,
    progress: 78,
  },

  continueLearning: {
    title: "Full Stack Web Development",
    lesson: "Module 4 · React Fundamentals",
    progress: 68,
    lessonsCompleted: 34,
    totalLessons: 50,
  },

  classes: [
    {
      course: "React Fundamentals",
      teacher: "Sarah Ahmed",
      time: "7:00 PM",
      duration: "60 min",
      status: "Upcoming",
    },
    {
      course: "JavaScript Advanced",
      teacher: "Ali Hassan",
      time: "Tomorrow · 6:00 PM",
      duration: "90 min",
      status: "Upcoming",
    },
  ],

  assignments: [
    {
      title: "Build a React Dashboard",
      course: "React Fundamentals",
      due: "Today",
      priority: "High",
      status: "Pending",
    },
    {
      title: "JavaScript API Project",
      course: "JavaScript Advanced",
      due: "Tomorrow",
      priority: "Medium",
      status: "Pending",
    },
    {
      title: "Responsive Website",
      course: "Frontend Development",
      due: "Aug 18",
      priority: "Low",
      status: "Submitted",
    },
  ],

  activity: [
    {
      title: "Completed React Hooks lesson",
      time: "2 hours ago",
      icon: CheckCircle2,
    },
    {
      title: "Submitted Responsive Website",
      time: "Yesterday",
      icon: ClipboardList,
    },
    {
      title: "Joined JavaScript live class",
      time: "2 days ago",
      icon: Play,
    },
    {
      title: "Scored 92% on React quiz",
      time: "3 days ago",
      icon: Award,
    },
  ],
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

function StatCard({ icon: Icon, label, value, suffix, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        {suffix && (
          <span className="text-2xl font-bold text-slate-900">
            {value}
            <span className="text-sm font-medium text-slate-400">
              {suffix}
            </span>
          </span>
        )}

        {!suffix && (
          <span className="text-2xl font-bold text-slate-900">
            {value}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { user, profile } = useAuth();

  const studentName =
    profile?.full_name ||
    profile?.name ||
    user?.user_metadata?.full_name ||
    "Student";

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <p className="text-sm font-medium text-blue-600">
            Your learning overview
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {getGreeting()}, {studentName.split(" ")[0]} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your learning today.
          </p>
        </div>

        <Link
          to="/student/my-courses"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View my courses
          <ArrowRight size={16} />
        </Link>
      </motion.section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Courses Enrolled"
          value={demoData.stats.enrolled}
          description="Active learning programs"
        />

        <StatCard
          icon={CheckCircle2}
          label="Courses Completed"
          value={demoData.stats.completed}
          description="Successfully completed"
        />

        <StatCard
          icon={ClipboardList}
          label="Assignments Due"
          value={demoData.stats.assignmentsDue}
          description="Needs your attention"
        />

        <StatCard
          icon={TrendingUp}
          label="Overall Progress"
          value={demoData.stats.progress}
          suffix="%"
          description="Across your learning"
        />
      </section>

      {/* Continue Learning */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Continue learning
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-950">
              Pick up where you left off
            </h2>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Demo data
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-slate-900 lg:w-56">
            <BookOpen size={42} className="text-blue-400" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              {demoData.continueLearning.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {demoData.continueLearning.lesson}
            </p>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-medium text-slate-500">
                  {demoData.continueLearning.lessonsCompleted} of{" "}
                  {demoData.continueLearning.totalLessons} lessons
                </span>

                <span className="font-bold text-slate-900">
                  {demoData.continueLearning.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${demoData.continueLearning.progress}%`,
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-blue-600"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Play size={16} />
            Continue
          </button>
        </div>
      </section>

      {/* Classes + Assignments */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Classes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-950">
                Upcoming classes
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your next live learning sessions
              </p>
            </div>

            <Link
              to="/student/live-classes"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {demoData.classes.map((item) => (
              <div
                key={`${item.course}-${item.time}`}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.course}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.teacher}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {item.time}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-950">
                Assignments
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Stay on top of your deadlines
              </p>
            </div>

            <Link
              to="/student/assignments"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {demoData.assignments.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <ClipboardList size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.course} · Due {item.due}
                  </p>
                </div>

                <span
                  className={[
                    "rounded-full px-2 py-1 text-[10px] font-bold",
                    item.priority === "High"
                      ? "bg-red-50 text-red-600"
                      : item.priority === "Medium"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600",
                  ].join(" ")}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress + Activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Learning progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-950">
                Learning progress
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your current learning performance
              </p>
            </div>

            <TrendingUp size={19} className="text-blue-600" />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              ["Weekly learning", "8.5h", 71],
              ["Assignments", "84%", 84],
              ["Attendance", "92%", 92],
            ].map(([label, value, percentage]) => (
              <div
                key={label}
                className="rounded-xl bg-slate-50 p-4"
              >
                <p className="text-xs font-medium text-slate-500">
                  {label}
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {value}
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-2xl bg-slate-950 p-6 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
            <Flame size={23} />
          </div>

          <p className="mt-6 text-sm font-medium text-slate-400">
            Current learning streak
          </p>

          <p className="mt-1 text-4xl font-bold">
            7 days
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Keep learning consistently to build a stronger habit.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-400">
            <Target size={15} />
            Goal: 10 consecutive days
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="font-bold text-slate-950">
            Recent activity
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your latest learning activity
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {demoData.activity.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
                  <Icon size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center text-xs text-slate-400">
        Dashboard learning statistics currently use clearly labeled demo data.
        Supabase integration will be added after the existing academic tables
        are verified.
      </p>
    </div>
  );
}