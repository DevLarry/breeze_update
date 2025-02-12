import React from 'react';

const PaymentConfirmation = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Confirmation</h2>
      <p className="text-gray-600 mb-6">
        Please confirm your payment to complete the Publize process.
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="text-gray-700">Total Amount</span>
          <span className="font-semibold text-gray-900">$10.00</span>
        </div>

        <button
          onClick={() => alert('Payment successful! Your post is now being promoted.')}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;