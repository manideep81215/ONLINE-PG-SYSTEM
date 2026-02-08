import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar({ title }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleTitleClick = () => {
    navigate("/student/dashboard");
    setOpen(false);
  };

  return (
    <header className="navbar">
      <h3 className="navbar-title" onClick={handleTitleClick}>
        {title}
      </h3>

      <div className="menu-container">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {open && (
          <div className="menu-dropdown">
            <p className="menu-item" onClick={() => handleMenuClick("/student/profile")}>
              Profile
            </p>
            <p className="menu-item" onClick={() => handleMenuClick("/student/fees")}>
              Fee Status
            </p>
            <p className="menu-item" onClick={() => handleMenuClick("/student/complaint")}>
              Raise a Complaint
            </p>
            <p className="menu-item" onClick={() => handleMenuClick("/student/room")}>
              Room Details
            </p>
          </div>
        )}

        <h3>Logout</h3>
      </div>
    </header>
  );
}

export default NavBar;
