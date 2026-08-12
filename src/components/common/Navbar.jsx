import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300
      bg-white/90 border-slate-200 text-slate-900
      dark:bg-slate-950/90 dark:border-slate-800 dark:text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          <span className="text-indigo-600 dark:text-indigo-400">
            Edu
          </span>{" "}
          Platform
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Light Button */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            aria-label="Switch to light mode"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
              theme === "light"
                ? "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            } dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400`}
          >
            ☀️
          </button>

          {/* Dark Button */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            aria-label="Switch to dark mode"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
              theme === "dark"
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            } dark:border-slate-700 dark:bg-slate-900`}
          >
            🌙
          </button>

          {/* Get Started */}
          <Link
            to="/register"
            className="hidden rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl sm:inline-flex"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}