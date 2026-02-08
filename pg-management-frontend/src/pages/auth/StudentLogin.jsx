import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./StudentLogin.css";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await axios.post("/auth/student/login", {
        email,
        password,
      });

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("studentId", res.data.studentId);

      navigate(`/student/dashboard/${res.data.studentId}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-card">
      <h3 className="card-title">Student Login</h3>

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={handleLogin}>
        Login
      </button>

      <p className="register-text">
        New student? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default StudentLogin;
