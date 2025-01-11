import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

function PaymentPage() {
  const { state } = useLocation();
  const { id, formData } = state;
  const [utr, setUtr] = useState("");
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      await updateDoc(doc(db, "memberships", id), { utr });
      navigate("/thank-you", { state: { id, formData } });
    } catch (error) {
      console.error("Error updating UTR: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MdPayment className="text-blue-600" />
          Payment Details
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Please complete the payment to confirm your membership with{" "}
          <span className="font-semibold text-gray-800">Zensolve Infotech</span>.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-800">
            <span className="font-medium">Paying to:</span> Zensolve Infotech Pvt. Ltd.
          </p>
          <p className="text-gray-800">
            <span className="font-medium">Amount:</span> ₹1000
          </p>
          <p className="text-gray-800">
            <span className="font-medium">Purpose:</span> Membership Fee
          </p>
        </div>
        <div className="flex flex-col items-center mb-6">
          <img
            src="qr.png"
            alt="QR Code"
            className="w-40 h-40 border rounded-md"
          />
          <p className="text-gray-600 text-sm mt-2 flex items-center gap-1">
            <img
              src="upi.png"
              alt="UPI Icon"
              className="w-4 h-4"
            />
            Scan to Pay via UPI
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter UTR Number"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
          required
        />
        <button
          onClick={handleComplete}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all"
        >
          <FaCheckCircle />
          Complete Payment
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
