import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./StudentProfile.css";

const StudentProfile = () => {
  const params = useParams();
  const storedId = localStorage.getItem("studentId");
  const studentId = params.studentId || storedId;

  const [student, setStudent] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudent = () => {
    if (!studentId) return;

    axios
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setRoomNumber(res.data.room?.roomNumber || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load student");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  if (!studentId) return <p>Loading student…</p>;
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>

      <div className="profile-row">
        <span>Name</span>
        <span>{student.name}</span>
      </div>

      <div className="profile-row">
        <span>Email</span>
        <span>{student.email}</span>
      </div>

      <div className="profile-row">
        <span>Room</span>
        <span>
          {student.room
            ? `Block ${student.room.block} - Room ${student.room.roomNumber}`
            : "Not assigned"}
        </span>
      </div>
    </div>
  );
};

export default StudentProfile;
