import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex">
          <div className="hidden md:block w-1/2 bg-blue-600 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
            <div className="relative z-10 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to Campus Connect</h2>
              <p className="text-lg mb-6">Connecting campuses, bridging futures</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-community-line text-2xl mr-3"></i>
                  <span>Quick and secure access</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-shield-check-line text-2xl mr-3"></i>
                  <span>Multiple login options</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-lock-2-line text-2xl mr-3"></i>
                  <span>Verified campus accounts</span>
                </div>
              </div>
            </div>
          </div>
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

export default Register;