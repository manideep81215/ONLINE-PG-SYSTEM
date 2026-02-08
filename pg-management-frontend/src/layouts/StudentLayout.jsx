import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function StudentLayout() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setOpen(false);
    localStorage.clear(); // or remove specific keys if you prefer
    navigate("/");   // adjust if your login route is different
  };

  return (
    <div>
      {/* NAVBAR */}
      <header
        style={{
          background: "#0b5ed7",
          color: "white",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* TITLE → DASHBOARD */}
        <h3
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => goTo(`/student/dashboard/${studentId}`)}
        >
          Student Portal
        </h3>

        {/* RIGHT SIDE ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#0b5ed7",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              fontSize: "22px",
              background: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>

        {/* DROPDOWN MENU */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "16px",
              background: "white",
              color: "#333",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              width: "200px",
              zIndex: 1000,
            }}
          >
            <MenuItem onClick={() => goTo(`/student/profile/${studentId}`)}>
              Profile
            </MenuItem>

            <MenuItem onClick={() => goTo(`/student/fees/${studentId}`)}>
              Fees
            </MenuItem>

            <MenuItem onClick={() => goTo(`/student/complaint/${studentId}`)}>
              Raise Complaint
            </MenuItem>

            <MenuItem onClick={() => goTo(`/student/room/${studentId}`)}>
              Room Details
            </MenuItem>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}

/* Reusable menu item */
function MenuItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 16px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
      onMouseLeave={(e) => (e.target.style.background = "white")}
    >
      {children}
    </div>
  );
}

export default StudentLayout;
