import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./Profile.css";

function Profile() {
  const params = useParams();
  const storedId = localStorage.getItem("studentId");
  const studentId = params.studentId || storedId;

  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`/students/${studentId}`, formData)
      .then((res) => {
        setStudent(res.data);
        setEditMode(false);
      })
      .catch(() => setError("Update failed"));
  };

  if (!studentId) return <p className="loading-text">Loading student…</p>;
  if (loading) return <p className="loading-text">Loading profile…</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-page">
      <h2>Student Profile</h2>

      <div className="profile-card">
        <div className="profile-row">
          <span>Name</span>
          {editMode ? (
            <input name="name" value={formData.name || ""} onChange={handleChange} />
          ) : (
            <span>{student.name}</span>
          )}
        </div>

        <div className="profile-row">
          <span>Email</span>
          {editMode ? (
            <input name="email" value={formData.email || ""} onChange={handleChange} />
          ) : (
            <span>{student.email}</span>
          )}
        </div>

        <div className="profile-row">
          <span>Phone</span>
          {editMode ? (
            <input name="phone" value={formData.phone || ""} onChange={handleChange} />
          ) : (
            <span>{student.phone || "—"}</span>
          )}
        </div>

        <div className="profile-actions">
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>Edit</button>
          ) : (
            <>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
