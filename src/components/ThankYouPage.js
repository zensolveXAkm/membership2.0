import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // React Icons

function ThankYouPage() {
  const { state } = useLocation();
  const { id, formData } = state;

  return (
    <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 text-center mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-green-600">Thank You, {formData.name}!</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
        <p className="text-lg mb-4">Your membership ID is: <span className="font-bold text-xl">{id}</span></p>
        <p className="text-lg mb-4">You have successfully obtained a membership from <span className="font-bold text-green-600">Zensolve Infotech Pvt Ltd</span>.</p>
        
        <div className="text-lg font-medium mb-4">
          <span>Total Paid: </span><span className="font-bold text-xl text-blue-600">₹1000</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
        <div className="space-y-2 text-left">
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className="text-gray-600">
              <span className="font-medium capitalize">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="space-y-4 text-left">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-600 mr-2" size={20} />
            <span>2nd Floor, Bhagalpur Road, Godda, Near Railway Station</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-600 mr-2" size={20} />
            <span>Email: <a href="mailto:support@infozensolve.in" className="text-blue-600">support@infozensolve.in</a></span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-gray-600 mr-2" size={20} />
            <span>Call Us: <span className="text-blue-600">02269622941</span></span>
          </div>
        </div>
      </div>

      <footer className="text-sm text-gray-600 mt-6">
        <p>Copyright © 2025 by Zensolve Infotech Solution Private Limited. All Rights Reserved.</p>
      </footer>

      <div className="mt-8 text-xl font-semibold text-gray-700">
        <p>Our team will shortly contact you. Please be patient.</p>
      </div>
    </div>
  );
}

export default ThankYouPage;
