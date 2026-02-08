import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomByStudentId } from "../../services/roomService";
import "./RoomDetails.css";

function RoomDetails() {
  const { studentId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) {
      setError("Student ID missing");
      setLoading(false);
      return;
    }

    getRoomByStudentId(studentId)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Room fetch error:", err);
        setError("Room details not available");
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <p className="loading-text">Loading room details...</p>;
  
  if (error) {
    return (
      <div className="room-details-container">
        <h2>Room Details</h2>
        <div className="room-details-card">
          <p className="error-text">No room assigned yet</p>
          <p style={{ textAlign: "center", color: "#666", marginTop: "10px" }}>
            Please contact the warden to get a room assigned.
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-details-container">
        <h2>Room Details</h2>
        <div className="room-details-card">
          <p className="error-text">No room assigned</p>
        </div>
      </div>
    );
  }

  return (
    <div className="room-details-container">
      <h2>Room Details</h2>
      <p className="room-details-subtitle">
        Assigned room information
      </p>

      <div className="room-details-card">
        <div className="detail-row">
          <span>Block</span>
          <span>{room.block}</span>
        </div>

        <div className="detail-row">
          <span>Room Number</span>
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
      </div>
    </div>
  );
}

export default RoomDetails;
