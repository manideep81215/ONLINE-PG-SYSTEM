import { useNavigate } from "react-router-dom";
import WardenHeader from "../../components/warden/WardenHeader";
import "./WardenDashboard.css";

const WardenDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      

      <div className="warden-dashboard">
        <h2 className="dashboard-title">Warden Dashboard</h2>
        <p className="dashboard-subtitle">
          Manage students, rooms, complaints, and fees.
        </p>

        <div className="dashboard-cards">
          <div
            className="dashboard-card"
            onClick={() => navigate("/warden/students")}
          >
            <h3>🧑‍🎓 Students</h3>
            <p>View and manage student profiles</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/warden/rooms")}
          >
            <h3>🚪 Rooms</h3>
            <p>Check room availability and capacity</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/warden/complaints")}
          >
            <h3>📝 Complaints</h3>
            <p>View and resolve student complaints</p>
          </div>

          {/* ✅ NEW Fees Card */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/warden/fees")}
          >
            <h3>💰 Fees</h3>
            <p>View monthly hostel fee status</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WardenDashboard;
