import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./StudentProfile.css";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  // Function to fetch student data
  const fetchStudent = () => {
    axios
      .get(`/students/${studentId}`)  
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setRoomNumber(res.data.room?.roomNumber || "");
@@ -23,6 +24,15 @@
        setError("Failed to load student");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!studentId) {
      setError("Student ID missing");
      setLoading(false);
      return;
    }
    fetchStudent();
  }, [studentId]);

  const getWardenId = () => {
@@ -42,20 +52,20 @@
    }

    axios
      .put(`/wardens/${wardenId}/assign-room`, {  // ✅ FIXED: Proper parentheses
      .put(`/wardens/${wardenId}/assign-room`, {
        studentId: Number(studentId),
        roomNumber: Number(roomNumber),
      })
      .then((res) => {
        alert("Room assigned successfully");
        setStudent(res.data);
        setRoomNumber(res.data.room?.roomNumber || "");
        // ✅ Refresh student data after assignment
        fetchStudent();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Failed to assign room");
        alert(err.response?.data?.message || "Failed to assign room");
      });
  };  // ✅ ADDED: Missing closing bracket
  };

  const handleDeassignRoom = () => {
    const wardenId = getWardenId();
@@ -65,17 +75,17 @@
    }

    axios
      .put(`/wardens/${wardenId}/deassign-room`, {  // ✅ FIXED: Proper parentheses
      .put(`/wardens/${wardenId}/deassign-room`, {
        studentId: Number(studentId),
      })
      .then((res) => {
        alert("Room deassigned successfully");
        setStudent(res.data);
        setRoomNumber("");
        // ✅ Refresh student data after deassignment
        fetchStudent();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Failed to deassign room");
        alert(err.response?.data?.message || "Failed to deassign room");
      });
  };

@@ -109,35 +119,35 @@
        <div className="profile-row">
          <span>Current Room</span>
          <span className="room-badge">
            {student.room?.roomNumber || "Not assigned"}
            {student.room ? `Block ${student.room.block} - Room ${student.room.roomNumber}` : "Not assigned"}
          </span>
        </div>

        <hr className="profile-divider" />

        <h3>Assign / Change Room</h3>
        <div className="assign-room">
          <input
            type="number"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <button onClick={handleAssignRoom}>
            Assign Room
          </button>
          {student.room && (
            <button
              className="deassign-btn"
              onClick={handleDeassignRoom}
            >
              Deassign Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
