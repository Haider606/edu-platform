import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard, BookOpen, FileText, Video, PlayCircle,
  ClipboardList, FileSearch, Award, Users, TrendingUp,
  BookMarked, Calendar, Briefcase, FolderOpen, FileBadge,
  MessageSquare, Bell, ShoppingBag, ShoppingCart, CreditCard,
  DollarSign, Share2, HelpCircle, User, Settings, LogOut,
  ChevronLeft, ChevronRight, GraduationCap
} from "lucide-react";

const navGroups = [
  {
    title: "Learning",
    items: [
      { path: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/student/my-courses", label: "My Courses", icon: BookOpen },
      { path: "/student/course-details", label: "Course Details", icon: FileText },
      { path: "/student/live-classes", label: "Live Classes", icon: Video },
      { path: "/student/recorded-classes", label: "Recorded Classes", icon: PlayCircle },
    ]
  },
  {
    title: "Academic",
    items: [
      { path: "/student/assignments", label: "Assignments", icon: ClipboardList },
      { path: "/student/assignment-details", label: "Assignment Details", icon: FileSearch },
      { path: "/student/grades", label: "Grades", icon: Award },
      { path: "/student/attendance", label: "Attendance", icon: Users },
      { path: "/student/progress", label: "Progress", icon: TrendingUp },
      { path: "/student/study-materials", label: "Study Materials", icon: BookMarked },
      { path: "/student/calendar", label: "Calendar", icon: Calendar },
    ]
  },
  {
    title: "Career",
    items: [
      { path: "/student/internship", label: "Internship", icon: Briefcase },
      { path: "/student/job-board", label: "Job Board", icon: Briefcase },
      { path: "/student/portfolio", label: "Portfolio", icon: FolderOpen },
      { path: "/student/resume", label: "Resume", icon: FileBadge },
    ]
  },
  {
    title: "Communication",
    items: [
      { path: "/student/messages", label: "Messages", icon: MessageSquare },
      { path: "/student/notifications", label: "Notifications", icon: Bell },
    ]
  },
  {
    title: "Achievements",
    items: [
      { path: "/student/certificates", label: "Certificates", icon: Award },
    ]
  },
  {
    title: "Finance & Shop",
    items: [
      { path: "/student/marketplace", label: "Marketplace", icon: ShoppingBag },
      { path: "/student/orders", label: "Orders", icon: ShoppingCart },
      { path: "/student/payments", label: "Payments", icon: CreditCard },
      { path: "/student/earnings", label: "Earnings", icon: DollarSign },
      { path: "/student/referral", label: "Referral", icon: Share2 },
    ]
  },
  {
    title: "Account",
    items: [
      { path: "/student/applications", label: "Applications", icon: FileText },
      { path: "/student/profile", label: "Profile", icon: User },
      { path: "/student/settings", label: "Settings", icon: Settings },
      { path: "/student/help", label: "Help", icon: HelpCircle },
    ]
  },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState(
    navGroups.reduce((acc, g) => ({ ...acc, [g.title]: true }), {})
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log("Logout mock");
    }
    navigate("/login");
  };

  const toggleGroup = (title) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarWidth = sidebarOpen ? 280 : 72;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, system-ui, sans-serif", background: "#f1f5f9" }}>
      
      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth,
        background: "#0f172a",
        color: "#cbd5e1",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px",
          fontSize: 20,
          fontWeight: 800,
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#fff",
          height: 64,
          boxSizing: "border-box"
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <GraduationCap size={22} color="#fff" />
          </div>
          {sidebarOpen && <span style={{ whiteSpace: "nowrap" }}>EduPortal</span>}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {navGroups.map((group) => (
            <div key={group.title} style={{ marginBottom: 8 }}>
              {sidebarOpen && (
                <button
                  onClick={() => toggleGroup(group.title)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 20px",
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {group.title}
                  <span style={{ transition: "transform 0.2s", transform: expandedGroups[group.title] ? "rotate(0deg)" : "rotate(-90deg)" }}>
                    <ChevronLeft size={14} />
                  </span>
                </button>
              )}
              
              {(expandedGroups[group.title] || !sidebarOpen) && group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: sidebarOpen ? "9px 20px" : "12px 0",
                      margin: "2px 8px",
                      color: isActive ? "#fff" : "#94a3b8",
                      background: isActive ? "linear-gradient(90deg, #2563eb, #1d4ed8)" : "transparent",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                      borderRadius: 8,
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "#1e293b";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <item.icon size={18} style={{ flexShrink: 0 }} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px", borderTop: "1px solid #1e293b" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              gap: 8,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#b91c1c"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#dc2626"}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* Topbar */}
        <header style={{
          height: 64,
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          flexShrink: 0
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#475569", display: "flex", alignItems: "center" }}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#64748b", fontSize: 14 }}>Welcome back, Student</span>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
            }}>
              ST
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}