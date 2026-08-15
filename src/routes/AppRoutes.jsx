import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";

// Authentication
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import Pricing from "../pages/public/Pricing";
import Admission from "../pages/public/Admission";
import Internship from "../pages/public/Internship";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import AccessDenied from "../pages/public/AccessDenied";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import MyCourses from "../pages/student/MyCourses";
import CourseDetailsStudent from "../pages/student/CourseDetails";
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
import InternshipStudent from "../pages/student/Internship";
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

// Teacher
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherCourses from "../pages/teacher/MyCourses";
import TeacherStudents from "../pages/teacher/MyStudents";
import TeacherStudentDetails from "../pages/teacher/StudentDetails";
import TeacherAssignments from "../pages/teacher/Assignments";
import TeacherAssignmentReview from "../pages/teacher/AssignmentReview";
import TeacherGrades from "../pages/teacher/Grades";
import TeacherAttendance from "../pages/teacher/Attendance";
import TeacherLiveClasses from "../pages/teacher/LiveClasses";
import TeacherRecordedLectures from "../pages/teacher/RecordedLectures";
import TeacherStudyMaterials from "../pages/teacher/StudyMaterials";
import TeacherCalendar from "../pages/teacher/Calendar";
import TeacherAnnouncements from "../pages/teacher/Announcements";
import TeacherMessages from "../pages/teacher/Messages";
import TeacherNotifications from "../pages/teacher/Notifications";
import TeacherDailyReport from "../pages/teacher/DailyReport";
import TeacherInternship from "../pages/teacher/Internship";
import TeacherProfile from "../pages/teacher/Profile";
import TeacherSettings from "../pages/teacher/Settings";

// Manager
import ManagerDashboard from "../pages/manager/Dashboard";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
      ====================================================== */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/courses" element={<Courses />} />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route path="/pricing" element={<Pricing />} />

        <Route
          path="/admission"
          element={<Admission />}
        />

        <Route
          path="/internships"
          element={<Internship />}
        />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Route>


      {/* =====================================================
          ACCESS DENIED
      ====================================================== */}

      <Route
        path="/access-denied"
        element={<AccessDenied />}
      />


      {/* =====================================================
          STUDENT PORTAL
          Only Student role can access
      ====================================================== */}

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["Student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="courses"
          element={<MyCourses />}
        />

        <Route
          path="courses/:id"
          element={<CourseDetailsStudent />}
        />

        <Route
          path="live-classes"
          element={<LiveClasses />}
        />

        <Route
          path="recorded-classes"
          element={<RecordedClasses />}
        />

        <Route
          path="assignments"
          element={<Assignments />}
        />
        <Route
          path="assignments/:id"
          element={<AssignmentDetails />}
        />

        <Route
          path="grades"
          element={<Grades />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="progress"
          element={<Progress />}
        />

        <Route
          path="study-materials"
          element={<StudyMaterials />}
        />

        <Route
          path="calendar"
          element={<Calendar />}
        />

        <Route
          path="certificates"
          element={<Certificates />}
        />

        <Route
          path="messages"
          element={<Messages />}
        />

        <Route
          path="notifications"
          element={<Notifications />}
        />

        <Route
          path="portfolio"
          element={<Portfolio />}
        />

        <Route
          path="resume"
          element={<Resume />}
        />

        <Route
          path="internship"
          element={<InternshipStudent />}
        />

        <Route
          path="job-board"
          element={<JobBoard />}
        />

        <Route
          path="marketplace"
          element={<Marketplace />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="payments"
          element={<Payments />}
        />

        <Route
          path="earnings"
          element={<Earnings />}
        />

        <Route
          path="referral"
          element={<Referral />}
        />

        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

        <Route
          path="help"
          element={<Help />}
        />

      </Route>


      {/* =====================================================
          TEACHER PORTAL
          Only Teacher role can access
      ====================================================== */}

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["Teacher"]}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="students/:id" element={<TeacherStudentDetails />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="assignments/review" element={<TeacherAssignmentReview />} />
        <Route path="grades" element={<TeacherGrades />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="live-classes" element={<TeacherLiveClasses />} />
        <Route path="recorded-lectures" element={<TeacherRecordedLectures />} />
        <Route path="study-materials" element={<TeacherStudyMaterials />} />
        <Route path="calendar" element={<TeacherCalendar />} />
        <Route path="announcements" element={<TeacherAnnouncements />} />
        <Route path="messages" element={<TeacherMessages />} />
        <Route path="notifications" element={<TeacherNotifications />} />
        <Route path="daily-report" element={<TeacherDailyReport />} />
        <Route path="internship" element={<TeacherInternship />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>


      {/* =====================================================
          MANAGER PORTAL
          Only Manager role can access
      ====================================================== */}

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["Manager"]}>
            <ManagerLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<ManagerDashboard />}
        />

      </Route>


      {/* =====================================================
          ADMIN PORTAL
          Only Admin role can access
      ====================================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

      </Route>


      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}