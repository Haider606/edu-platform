import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { GlowButton } from "../components/ui/GlowButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-50">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-3"
            : "bg-[#050508]/70 backdrop-blur-md py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              EduVerse{" "}
              <span className="text-indigo-400">
                AI
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`group relative text-sm font-medium transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="rounded-lg p-2 transition-colors hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link to="/login">
              <GlowButton variant="ghost" size="sm">
                Sign In
              </GlowButton>
            </Link>

            <Link to="/register">
              <GlowButton variant="primary" size="sm">
                Get Started
              </GlowButton>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 z-40 bg-[#050508]/95 px-6 pt-24 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const active = location.pathname === link.href;

                return (
                  <motion.div
                    key={link.label}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                  >
                    <Link
                      to={link.href}
                      className={`block border-b border-white/5 py-4 text-lg font-medium transition-colors ${
                        active
                          ? "text-indigo-400"
                          : "text-slate-200 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <Link to="/login" className="mt-4">
                <GlowButton
                  variant="ghost"
                  className="w-full"
                >
                  Sign In
                </GlowButton>
              </Link>

              <Link to="/register" className="mt-2">
                <GlowButton
                  variant="primary"
                  className="w-full"
                >
                  Get Started
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMPORTANT:
          React Router renders Home/About/Courses/etc.
          here through Outlet.
      */}
      <main className="min-h-screen pt-20">
        <Outlet />
      </main>
    </div>
  );
}