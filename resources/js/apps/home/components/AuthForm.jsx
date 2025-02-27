import React from 'react';
import { RiMailLine, RiLockLine } from '@remixicon/react';
import SocialLoginButtons from './SocialLoginButtons';
import Divider from './Divider';
import AuthSwitch from './AuthSwitch';

const AuthForm = ({ isLogin }) => {
  return (
    <div className="w-full md:w-1/2 p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>

      <SocialLoginButtons isLogin={isLogin} />
      <Divider />

      <form className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-2">Email *</label>
          <div className="relative">
            <input
              type="email"
              placeholder={isLogin ? 'Enter your email' : 'youremail@gmail.com'}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-300 text-gray-800"
              required
            />
            <RiMailLine className="absolute right-4 top-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type="password"
              placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-300 text-gray-800"
              required
            />
            <RiLockLine className="absolute right-4 top-4 text-gray-400" />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-gray-700 mb-2">Role *</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Your Role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        )}

        {isLogin && (
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      <AuthSwitch isLogin={isLogin} />
    </div>
  );
};

export default AuthForm;