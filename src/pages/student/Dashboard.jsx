// StudentDashboard.jsx
import { useState, useEffect } from "react";
import {
  BookOpen, Clock, Award, TrendingUp, Calendar, Bell, Search,
  ChevronRight, Play, Users, FileText, CheckCircle, ArrowUpRight,
  ArrowDownRight, Download, Briefcase, DollarSign, Share2, Trophy,
  Flame, GraduationCap, Video, Target, Star, Zap, CheckCircle2,
  QrCode, Copy, Check, Settings, HelpCircle, ShoppingBag, BarChart3,
  Activity, MessageSquare, AlertCircle, Timer, XCircle, Minus, Circle,
  PenTool, Globe, Layers, Mail, Phone, MapPin, ChevronDown, Sun, Moon
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";
import { format, addDays, isToday, isTomorrow } from "date-fns";

/* ───────────────────────── DUMMY DATA ───────────────────────── */

const student = { name: "Alex Morgan", avatar: "AM", streak: 12 };

const quote = {
  text: "The beautiful thing about learning is that no one can take it away from you.",
  author: "B.B. King"
};

const stats = [
  { label: "Enrolled Courses", value: 8, icon: BookOpen, trend: "+2", up: true, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Completed", value: 5, icon: CheckCircle, trend: "+1", up: true, color: "#22C55E", bg: "#F0FDF4" },
  { label: "Assignments Pending", value: 4, icon: FileText, trend: "-2", up: false, color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Attendance", value: 96, suffix: "%", icon: Users, trend: "+1.2%", up: true, color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "Certificates", value: 3, icon: Award, trend: "+1", up: true, color: "#F43F5E", bg: "#FFF1F2" },
  { label: "Internship", value: 68, suffix: "%", icon: Briefcase, trend: "+5%", up: true, color: "#06B6D4", bg: "#ECFEFF" },
  { label: "Referral Earnings", value: 245, prefix: "$", icon: DollarSign, trend: "+$42", up: true, color: "#F97316", bg: "#FFF7ED" },
  { label: "Learning Hours", value: 142, suffix: "h", icon: Clock, trend: "+12h", up: true, color: "#6366F1", bg: "#EEF2FF" },
];

const currentCourse = {
  title: "Advanced Full-Stack Development with React & Node.js",
  instructor: "Dr. Sarah Chen",
  banner: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
  progress: 68,
  completedLessons: 34,
  totalLessons: 50,
  timeRemaining: "6h 45m",
  lastAccessed: "2 hours ago",
  nextLesson: "Authentication with JWT & OAuth"
};

const liveClasses = [
  { id: 1, course: "UI/UX Design Fundamentals", teacher: "Prof. Emily Davis", time: "10:00 AM", duration: "1h 30m", status: "live", joined: 24 },
  { id: 2, course: "Data Structures & Algorithms", teacher: "Dr. James Wilson", time: "2:00 PM", duration: "1h", status: "upcoming", joined: 0 },
  { id: 3, course: "Machine Learning Basics", teacher: "Dr. Alan Turing", time: "4:30 PM", duration: "2h", status: "upcoming", joined: 0 },
];

const assignments = [
  { id: 1, title: "React Component Architecture", course: "Advanced Full-Stack", dueDate: addDays(new Date(), 1), priority: "high", status: "pending" },
  { id: 2, title: "Figma Wireframe Submission", course: "UI/UX Design", dueDate: addDays(new Date(), 2), priority: "medium", status: "pending" },
  { id: 3, title: "Binary Search Tree Implementation", course: "Data Structures", dueDate: addDays(new Date(), 4), priority: "high", status: "in-progress" },
  { id: 4, title: "Linear Regression Analysis", course: "Machine Learning", dueDate: addDays(new Date(), 7), priority: "low", status: "pending" },
];

const notifications = [
  { id: 1, type: "assignment", message: "Assignment due tomorrow: React Component Architecture", time: "2 hours ago", read: false },
  { id: 2, type: "message", message: "Dr. Sarah Chen commented on your project submission", time: "4 hours ago", read: false },
  { id: 3, type: "certificate", message: "Your certificate for 'UI/UX Basics' is ready to download", time: "1 day ago", read: true },
  { id: 4, type: "payment", message: "Payment of $49.99 confirmed for Advanced React Course", time: "2 days ago", read: true },
  { id: 5, type: "referral", message: "You earned $25 from referral #REF-8821", time: "3 days ago", read: true },
];

const weeklyHours = [
  { day: "Mon", hours: 2.5, target: 3 },
  { day: "Tue", hours: 3.8, target: 3 },
  { day: "Wed", hours: 1.5, target: 3 },
  { day: "Thu", hours: 4.2, target: 3 },
  { day: "Fri", hours: 3.0, target: 3 },
  { day: "Sat", hours: 5.5, target: 4 },
  { day: "Sun", hours: 2.0, target: 4 },
];

const monthlyProgress = [
  { month: "Jan", completed: 2, enrolled: 3 },
  { month: "Feb", completed: 1, enrolled: 2 },
  { month: "Mar", completed: 3, enrolled: 4 },
  { month: "Apr", completed: 2, enrolled: 3 },
  { month: "May", completed: 4, enrolled: 5 },
  { month: "Jun", completed: 3, enrolled: 4 },
];

const courseCompletion = [
  { name: "Completed", value: 5, color: "#22C55E" },
  { name: "In Progress", value: 3, color: "#2563EB" },
  { name: "Not Started", value: 2, color: "#E2E8F0" },
];

const attendanceTrend = [
  { week: "W1", present: 95 },
  { week: "W2", present: 100 },
  { week: "W3", present: 90 },
  { week: "W4", present: 98 },
  { week: "W5", present: 100 },
  { week: "W6", present: 96 },
];

const assignmentPerf = [
  { subject: "React", score: 92, avg: 78 },
  { subject: "UI/UX", score: 88, avg: 82 },
  { subject: "DSA", score: 76, avg: 70 },
  { subject: "ML", score: 85, avg: 75 },
  { subject: "Node", score: 90, avg: 80 },
];

const quickActions = [
  { label: "Continue Learning", icon: Play, bg: "#2563EB", hover: "#1D4ED8" },
  { label: "Join Live Class", icon: Video, bg: "#22C55E", hover: "#16A34A" },
  { label: "Assignments", icon: FileText, bg: "#F59E0B", hover: "#D97706" },
  { label: "Certificates", icon: Award, bg: "#F43F5E", hover: "#E11D48" },
  { label: "Marketplace", icon: ShoppingBag, bg: "#8B5CF6", hover: "#7C3AED" },
  { label: "Referral", icon: Share2, bg: "#F97316", hover: "#EA580C" },
  { label: "Support", icon: HelpCircle, bg: "#475569", hover: "#334155" },
  { label: "Settings", icon: Settings, bg: "#E2E8F0", hover: "#CBD5E1", text: "#334155" },
];

const achievements = [
  { title: "Top Performer", desc: "Ranked #1 in React course", icon: Trophy, color: "#EAB308", bg: "#FEFCE8", border: "#FEF08A" },
  { title: "Fast Learner", desc: "Completed 3 courses in 30 days", icon: Zap, color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  { title: "7 Day Streak", desc: "Learning every day for a week", icon: Flame, color: "#F97316", bg: "#FFF7ED", border: "#FED7AA" },
  { title: "Perfect Attendance", desc: "100% attendance this month", icon: CheckCircle2, color: "#22C55E", bg: "#F0FDF4", border: "#BBF7D0" },
  { title: "Internship Ready", desc: "Eligible for placement program", icon: Briefcase, color: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC" },
];

const internship = {
  mentor: "Prof. Robert Taylor",
  tasksCompleted: 12,
  totalTasks: 18,
  weeklyProgress: 78,
  status: "In Progress",
  nextReview: addDays(new Date(), 5),
  skills: ["React", "Node.js", "System Design", "Testing"]
};

const certificates = [
  { course: "UI/UX Design Fundamentals", date: "2026-07-15", status: "ready", grade: "A+" },
  { course: "JavaScript Advanced Patterns", date: "2026-06-22", status: "ready", grade: "A" },
  { course: "Database Design", date: "2026-05-10", status: "ready", grade: "A-" },
  { course: "React Native Basics", date: null, status: "eligible", grade: null },
  { course: "Cloud Computing", date: null, status: "eligible", grade: null },
];

const referral = {
  code: "ALEX2026",
  totalEarned: 245,
  pending: 60,
  leaderboardPos: 12,
  totalReferrals: 18,
  conversionRate: 72
};

const calendarEvents = [
  { title: "Live: UI/UX Design", time: "10:00 AM", type: "class" },
  { title: "DSA Assignment Due", time: "11:59 PM", type: "deadline" },
  { title: "Mock Interview", time: "3:00 PM", type: "exam" },
  { title: "Live: Machine Learning", time: "4:30 PM", type: "class" },
];

const sidebarData = {
  goals: [
    { text: "Complete React module 5", done: true },
    { text: "Submit UI/UX wireframes", done: false },
    { text: "2 hours of DSA practice", done: false },
    { text: "Read ML chapter 3", done: true },
  ],
  studyTime: { today: "3h 45m", weekly: "22h 30m", target: "30h" },
  leaderboard: [
    { name: "Jordan Lee", points: 2450, avatar: "JL" },
    { name: "Alex Morgan", points: 2380, avatar: "AM", me: true },
    { name: "Sam Taylor", points: 2200, avatar: "ST" },
    { name: "Casey Kim", points: 2150, avatar: "CK" },
    { name: "Riley Park", points: 2080, avatar: "RP" },
  ]
};

/* ─────────────────── STYLES ─────────────────── */

const s = {
  page: { minHeight: "100vh", background: "#F8FAFC", fontFamily: "Segoe UI, system-ui, sans-serif", padding: "24px", color: "#1E293B" },
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", padding: 24, marginBottom: 24, transition: "all 0.2s ease" },
  cardHover: { boxShadow: "0 8px 25px rgba(0,0,0,0.1)", transform: "translateY(-2px)" },
  sectionTitle: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 16, fontWeight: 700, color: "#1E293B" },
  grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 24 },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 24 },
  flexBetween: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  flex: { display: "flex" },
  flexCol: { display: "flex", flexDirection: "column" },
  badge: (color, bg) => ({ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: bg || color + "15", color: color, border: `1px solid ${color}30` }),
  btn: (bg, hover, text) => ({ padding: "10px 20px", background: bg, color: text || "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 6 }),
  textMuted: { color: "#64748B", fontSize: 13 },
  textSmall: { fontSize: 12, color: "#94A3B8" },
  gradientHero: { background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E3A8A 100%)", color: "#fff", borderRadius: 16, padding: "40px", marginBottom: 24, position: "relative", overflow: "hidden" },
  progressBar: (pct, color) => ({ width: "100%", height: 8, background: "#E2E8F0", borderRadius: 4, overflow: "hidden", marginTop: 8 }),
  progressFill: (pct, color) => ({ width: `${pct}%`, height: "100%", background: color || "#2563EB", borderRadius: 4, transition: "width 0.5s ease" }),
  tableHeader: { textAlign: "left", padding: "12px 8px", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "#94A3B8", fontWeight: 600, borderBottom: "1px solid #E2E8F0" },
  tableCell: { padding: "14px 8px", fontSize: 13, borderBottom: "1px solid #F1F5F9" },
  iconBox: (color, bg) => ({ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: color }),
  sidebarCard: { background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0", padding: 20, marginBottom: 16 },
};

/* ─────────────────── COMPONENT ─────────────────── */

export default function StudentDashboard() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [copied, setCopied] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening");
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referral.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriority = (p) => p === "high" ? { color: "#EF4444", bg: "#FEF2F2" } : p === "medium" ? { color: "#F59E0B", bg: "#FFFBEB" } : { color: "#64748B", bg: "#F1F5F9" };

  const cardWrap = (children, key) => (
    <div
      key={key}
      style={{ ...s.card, ...(hoveredCard === key ? s.cardHover : {}) }}
      onMouseEnter={() => setHoveredCard(key)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {children}
    </div>
  );

  return (
    <div style={s.page}>
      {/* Hover CSS injection */}
      <style>{`
        .dashboard-card { transition: all 0.2s ease; }
        .dashboard-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .btn-hov { transition: all 0.2s ease; }
        .btn-hov:hover { filter: brightness(0.9); transform: translateY(-1px); }
        .row-hov { transition: background 0.15s; }
        .row-hov:hover { background: #F8FAFC; }
        .action-btn { transition: all 0.2s ease; }
        .action-btn:hover { transform: scale(1.05); }
      `}</style>

      {/* ───────── HERO ───────── */}
      <div style={s.gradientHero}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, color: "#FED7AA", fontWeight: 600, fontSize: 14 }}>
              <Flame size={18} /> {student.streak} Day Streak 🔥
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>{greeting}, {student.name}</h1>
            <p style={{ fontSize: 18, color: "#BFDBFE", marginBottom: 4, fontStyle: "italic" }}>"{quote.text}"</p>
            <p style={{ fontSize: 14, color: "#93C5FD", marginBottom: 28 }}>— {quote.author}</p>
            
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-hov" style={{ ...s.btn("#fff", null, "#2563EB"), padding: "12px 24px", fontSize: 15, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                <Play size={18} /> Continue Learning
              </button>
              <button className="btn-hov" style={{ ...s.btn("rgba(255,255,255,0.15)", null, "#fff"), border: "1px solid rgba(255,255,255,0.25)" }}>
                <BookOpen size={18} /> View Courses
              </button>
            </div>
          </div>
          <div style={{ width: 120, height: 120, background: "rgba(255,255,255,0.1)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <GraduationCap size={56} color="rgba(255,255,255,0.8)" />
          </div>
        </div>
      </div>

      {/* ───────── STATS ───────── */}
      <div style={s.grid4}>
        {stats.map((stat, i) => (
          <div key={i} className="dashboard-card" style={{ ...s.card, cursor: "pointer" }}>
            <div style={{ ...s.flexBetween, marginBottom: 12 }}>
              <div style={s.iconBox(stat.color, stat.bg)}><stat.icon size={20} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 700, color: stat.up ? "#22C55E" : "#EF4444" }}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>{stat.prefix || ""}{stat.value}{stat.suffix || ""}</div>
            <div style={s.textMuted}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ───────── MAIN 2-COLUMN LAYOUT ───────── */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: "1 1 65%", minWidth: 320 }}>
          
          {/* CURRENT COURSE */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><BookOpen size={20} color="#2563EB" /> Continue Learning <span style={{ marginLeft: "auto", fontSize: 13, color: "#2563EB", fontWeight: 600, cursor: "pointer" }}>View All →</span></div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: 260, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <img src={currentCourse.banner} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                    <div style={s.progressBar()}><div style={s.progressFill(currentCourse.progress, "#fff")} /></div>
                    <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, marginTop: 6 }}>{currentCourse.progress}% Complete</div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{currentCourse.title}</h3>
                  <p style={{ ...s.textMuted, marginBottom: 16 }}>Instructor: {currentCourse.instructor}</p>
                  
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                    {[
                      { icon: CheckCircle, text: `${currentCourse.completedLessons}/${currentCourse.totalLessons} Lessons`, color: "#22C55E" },
                      { icon: Clock, text: `${currentCourse.timeRemaining} remaining`, color: "#2563EB" },
                      { icon: Timer, text: `Last: ${currentCourse.lastAccessed}`, color: "#F59E0B" }
                    ].map((d, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#475569" }}>
                        <d.icon size={16} color={d.color} /> {d.text}
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 10, padding: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "#2563EB", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Next Up</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1E293B" }}>{currentCourse.nextLesson}</div>
                  </div>
                  
                  <button className="btn-hov" style={s.btn("#2563EB", "#1D4ED8")}><Play size={16} /> Resume Course</button>
                </div>
              </div>
            </>, "course"
          )}

          {/* LIVE CLASSES */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Video size={20} color="#2563EB" /> Today's Live Classes <span style={{ marginLeft: "auto" }}><span style={s.badge("#22C55E", "#F0FDF4")}>3 Scheduled</span></span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {liveClasses.map((live) => (
                  <div key={live.id} className="row-hov" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "#F8FAFC", borderRadius: 12, border: "1px solid #F1F5F9", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: live.status === "live" ? "#FEF2F2" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Video size={20} color={live.status === "live" ? "#EF4444" : "#94A3B8"} style={live.status === "live" ? { animation: "pulse 2s infinite" } : {}} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{live.course}</div>
                        <div style={s.textSmall}>{live.teacher} • {live.time} • {live.duration}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {live.status === "live" && (
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#EF4444" }}>
                          <span style={{ width: 8, height: 8, background: "#EF4444", borderRadius: "50%", animation: "pulse 1.5s infinite" }} /> LIVE • {live.joined} joined
                        </span>
                      )}
                      <button className="btn-hov" style={{ ...s.btn(live.status === "live" ? "#EF4444" : "#E2E8F0", live.status === "live" ? "#DC2626" : "#CBD5E1", live.status === "live" ? "#fff" : "#475569"), padding: "8px 16px", fontSize: 13 }}>
                        {live.status === "live" ? "Join Now" : "Set Reminder"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>, "live"
          )}

          {/* ASSIGNMENTS */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><FileText size={20} color="#2563EB" /> Upcoming Assignments <span style={{ marginLeft: "auto", fontSize: 13, color: "#2563EB", fontWeight: 600, cursor: "pointer" }}>View All →</span></div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Assignment", "Course", "Due", "Priority", "Action"].map((h) => (
                        <th key={h} style={s.tableHeader}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((a) => {
                      const p = getPriority(a.priority);
                      return (
                        <tr key={a.id} className="row-hov">
                          <td style={s.tableCell}><div style={{ fontWeight: 600 }}>{a.title}</div></td>
                          <td style={{ ...s.tableCell, ...s.textMuted, display: "table-cell" }}>{a.course}</td>
                          <td style={s.tableCell}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: isToday(a.dueDate) ? "#EF4444" : "#64748B" }}>
                              {isToday(a.dueDate) ? "Today" : format(a.dueDate, "MMM d")}
                            </span>
                          </td>
                          <td style={s.tableCell}><span style={s.badge(p.color, p.bg)}>{a.priority}</span></td>
                          <td style={{ ...s.tableCell, textAlign: "right" }}>
                            <button className="btn-hov" style={{ ...s.btn("#2563EB", "#1D4ED8"), padding: "6px 14px", fontSize: 12 }}>Submit</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>, "assign"
          )}

          {/* CHARTS */}
          <div style={s.grid2}>
            {cardWrap(
              <>
                <div style={s.sectionTitle}><BarChart3 size={20} color="#2563EB" /> Weekly Learning Hours</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyHours}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Bar dataKey="hours" fill="#2563EB" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="target" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>, "chart1"
            )}
            {cardWrap(
              <>
                <div style={s.sectionTitle}><TrendingUp size={20} color="#2563EB" /> Monthly Progress</div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={monthlyProgress}>
                    <defs>
                      <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient>
                      <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/><stop offset="95%" stopColor="#2563EB" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Area type="monotone" dataKey="completed" stroke="#22C55E" fill="url(#c1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="enrolled" stroke="#2563EB" fill="url(#c2)" strokeWidth={2} />
                    <Legend iconType="circle" />
                  </AreaChart>
                </ResponsiveContainer>
              </>, "chart2"
            )}
            {cardWrap(
              <>
                <div style={s.sectionTitle}><TrendingUp size={20} color="#2563EB" /> Course Completion</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={courseCompletion} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {courseCompletion.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </>, "chart3"
            )}
            {cardWrap(
              <>
                <div style={s.sectionTitle}><Activity size={20} color="#2563EB" /> Attendance Trend</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Line type="monotone" dataKey="present" stroke="#2563EB" strokeWidth={3} dot={{ fill: "#2563EB", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </>, "chart4"
            )}
          </div>

          {/* QUICK ACTIONS */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Zap size={20} color="#2563EB" /> Quick Actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
                {quickActions.map((a, i) => (
                  <button
                    key={i}
                    className="action-btn"
                    onMouseEnter={() => setHoveredBtn(i)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{ ...s.btn(hoveredBtn === i ? a.hover : a.bg, null, a.text || "#fff"), flexDirection: "column", padding: "16px 8px", gap: 8, borderRadius: 12 }}
                  >
                    <a.icon size={22} />
                    <span style={{ fontSize: 12 }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </>, "quick"
          )}

          {/* ACHIEVEMENTS */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Trophy size={20} color="#2563EB" /> Achievements</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {achievements.map((ach, i) => (
                  <div key={i} className="dashboard-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 20, background: ach.bg, border: `1px solid ${ach.border}`, borderRadius: 16 }}>
                    <ach.icon size={32} color={ach.color} style={{ marginBottom: 10 }} />
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{ach.title}</div>
                    <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.4 }}>{ach.desc}</div>
                  </div>
                ))}
              </div>
            </>, "achieve"
          )}

          {/* INTERNSHIP */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Briefcase size={20} color="#2563EB" /> Internship Status</div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Mentor", value: internship.mentor },
                    { label: "Status", value: <span style={s.badge("#2563EB", "#EFF6FF")}>{internship.status}</span> },
                    { label: "Next Review", value: format(internship.nextReview, "MMM d, yyyy") }
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#F8FAFC", borderRadius: 10 }}>
                      <span style={s.textMuted}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.value}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                    {internship.skills.map((sk) => (
                      <span key={sk} style={{ padding: "4px 10px", background: "#EFF6FF", color: "#2563EB", fontSize: 11, fontWeight: 600, borderRadius: 6, border: "1px solid #DBEAFE" }}>{sk}</span>
                    ))}
                  </div>
                </div>
                <div style={{ width: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, background: "#F8FAFC", borderRadius: 16 }}>
                  <div style={{ position: "relative", width: 120, height: 120 }}>
                    <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth={3} />
                      <path strokeDasharray={`${internship.weeklyProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth={3} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 24, fontWeight: 800 }}>{internship.weeklyProgress}%</span>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>Weekly</span>
                    </div>
                  </div>
                  <p style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: "#475569" }}>{internship.tasksCompleted}/{internship.totalTasks} Tasks Done</p>
                </div>
              </div>
            </>, "intern"
          )}

          {/* CERTIFICATES */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Award size={20} color="#2563EB" /> Certificates</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {certificates.map((cert, i) => (
                  <div key={i} className="row-hov" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "1px solid #F1F5F9", borderRadius: 12, flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: cert.status === "ready" ? "#F0FDF4" : "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Award size={20} color={cert.status === "ready" ? "#22C55E" : "#F59E0B"} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{cert.course}</div>
                        <div style={s.textSmall}>{cert.status === "ready" ? `Earned on ${cert.date} • Grade: ${cert.grade}` : "Eligible for certificate"}</div>
                      </div>
                    </div>
                    {cert.status === "ready" ? (
                      <button className="btn-hov" style={{ ...s.btn("#F0FDF4", "#DCFCE7", "#15803D"), padding: "6px 12px", fontSize: 12 }}><Download size={14} /> Download</button>
                    ) : (
                      <span style={s.badge("#F59E0B", "#FFFBEB")}>In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </>, "cert"
          )}

          {/* REFERRAL */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Share2 size={20} color="#2563EB" /> Referral Program</div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#F1F5F9", borderRadius: 10, border: "1px dashed #CBD5E1" }}>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>{referral.code}</span>
                    </div>
                    <button className="btn-hov" onClick={handleCopy} style={{ ...s.btn("#2563EB", "#1D4ED8"), padding: "12px 18px" }}>
                      {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {[
                      { label: "Earned", value: `$${referral.totalEarned}` },
                      { label: "Pending", value: `$${referral.pending}` },
                      { label: "Rank", value: `#${referral.leaderboardPos}` }
                    ].map((item, i) => (
                      <div key={i} style={{ textAlign: "center", padding: 12, background: "#F8FAFC", borderRadius: 10 }}>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{item.value}</div>
                        <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ width: 140, height: 140, background: "#fff", borderRadius: 12, border: "2px dashed #E2E8F0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <QrCode size={48} color="#CBD5E1" />
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>Scan to refer</span>
                </div>
              </div>
            </>, "ref"
          )}

          {/* CALENDAR */}
          {cardWrap(
            <>
              <div style={s.sectionTitle}><Calendar size={20} color="#2563EB" /> Today's Schedule</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {calendarEvents.map((evt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: 14, background: "#F8FAFC", borderRadius: 10, borderLeft: "4px solid #2563EB" }}>
                    <div style={{ width: 50, textAlign: "center" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>{evt.time.split(" ")[1]}</div>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{evt.time.split(" ")[0]}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{evt.title}</div>
                      <span style={s.badge(evt.type === "class" ? "#2563EB" : evt.type === "deadline" ? "#EF4444" : "#8B5CF6", evt.type === "class" ? "#EFF6FF" : evt.type === "deadline" ? "#FEF2F2" : "#F5F3FF")}>{evt.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>, "cal"
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ flex: "1 1 28%", minWidth: 280 }}>

          {/* NOTIFICATIONS */}
          <div style={s.sidebarCard}>
            <div style={{ ...s.sectionTitle, marginBottom: 12 }}><Bell size={18} color="#2563EB" /> Notifications <span style={{ marginLeft: "auto", width: 20, height: 20, background: "#EF4444", color: "#fff", borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {notifications.map((n) => (
                <div key={n.id} style={{ display: "flex", gap: 10, padding: 10, borderRadius: 10, background: n.read ? "transparent" : "#EFF6FF" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "#CBD5E1" : "#2563EB", marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 12, lineHeight: 1.5, color: n.read ? "#64748B" : "#1E293B", fontWeight: n.read ? 400 : 600 }}>{n.message}</p>
                    <p style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GOALS */}
          <div style={s.sidebarCard}>
            <div style={{ ...s.sectionTitle, marginBottom: 12 }}><Target size={18} color="#2563EB" /> Today's Goals</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sidebarData.goals.map((g, i) => (
                <div key={i} className="row-hov" style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, cursor: "pointer" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${g.done ? "#22C55E" : "#CBD5E1"}`, background: g.done ? "#22C55E" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {g.done && <Check size={14} color="#fff" />}
                  </div>
                  <span style={{ fontSize: 13, color: g.done ? "#94A3B8" : "#1E293B", textDecoration: g.done ? "line-through" : "none" }}>{g.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F1F5F9" }}>
              <div style={{ ...s.flexBetween, marginBottom: 6 }}>
                <span style={s.textSmall}>Daily Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>50%</span>
              </div>
              <div style={s.progressBar()}><div style={s.progressFill(50, "#22C55E")} /></div>
            </div>
          </div>

          {/* STUDY TIME */}
          <div style={s.sidebarCard}>
            <div style={{ ...s.sectionTitle, marginBottom: 12 }}><Clock size={18} color="#2563EB" /> Study Time</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Today", value: sidebarData.studyTime.today, bg: "#EFF6FF", color: "#2563EB" },
                { label: "This Week", value: sidebarData.studyTime.weekly, bg: "#F8FAFC", color: "#1E293B" },
                { label: "Weekly Target", value: sidebarData.studyTime.target, bg: "#F8FAFC", color: "#1E293B" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: item.bg, borderRadius: 10 }}>
                  <span style={{ fontSize: 13, color: "#64748B" }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={s.progressBar()}><div style={{ ...s.progressFill(75), background: "linear-gradient(90deg, #2563EB, #4F46E5)" }} /></div>
              <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 6 }}>75% of weekly target achieved</p>
            </div>
          </div>

          {/* LEADERBOARD */}
          <div style={s.sidebarCard}>
            <div style={{ ...s.sectionTitle, marginBottom: 12 }}><Trophy size={18} color="#2563EB" /> Leaderboard</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sidebarData.leaderboard.map((entry, i) => (
                <div key={i} className="row-hov" style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, background: entry.me ? "#EFF6FF" : "transparent", border: entry.me ? "1px solid #DBEAFE" : "1px solid transparent" }}>
                  <span style={{ width: 20, textAlign: "center", fontSize: 12, fontWeight: 800, color: i === 0 ? "#EAB308" : i === 1 ? "#94A3B8" : i === 2 ? "#F59E0B" : "#CBD5E1" }}>{i + 1}</span>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: entry.me ? "#2563EB" : "#E2E8F0", color: entry.me ? "#fff" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{entry.avatar}</div>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: entry.me ? 700 : 500, color: entry.me ? "#2563EB" : "#1E293B" }}>{entry.name} {entry.me && "(You)"}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B" }}>{entry.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOTIVATION */}
          <div style={{ ...s.sidebarCard, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", color: "#fff", border: "none" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Star size={24} color="#FDE047" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Daily Motivation</div>
                <p style={{ fontSize: 12, color: "#DDD6FE", lineHeight: 1.5 }}>You're in the top 5% of learners this week. Keep pushing — consistency beats intensity!</p>
              </div>
            </div>
          </div>

          {/* UPCOMING */}
          <div style={s.sidebarCard}>
            <div style={{ ...s.sectionTitle, marginBottom: 12 }}><Calendar size={18} color="#2563EB" /> Upcoming</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "Mid-Term Examination", date: addDays(new Date(), 2), time: "10:00 AM", color: "#2563EB" },
                { title: "Project Submission", date: addDays(new Date(), 5), time: "11:59 PM", color: "#22C55E" }
              ].map((evt, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${evt.color}15`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: evt.color }}>{format(evt.date, "dd")}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{evt.title}</div>
                    <div style={s.textSmall}>{format(evt.date, "EEEE")} • {evt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #E2E8F0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#94A3B8", fontSize: 13 }}>
        <p>© 2026 EduPortal. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Support", "Terms", "Privacy", "Cookies"].map((l) => (
            <a key={l} href="#" style={{ color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#2563EB"} onMouseLeave={e => e.target.style.color = "#94A3B8"}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}