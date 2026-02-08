import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./RoomsList.css";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/rooms")
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load rooms");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading rooms...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="rooms-container">
      <h2>Rooms</h2>
      <p className="rooms-subtitle">Hostel room availability overview</p>

      <div className="rooms-card">
        <table className="rooms-table">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Block</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No rooms found
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.block}</td>
                  <td>{room.capacity}</td>
                  <td>{room.occupiedBeds}</td>
                  <td>
                    <span
                      className={
                        room.available
                          ? "status-badge available"
                          : "status-badge full"
                      }
                    >
                      {room.available ? "Yes" : "No"}
                    </span>
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

export default RoomsList;
