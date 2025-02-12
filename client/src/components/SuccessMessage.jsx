import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="text-center">
      <div className="inline-block p-3 rounded-full bg-green-100 mb-4 animate-bounce">
        <i className="ri-checkbox-circle-line text-4xl text-green-600"></i>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Verified!</h2>
      <p className="text-gray-600 mb-8">Your account has been successfully verified</p>
      <button
        onClick={() => (window.location.href = '/dashboard')}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Continue to Dashboard
      </button>
    </div>
  );
};

export default SuccessMessage;