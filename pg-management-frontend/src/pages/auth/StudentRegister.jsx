import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthLayout from "../../components/auth/AuthLayout";
import "./StudentRegister.css";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadharNumber: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    const {
      name,
      email,
      aadharNumber,
      phone,
      password,
      confirmPassword,
    } = formData;

    // =============================
    // FRONTEND VALIDATION
    // =============================
    if (!name || !email || !aadharNumber || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Aadhar must be numeric
    if (isNaN(Number(aadharNumber))) {
      alert("Aadhar number must be numeric");
      return;
    }

    // =============================
    // API CALL
    // =============================
    axios
      .post("/students", {
        name: name.trim(),
        email: email.trim(),
        aadharNumber: Number(aadharNumber), // ✅ SAFE NOW
        phone: phone.trim(),
        password: password,
      })
      .then(() => {
        alert("Student registered successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert(
          err.response?.data?.message ||
            "Registration failed. Email or Aadhar may already exist."
        );
      });
  };

  return (
    <AuthLayout>
      <div className="register-card">
        <h3 className="register-title">Student Registration</h3>

        <input
          className="register-input"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="number"
          name="aadharNumber"
          placeholder="Aadhar Number"
          value={formData.aadharNumber}
          onChange={handleChange}
        />

        <input
          className="register-input"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </AuthLayout>
  );
}

export default StudentRegister;
