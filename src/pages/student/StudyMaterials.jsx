import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  FileText,
  FolderOpen,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const FILTERS = ["All", "PDF", "Slides", "Notes", "Resources", "Assignments"];

/*
 * Future material contract:
 * id, title, course, type, description, date, file_size, file_url
 *
 * No records are shown until study_materials exists.
 */
const materials = [];

function MaterialCard({ material }) {
  const hasFile = Boolean(material.file_url);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileText size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
            {material.type || "Resource"}
          </span>
          <h3 className="mt-1 text-sm font-bold text-slate-950">{material.title}</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">{material.course}</p>
        </div>
      </div>

      {material.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {material.description}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 text-xs">
        <div className="text-slate-400">
          {material.date || "—"} {material.file_size ? `· ${material.file_size}` : ""}
        </div>

        {hasFile ? (
          <a
            href={material.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700"
          >
            <Download size={14} />
            Open
          </a>
        ) : (
          <span className="font-semibold text-slate-400">File unavailable</span>
        )}
      </div>
    </article>
  );
}

export default function StudyMaterials() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All courses");
  const [loading] = useState(false);
  const [error] = useState(null);

  const courseOptions = useMemo(
    () => ["All courses", ...new Set(materials.map((material) => material.course).filter(Boolean))],
    []
  );

  const filteredMaterials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return materials.filter((material) => {
      const matchesType =
        activeFilter === "All" || material.type === activeFilter;

      const matchesCourse =
        courseFilter === "All courses" || material.course === courseFilter;

      const matchesSearch =
        !normalizedSearch ||
        [material.title, material.course, material.description, material.type]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch));

      return matchesType && matchesCourse && matchesSearch;
    });
  }, [activeFilter, courseFilter, search]);

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
          Study Materials
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Access your course resources and keep your learning organized.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4">
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

          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search study materials..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <SlidersHorizontal size={14} />
          <span>Search, type filters, and course filtering are ready for connected data.</span>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
          <h2 className="text-lg font-bold text-slate-950">Study materials couldn't be loaded</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't load your resources right now. Please try again later.
          </p>
        </div>
      ) : filteredMaterials.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {search || activeFilter !== "All" || courseFilter !== "All courses" ? (
              <Search size={25} />
            ) : (
              <FolderOpen size={25} />
            )}
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-950">
            No study materials yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your course resources will appear here when they are available.
          </p>

          {(search || activeFilter !== "All" || courseFilter !== "All courses") && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSearch("");
                setCourseFilter("All courses");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <BookOpen size={16} />
              Clear filters
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
