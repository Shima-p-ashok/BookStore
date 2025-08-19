import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageFooter from "../../components/PageFooter";

function PaymentSuccess() {
  return (
   <div>
    <Header/>
    <div className="flex items-center justify-center h-screen bg-gray-50">
  <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
    {/* Success Icon */}
    <div className="flex justify-center mb-4">
      <img
        src="https://fastpan.utiindia.in/WL-CNT/main/assest/img/success.gif"
        alt="success"
        className="h-60 w-60 object-contain"
      />
    </div>

    {/* Title */}
    <h1 className="text-2xl text-green-600 font-bold text-gray-800 mb-2">
      Payment Successful!🎉🎊
    </h1>

    {/* Message */}
    <p className="text-gray-600 mb-6">
      Thank you for your purchase. Your order has been confirmed.
    </p>

    {/* Button */}
    <Link
      to="/"
      className="bg-amber-800 text-amber-100 px-6 py-2 rounded-lg hover:bg-amber-900 transition"
    >
      Go to Home
    </Link>
  </div>
</div>
<PageFooter/>
   </div>

  );
}

export default PaymentSuccess;
