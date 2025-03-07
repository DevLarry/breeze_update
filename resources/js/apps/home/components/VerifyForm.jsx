// src/components/VerifyForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmEmail, resendConfirmationEmail } from '../services/api';

const VerifyForm = ({ onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem('email');

  if (!email) {
    navigate('/register');
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) setIsResendDisabled(false);
  }, [timer]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log('OTP updated:', newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await resendConfirmationEmail(email);
      setTimer(300);
      setIsResendDisabled(true);
      alert('A new verification code and link have been sent to your email.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const code = otp.join('');
    console.log('Submitting:', { email, code });
    try {
      const response = await confirmEmail({ email, code });
      if (response.data.status === 'success') {
        onVerify(); // Trigger the parent to show SuccessMessage
        localStorage.removeItem('email'); // Clean up
        // Remove immediate navigation to let Verify page handle it
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-12">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
          <i className="ri-mail-send-line text-4xl text-blue-600"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Check Your Email</h2>
        <p className="text-gray-600">We've sent a verification code and a link to {email}.</p>
        <p className="text-gray-600">Use the code below or click the link in your email to verify.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Verifying...' : 'Verify with Code'}
        </button>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Didn't receive it?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResendDisabled || loading}
              className={`text-blue-600 hover:underline ${
                isResendDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend Code and Link
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Code expires in{' '}
            <span className="font-medium">
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default VerifyForm;