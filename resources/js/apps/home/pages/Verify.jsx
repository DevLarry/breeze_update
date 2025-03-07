// src/pages/Verify.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyForm from '../components/VerifyForm';
import SuccessMessage from '../components/SuccessMessage';
import { checkVerification } from '../services/api';

const Verify = () => {
  const [isVerified, setIsVerified] = useState(null); // null = loading, true/false = verified status
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!email) {
        navigate('/register');
        return;
      }

      try {
        const response = await checkVerification({ email });
        setIsVerified(response.data.isVerified);
      } catch (error) {
        console.error('Error checking verification status:', error);
        setIsVerified(false); // Default to showing VerifyForm on error
      }
    };

    fetchVerificationStatus();
  }, [email, navigate]);

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    }
  }, [isVerified, navigate]);

  // While fetching verification status, show a loading state
  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p>Loading...</p>
      </div>
    );
  }

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex">
          <div className="hidden md:block w-1/2 bg-blue-600 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
            <div className="relative z-10 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Verify Your Account</h2>
              <p className="text-lg mb-6">One step closer to connecting with your campus</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-mail-check-line text-2xl mr-3"></i>
                  <span>Check your email</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-shield-keyhole-line text-2xl mr-3"></i>
                  <span>Enter verification code</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-double-line text-2xl mr-3"></i>
                  <span>Start using Campus Connect</span>
                </div>
              </div>
            </div>
          </div>

          {isVerified ? <SuccessMessage /> : <VerifyForm onVerify={handleVerify} />}
        </div>
      </div>
    </div>
  );
};

export default Verify;