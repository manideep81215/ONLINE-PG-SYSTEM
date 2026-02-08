import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./WardenLogin.css";

const WardenLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("/auth/warden/login", {
        email,
        password,
      });

      localStorage.setItem("role", "WARDEN");
      localStorage.setItem("warden", JSON.stringify(res.data));

      navigate("/warden/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-card">
      <h3 className="card-title">Warden Login</h3>

      {error && <p className="error-text">{error}</p>}

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

      <p className="warden-note">
        Warden accounts are created by admin
      </p>
    </div>
  );
};

export default WardenLogin;
