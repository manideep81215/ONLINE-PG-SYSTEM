import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomByStudentId } from "../../services/roomService";
import "./RoomDetails.css";

function RoomDetails() {
  const params = useParams();
  const storedId = localStorage.getItem("studentId");
  const studentId = params.studentId || storedId;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;

    getRoomByStudentId(studentId)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch(() => {
        setRoom(null);
        setLoading(false);
      });
  }, [studentId]);

  if (!studentId) return <p>Loading student…</p>;
  if (loading) return <p>Loading room details…</p>;

  if (!room) {
    return (
      <div className="room-details-container">
        <h2>Room Details</h2>
        <p>No room assigned yet</p>
      </div>
    );
  }

  return (
    <div className="room-details-container">
      <h2>Room Details</h2>

      <div className="detail-row">
        <span>Block</span>
        <span>{room.block}</span>
      </div>

      <div className="detail-row">
        <span>Room Number</span>
        <span>{room.roomNumber}</span>
      </div>

      <div className="detail-row">
        <span>Status</span>
        <span>{room.available ? "Available" : "Full"}</span>
      </div>
    </div>
  );
}

export default RoomDetails;
