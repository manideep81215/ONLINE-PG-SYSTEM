import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) {
      setError("Student ID missing");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updated) => {
        setStudent(updated);
        setEditMode(false);
      })
      .catch((err) => setError(err.message));
  };

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
            <button
              className="btn primary"
              onClick={() => setEditMode(true)}
            >
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
