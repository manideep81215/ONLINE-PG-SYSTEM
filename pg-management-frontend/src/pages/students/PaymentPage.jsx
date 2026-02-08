import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function PaymentPage() {
  const { studentId, feeId } = useParams();
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    axios
      .post(`/fees/${feeId}/pay`)
      .then(() => {
        navigate(`/student/${studentId}/fees`);
      })
      .catch(() => {
        alert("Payment failed");
      });
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Payment</h2>
      <p>Fee ID: {feeId}</p>
      <p>Confirm your payment</p>

      <button onClick={handleConfirmPayment}>
        Confirm Payment
      </button>
    </div>
  );
}

export default PaymentPage;
