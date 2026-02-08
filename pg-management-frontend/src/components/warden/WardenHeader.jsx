import { useNavigate, useLocation } from "react-router-dom";
import "./WardenHeader.css";

const WardenHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNoticesPage = location.pathname === "/warden/notices";

  // 🔑 Get logged-in warden from localStorage
  const warden = JSON.parse(localStorage.getItem("warden"));
  const wardenName = warden?.name || "Warden";
  const block = warden?.blockAssigned || "-";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // login page
  };

  return (
    <header className="warden-header">
      {/* LEFT */}
      <div className="warden-left">
        <h2
          className="warden-title"
          onClick={() => navigate("/warden/dashboard")}
        >
          Warden Panel
        </h2>

        <span className="warden-info">
          Welcome, <strong>{wardenName}</strong> | Block{" "}
          <strong>{block}</strong>
        </span>
      </div>

      {/* RIGHT */}
      <div className="warden-right">
        {isNoticesPage ? (
          <button
            className="icon-btn"
            onClick={() => navigate("/warden/dashboard")}
            title="Back to Dashboard"
          >
            ⬅ Back
          </button>
        ) : (
          <button
            className="icon-btn"
            onClick={() => navigate("/warden/notices")}
            title="View Notices"
          >
            📢 Notice
          </button>
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default WardenHeader;
