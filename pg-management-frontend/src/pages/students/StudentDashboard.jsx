import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoticeBoard from "../../components/notices/NoticeBoard";
import axios from "../../api/axios";
import { getRoomByStudentId } from "../../services/roomService";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [notices, setNotices] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomLoading, setRoomLoading] = useState(true);
  const [roomError, setRoomError] = useState("");
  const { studentId } = useParams();

  // =============================
  // LOAD NOTICES
  // =============================
  const loadNotices = () => {
    axios
      .get("/notices")
      .then((res) => setNotices(res.data))
      .catch((err) =>
        console.error("NOTICE FETCH ERROR:", err)
      );
  };

  // =============================
  // LOAD ROOM
  // =============================
  const loadRoomDetails = async () => {
    try {
      const data = await getRoomByStudentId(studentId);

      // 👇 IMPORTANT: room not assigned
      if (!data) {
        setRoom(null);
      } else {
        setRoom(data);
      }
    } catch (error) {
      console.error("ROOM FETCH ERROR:", error);
      setRoomError("Room details not available");
    } finally {
      setRoomLoading(false); // 👈 always stop loading
    }
  };

  useEffect(() => {
    loadNotices();
    loadRoomDetails();

    window.addEventListener("focus", loadNotices);
    return () =>
      window.removeEventListener("focus", loadNotices);
  }, [studentId]);

  return (
    <div className="student-dashboard">
      {/* Notices */}
      <section className="dashboard-section">
        <h2>Notices</h2>
        <NoticeBoard notices={notices} />
      </section>

      {/* Room Details */}
      <section className="dashboard-section">
        <h2>My Room</h2>

        <div className="room-card">
          {roomLoading ? (
            <p className="info-text">Loading room details...</p>
          ) : roomError ? (
            <p className="error-text">{roomError}</p>
          ) : room ? (
            <>
              <div className="detail-row">
                <span>Block</span>
                <span>{room.block}</span>
              </div>

              <div className="detail-row">
                <span>Room No</span>
                <span>{room.roomNumber}</span>
              </div>

              <div className="detail-row">
                <span>Capacity</span>
                <span>{room.capacity}</span>
              </div>

              <div className="detail-row">
                <span>Occupied Beds</span>
                <span>{room.occupiedBeds}</span>
              </div>

              <div className="detail-row">
                <span>Status</span>
                <span
                  className={
                    room.available
                      ? "status-badge available"
                      : "status-badge full"
                  }
                >
                  {room.available ? "Available" : "Full"}
                </span>
              </div>
            </>
          ) : (
            <p className="info-text">
              No room assigned yet. Please contact the warden.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
