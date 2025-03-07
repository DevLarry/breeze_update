// src/components/VerifyLink.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyLink = () => {
  const [status, setStatus] = useState('Verifying your account...');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  console.log('VerifyLink rendered, token:', token);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        console.log('No token provided');
        setStatus('Invalid verification link');
        return;
      }

      try {
        console.log('Calling backend API with token:', token);
        const response = await axios.get(`http://localhost:3021/api/auth/verify-link?token=${token}`);
        console.log('Backend response:', response.data);
        if (response.data.status === 'success') {
          setIsVerified(true);
        } else {
          setStatus(response.data.message);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setStatus(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
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

          <div className="w-full md:w-1/2 p-12 text-center">
            {isVerified ? (
              <>
                <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
                  <i className="ri-check-double-line text-4xl text-green-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Successful Verification!</h2>
                <p className="text-gray-600">Your account has been verified. Redirecting to login...</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{status}</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyLink;