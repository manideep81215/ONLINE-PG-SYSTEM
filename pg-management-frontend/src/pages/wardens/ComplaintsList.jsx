import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ComplaintsList.css";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/complaints")
      .then((res) => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load complaints");
        setLoading(false);
      });
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`/complaints/${id}/status`, null, {
        params: { status },
      })
      .then(() => {
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status } : c
          )
        );
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="loading-text">Loading complaints...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const hasPendingComplaints = complaints.some(
    (c) => c.status !== "RESOLVED"
  );

  return (
    <div className="complaints-container">
      <h2>Complaints</h2>
      <p className="complaints-subtitle">
        Student complaints and resolution status
      </p>

      <div className="complaints-card">
        {complaints.length === 0 ? (
          <p style={{ padding: "20px" }}>No complaints found.</p>
        ) : (
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Status</th>
                {hasPendingComplaints && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.type}</td>
                  <td>{c.subject}</td>
                  <td className="description-cell">
                    {c.description}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {hasPendingComplaints && (
                    <td>
                      {c.status !== "RESOLVED" && (
                        <div className="action-buttons">
                          {c.status !== "IN_PROGRESS" && (
                            <button
                              className="btn in-progress"
                              onClick={() =>
                                updateStatus(c.id, "IN_PROGRESS")
                              }
                            >
                              In Progress
                            </button>
                          )}
                          <button
                            className="btn resolve"
                            onClick={() =>
                              updateStatus(c.id, "RESOLVED")
                            }
                          >
                            Resolve
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ComplaintsList;
