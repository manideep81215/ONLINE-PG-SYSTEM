import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./Profile.css";

function Profile() {
@@ -18,18 +19,14 @@
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`)
    axios.get(`/students/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setFormData(data);
        setStudent(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
      });
  }, [studentId]);
@@ -42,112 +39,104 @@
  };

  const handleUpdate = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    axios.put(`/students/${studentId}`, formData)
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updated) => {
        setStudent(updated);
        setStudent(res.data);
        setEditMode(false);
      })
      .catch((err) => setError(err.message));
      .catch((err) => setError(err.response?.data?.message || "Update failed"));
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
