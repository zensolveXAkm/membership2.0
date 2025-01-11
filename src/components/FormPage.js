import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    fathersName: "",
    email: "",
    phone: "",
    state: "",
    district: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirm", { state: { formData } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Zensolve Membership Form
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Join Zensolve Infotech by filling out the form below. All fields are required.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {key === "fathersName" ? "Father's Name" : key}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                placeholder={`Enter your ${key === "fathersName" ? "father's name" : key}`}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Submit
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-6 text-center">
          By submitting, you agree to our{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Terms and Conditions
          </span>.
        </p>
      </div>
    </div>
  );
}

export default FormPage;
