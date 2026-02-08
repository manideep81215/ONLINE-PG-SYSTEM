import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./WardenFees.css";

function WardenFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/fees")
      .then((res) => {
        setFees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch fees", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading fee details...</p>;
  }

  return (
    <div className="warden-fees-container">
      <h2 className="h2">Hostel Fee Details</h2>
      <p className="fees-subtitle">
        Monthly payment details for all students
      </p>

      {fees.length === 0 ? (
        <p>No fee records found.</p>
      ) : (
        <table className="fees-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>

          <tbody>
            {fees
              .sort(
                (a, b) =>
                  b.year - a.year || b.month - a.month
              )
              .map((fee, index) => (
                <tr key={index}>
                  <td>{fee.studentName}</td>
                  <td>{fee.month}</td>
                  <td>{fee.year}</td>
                  <td>{fee.amount}</td>
                  <td>
                    <span
                      className={
                        fee.status === "PAID"
                          ? "status-paid"
                          : "status-due"
                      }
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td>
                    {fee.paidAt
                      ? new Date(fee.paidAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WardenFees;
