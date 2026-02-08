import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Public */
import Login from "./pages/auth/Login";
import StudentRegister from "./pages/auth/StudentRegister";

/* Student pages */
import StudentDashboard from "./pages/students/StudentDashboard";
import Profile from "./pages/students/Profile";
import FeeStatus from "./pages/students/FeeStatus";
import Complaint from "./pages/students/Complaint";
import RoomDetails from "./pages/students/RoomDetails";

/* Warden pages */
import WardenDashboard from "./pages/wardens/WardenDashboard";
import WardenNotices from "./pages/wardens/WardenNotices";

import StudentProfile from "./pages/wardens/StudentProfile";
import RoomsList from "./pages/wardens/RoomsList";
import ComplaintsList from "./pages/wardens/ComplaintsList";

/* Layouts & Protection */
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentLayout from "./layouts/StudentLayout";
import WardenLayout from "./layouts/WardenLayout";
import StudentsList from "./pages/wardens/StudentsList";
import WardenFees from "./pages/wardens/WardenFees";
import PaymentPage from "./pages/students/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<StudentRegister />} />
          
          {/* 🎓 STUDENT ROUTES */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="STUDENT">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard/:studentId" element={<StudentDashboard />} />
            <Route path="profile/:studentId" element={<Profile />} />
            <Route path="fees/:studentId" element={<FeeStatus />} />
            
            <Route path="complaint/:studentId" element={<Complaint />} />
            <Route path="room/:studentId" element={<RoomDetails />} />
          </Route>

        {/* 🛡️ WARDEN ROUTES */}
        <Route
          path="/warden"
          element={
            <ProtectedRoute role="WARDEN">
              <WardenLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<WardenDashboard />} />
          <Route path="notices" element={<WardenNotices />} />

          {/* 👥 Students */}
          <Route path="students" element={<StudentsList />} />
          <Route path="students/:studentId" element={<StudentProfile />} />

          {/* 🏠 Rooms */}
          <Route path="rooms" element={<RoomsList />} />

          {/* 📝 Complaints */}
          <Route path="complaints" element={<ComplaintsList />} />
          <Route path="/warden/fees" element={<WardenFees />} />

        </Route>
            <Route
  path="/payment/:studentId/:feeId"
  element={<PaymentPage />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
