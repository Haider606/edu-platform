import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  // On mount: read saved theme and apply to <html>
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");

    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Directly add/remove the class on <html>
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 bg-white/90 border-slate-200 text-slate-900 dark:bg-slate-950/90 dark:border-slate-800 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-indigo-600 dark:text-indigo-400">EduVerse</span> AI
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <Link to="/courses" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Courses</Link>
          <Link to="/pricing" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</Link>
          <Link to="/about" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
          <Link to="/faq" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</Link>
          <Link to="/contact" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          {/* Single Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

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