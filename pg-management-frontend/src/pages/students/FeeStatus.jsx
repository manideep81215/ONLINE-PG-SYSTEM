import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import "./FeeStatus.css";

function FeeStatus() {
  const { studentId } = useParams();

  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // =============================
  // LOAD CURRENT MONTH FEE
  // =============================
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

  // =============================
  // MARK FEE AS PAID (NO REDIRECT)
  // =============================
  const handlePayNow = async () => {
    try {
      setPaying(true);

      // 🔴 BACKEND CALL TO MARK PAID
      await axios.put(`/fees/${fee.id}/mark-paid`);

      // ✅ UPDATE UI IMMEDIATELY
      setFee((prev) => ({
        ...prev,
        status: "PAID",
        paidAt: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Payment failed", err);
      alert("Failed to update fee status");
    } finally {
      setPaying(false);
    }
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
            {fee.status === "PAID" ? "PAID ✅" : "DUE"}
          </span>
        </p>

        {fee.status === "PAID" && fee.paidAt && (
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(fee.paidAt).toLocaleString()}
          </p>
        )}

        {/* ✅ PAY NOW (NO REDIRECT) */}
        {fee.status === "DUE" && (
          <button
            className="pay-btn"
            onClick={handlePayNow}
            disabled={paying}
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>
        )}

        {fee.status === "PAID" && (
          <p className="paid-success">
            ✅ Fee paid 
          </p>
        )}
      </div>
    </div>
  );
}

export default FeeStatus;
