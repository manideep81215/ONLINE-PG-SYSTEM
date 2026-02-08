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
    const { name, email, aadharNumber, password, confirmPassword } = formData;

    if (!name || !email || !aadharNumber || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("/students", {
        name: formData.name,
        email: formData.email,
        aadharNumber: Number(formData.aadharNumber),
        phone: formData.phone,
        password: formData.password, // 🔴 sent once
        active: true,
      })
      .then(() => {
        alert("Student registered successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Registration failed (email or aadhar may exist)");
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
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="register-input"
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
