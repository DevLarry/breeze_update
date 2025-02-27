import React from 'react';
import { RiGoogleFill, RiFacebookFill } from '@remixicon/react';

const SocialLoginButtons = ({ isLogin }) => {
  return (
    <div className="space-y-3 mb-6">
      <button className="text-red-500 w-full flex items-center justify-center py-3 border border-red-600 rounded-lg hover:bg-gray-50 transition">
        <RiGoogleFill className="text-2xl mr-3 text-red-500" />
        <span>{isLogin ? 'Continue with Google' : 'Sign up with Google'}</span>
      </button>
      <button className="text-blue-500 border-blue-600 w-full flex items-center justify-center py-3 border rounded-lg hover:bg-gray-50 transition">
        <RiFacebookFill className="text-2xl mr-3 text-blue-600" />
        <span>{isLogin ? 'Continue with Facebook' : 'Sign up with Facebook'}</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;