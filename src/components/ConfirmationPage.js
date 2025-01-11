import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa"; // React Icon for confirmation

function ConfirmationPage() {
  const { state } = useLocation();
  const { formData } = state;
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const docRef = await addDoc(collection(db, "memberships"), formData);
      navigate("/payment", { state: { id: docRef.id, formData } });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        <h1 className="text-2xl font-semibold mb-4 animate__animated animate__fadeIn">
          Please Confirm Your Details
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-sm">
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-green-600 mr-2" size={20} />
            <span className="font-semibold text-lg text-gray-800">Your Details:</span>
          </div>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className="text-sm mb-2 text-gray-600">
              <span className="font-medium capitalize">{key}:</span> {value}
            </p>
          ))}
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
