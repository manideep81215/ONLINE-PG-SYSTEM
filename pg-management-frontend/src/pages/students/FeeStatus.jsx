import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import "./FeeStatus.css";

function FeeStatus() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current month fee
  useEffect(() => {
    axios
      .get(`/fees/student/${studentId}/current`)
      .then((res) => {
        setFee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load fee", err);
        setLoading(false);
      });
  }, [studentId]);

  const handlePayRedirect = () => {
    // Redirect to payment page
    navigate(`/payment/${studentId}/${fee.id}`);
  };

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading fee details...</p>;
  }

  if (!fee) {
    return <p style={{ padding: "24px" }}>Fee record not found.</p>;
  }

  return (
    <div className="fee-status-container">
      <h2>Fee Status</h2>

      <div className="fee-card">
        <p>
          <strong>Month:</strong> {fee.month} / {fee.year}
        </p>

        <p>
          <strong>Amount:</strong> ₹{fee.amount}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              fee.status === "PAID" ? "status-paid" : "status-due"
            }
          >
            {fee.status}
          </span>
        </p>

        {fee.status === "PAID" && fee.paidAt && (
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(fee.paidAt).toLocaleString()}
          </p>
        )}

        {/* 🔴 Redirect to payment page */}
        {fee.status === "DUE" && (
          <button
            className="pay-btn"
            onClick={handlePayRedirect}
          >
            Pay Now
          </button>
        )}

        {fee.status === "PAID" && (
          <p className="paid-success">
            ✅ Fee paid successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default FeeStatus;
