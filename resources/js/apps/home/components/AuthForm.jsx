import React, { useState } from 'react';
import { RiMailLine, RiLockLine } from '@remixicon/react';
import { useNavigate, Link} from 'react-router-dom';
import { signIn, register } from '../services/api';
import SocialLoginButtons from './SocialLoginButtons';
import Divider from './Divider';
import AuthSwitch from './AuthSwitch';

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await signIn({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('email', formData.email);
        navigate('/dashboard');
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        localStorage.setItem('email', formData.email);
        navigate('/verify');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      if (errorMessage.includes('not verified')) {
        localStorage.setItem('email', formData.email);
        navigate('/verify');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>

      <SocialLoginButtons isLogin={isLogin} />
      <Divider />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label className="block text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              name="role"
              value={formData.role}
              onChange={handleChange}
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
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      <AuthSwitch isLogin={isLogin} />
    </div>
  );
};

export default AuthForm;