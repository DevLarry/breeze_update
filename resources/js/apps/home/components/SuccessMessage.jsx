// src/components/SuccessMessage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect after 2 seconds
  }, [navigate]);

  return (
    <div className="w-full md:w-1/2 p-12 text-center">
      <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
        <i className="ri-check-double-line text-4xl text-green-600"></i>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Successful Verification!</h2>
      <p className="text-gray-600">Your account has been verified. Redirecting to login...</p>
    </div>
  );
};

export default SuccessMessage;