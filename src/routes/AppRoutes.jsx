import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Courses from "../pages/public/Courses";
import Contact from "../pages/public/Contact";

// Student Pages — adjust if your folder is different
import StudentDashboard from "../pages/student/Dashboard";
import MyCourses from "../pages/student/MyCourses";
import CourseDetails from "../pages/student/CourseDetails";
import LiveClasses from "../pages/student/LiveClasses";
import RecordedClasses from "../pages/student/RecordedClasses";
import Assignments from "../pages/student/Assignments";
import AssignmentDetails from "../pages/student/AssignmentDetails";
import Grades from "../pages/student/Grades";
import Attendance from "../pages/student/Attendance";
import Progress from "../pages/student/Progress";
import StudyMaterials from "../pages/student/StudyMaterials";
import Calendar from "../pages/student/Calendar";
import Certificates from "../pages/student/Certificates";
import Messages from "../pages/student/Messages";
import Notifications from "../pages/student/Notifications";
import Portfolio from "../pages/student/Portfolio";
import Resume from "../pages/student/Resume";
import Internship from "../pages/student/Internship";
import JobBoard from "../pages/student/JobBoard";
import Marketplace from "../pages/student/Marketplace";
import Orders from "../pages/student/Orders";
import Payments from "../pages/student/Payments";
import Earnings from "../pages/student/Earnings";
import Referral from "../pages/student/Referral";
import Help from "../pages/student/Help";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";
import Applications from "../pages/student/Applications";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<div>Login Page</div>} />

      {/* Student Portal */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="course-details" element={<CourseDetails />} />
        <Route path="live-classes" element={<LiveClasses />} />
        <Route path="recorded-classes" element={<RecordedClasses />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignment-details" element={<AssignmentDetails />} />
        <Route path="grades" element={<Grades />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="progress" element={<Progress />} />
        <Route path="study-materials" element={<StudyMaterials />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="resume" element={<Resume />} />
        <Route path="internship" element={<Internship />} />
        <Route path="job-board" element={<JobBoard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payments" element={<Payments />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="referral" element={<Referral />} />
        <Route path="applications" element={<Applications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}