import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageFooter from "../../components/PageFooter";

function PaymentError() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/payment-error-2130357-1800921.png"
              alt="error"
              className="h-75 w-75 object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Payment Failed ❌
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Oops! Something went wrong with your transaction. Please try again.
          </p>

          {/* Button */}
          <Link
            to="/"
            className="bg-amber-800 text-amber-100 px-6 py-2 rounded-lg hover:bg-amber-900 transition"          >
            Go Back Home
          </Link>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default PaymentError;
