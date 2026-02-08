import { useState } from "react";
import axios from "../../api/axios";
import "./Complaint.css";

function Complaint() {
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.type || !formData.subject || !formData.description) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("/complaints", formData);

      setMessage("Complaint submitted successfully");
      setFormData({ type: "", subject: "", description: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="complaint-container">
      <h2>Raise a Complaint</h2>
      <p className="complaint-subtitle">
        Submit an issue to hostel management
      </p>

      <div className="complaint-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Complaint Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="Room">Room Issue</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Food">Food</option>
              <option value="Noise">Noise</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue"
            />
          </div>

          <button type="submit" className="btn primary">
            Submit Complaint
          </button>
        </form>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default Complaint;
