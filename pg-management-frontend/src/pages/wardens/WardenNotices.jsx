import { useEffect, useState } from "react";
import axios from "../../api/axios";
import NoticeForm from "../../components/notices/NoticeForm";
import "./WardenNotices.css";

function WardenNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch notices from backend
  const fetchNotices = () => {
    axios
      .get("/notices")
      .then((res) => {
        setNotices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notices", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 🔹 add notice (warden → backend)
  const handleAddNotice = (notice) => {
    axios
      .post("/notices", {
        title: notice.title,
        content: notice.message,
      })
      .then(() => {
        fetchNotices(); // refresh list
      })
      .catch((err) => {
        console.error("Failed to add notice", err);
      });
  };

  // 🔹 delete notice (optional, backend must support it)
  const handleDelete = (id) => {
    axios
      .delete(`/notices/${id}`)
      .then(() => {
        fetchNotices();
      })
      .catch((err) => {
        console.error("Failed to delete notice", err);
      });
  };

  if (loading) {
    return <p className="warden-notices-container">Loading notices...</p>;
  }

  return (
    <div className="warden-notices-container">
      <h2>Manage Notices</h2>

      <NoticeForm onAdd={handleAddNotice} />

      {notices.length === 0 ? (
        <p className="no-notice">No notices created yet</p>
      ) : (
        notices.map((notice) => (
          <div key={notice.id} className="warden-notice-card">
            <div className="notice-header">
              <h4>{notice.title}</h4>
              <button
                className="delete-btn"
                onClick={() => handleDelete(notice.id)}
              >
                Delete
              </button>
            </div>

            <p>{notice.content}</p>
            <span className="notice-date">
              {new Date(notice.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default WardenNotices;
