import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner"; // Import custom spinner
import MembershipListPage from "./components/Admin";

// Lazy load components
const FormPage = lazy(() => import("./components/FormPage"));
const ConfirmationPage = lazy(() => import("./components/ConfirmationPage"));
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const ThankYouPage = lazy(() => import("./components/ThankYouPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin" element= {<MembershipListPage/>} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-700">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
