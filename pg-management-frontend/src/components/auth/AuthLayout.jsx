import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page fade-in">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="PG Management Logo"
        className="auth-logo"
      />

      {/* Project Title */}
      <h1 className="project-title">PG Management System</h1>

      {/* Subtitle */}
      <p className="project-subtitle">
        Hostel & Student Management System
      </p>

      {/* Auth Cards */}
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
