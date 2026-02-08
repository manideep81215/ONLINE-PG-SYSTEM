import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./StudentsList.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/students/warden-list")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load students");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading-text">Loading students...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="students-container">
      <h2>Students</h2>
      <p className="students-subtitle">
        All registered hostel students
      </p>

      <div className="students-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.name}</td>
                  <td>{student.roomNumber ?? "—"}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/warden/students/${student.studentId}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
