import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const FILTERS = ["All", "Pending", "Submitted", "Graded", "Overdue"];

/*
 * Assignment contract for future backend data:
 * id, title, course, dueDate, status, marks, maxMarks
 *
 * Kept empty until the assignments table exists.
 */
const assignments = [];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Submitted: "bg-blue-50 text-blue-700",
  Graded: "bg-emerald-50 text-emerald-700",
  Overdue: "bg-red-50 text-red-700",
};

function StatusBadge({ status }) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold",
        statusStyles[status] || "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status || "Unknown"}
    </span>
  );
}

function AssignmentCard({ assignment }) {
  return (
    <Link
      to={`/student/assignments/${assignment.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ClipboardList size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-slate-950">{assignment.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{assignment.course}</p>
            </div>
            <StatusBadge status={assignment.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
            <div>
              <p className="text-slate-400">Due date</p>
              <p className="mt-1 font-semibold text-slate-700">{assignment.dueDate || "—"}</p>
            </div>
            <div>
              <p className="text-slate-400">Marks</p>
              <p className="mt-1 font-semibold text-slate-700">
                {assignment.marks ?? "—"}{assignment.maxMarks ? ` / ${assignment.maxMarks}` : ""}
              </p>
            </div>
            <div className="col-span-2 flex items-end justify-end sm:col-span-1">
              <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                View details <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Assignments() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [error] = useState(null);

  const filteredAssignments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return assignments.filter((assignment) => {
      const matchesFilter =
        activeFilter === "All" || assignment.status === activeFilter;

      const matchesSearch =
        !normalizedSearch ||
        [assignment.title, assignment.course]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const summary = [
    ["Total", "—"],
    ["Pending", "—"],
    ["Submitted", "—"],
    ["Graded", "—"],
    ["Overdue", "—"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header>
        <p className="text-sm font-semibold text-blue-600">Learning</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Assignments
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track your coursework and stay on top of deadlines.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {summary.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
            <p className="mt-1 text-[10px] text-slate-400">Awaiting assignment data</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
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

          <label className="relative block w-full xl:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assignments..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <SlidersHorizontal size={14} />
          <span>Assignment filters and search are ready for connected data.</span>
        </div>
      </section>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
          <h2 className="text-lg font-bold text-slate-950">Assignments couldn't be loaded</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't load your assignments right now. Please try again later.
          </p>
        </div>
      ) : filteredAssignments.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">Assignment</th>
                    <th className="px-5 py-4">Course</th>
                    <th className="px-5 py-4">Due Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Marks</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} className="text-sm">
                      <td className="px-5 py-4 font-semibold text-slate-900">{assignment.title}</td>
                      <td className="px-5 py-4 text-slate-500">{assignment.course}</td>
                      <td className="px-5 py-4 text-slate-500">{assignment.dueDate || "—"}</td>
                      <td className="px-5 py-4"><StatusBadge status={assignment.status} /></td>
                      <td className="px-5 py-4 text-slate-500">
                        {assignment.marks ?? "—"}{assignment.maxMarks ? ` / ${assignment.maxMarks}` : ""}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to={`/student/assignments/${assignment.id}`}
                          className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ClipboardList size={25} />
          </div>
          <h2 className="mt-5 text-lg font-bold text-slate-950">No assignments yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You don't have any assignments assigned to you.
          </p>
          {(activeFilter !== "All" || search) && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSearch("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <CheckCircle2 size={16} />
              Clear filters
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
