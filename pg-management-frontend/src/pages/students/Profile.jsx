import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./Profile.css";

function Profile() {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =============================
  // FETCH PROFILE
  // =============================
  useEffect(() => {
    if (!studentId) {
      setError("Student ID missing");
      setLoading(false);
      return;
    }

    axios
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
      });
  }, [studentId]);

  // =============================
  // HANDLE INPUT
  // =============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // UPDATE PROFILE
  // =============================
  const handleUpdate = () => {
    axios
      .put(`/students/${studentId}`, formData)
      .then((res) => {
        setStudent(res.data);
        setEditMode(false);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Update failed")
      );
  };

  // =============================
  // RENDER
  // =============================
  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!student) return <p className="error-text">Profile not found</p>;

  return (
    <div className="profile-page">
      <h2>Student Profile</h2>
      <p className="profile-subtitle">View and update personal details</p>

      <div className="profile-card">
        <div className="profile-row">
          <span>Name</span>
          {editMode ? (
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{student.name}</span>
          )}
        </div>

        <div className="profile-row">
          <span>Email</span>
          {editMode ? (
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{student.email}</span>
          )}
        </div>

        <div className="profile-row">
          <span>Phone</span>
          {editMode ? (
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{student.phone || "—"}</span>
          )}
        </div>

        <div className="profile-row">
          <span>Status</span>
          <span
            className={
              student.active
                ? "status-badge active"
                : "status-badge inactive"
            }
          >
            {student.active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="profile-actions">
          {!editMode ? (
            <button className="btn primary" onClick={() => setEditMode(true)}>
              Edit
            </button>
          ) : (
            <>
              <button className="btn primary" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="btn secondary"
                onClick={() => {
                  setFormData(student);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
