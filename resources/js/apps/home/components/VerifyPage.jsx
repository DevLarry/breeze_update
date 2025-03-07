import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { confirmEmail, resendConfirmationEmail, checkVerification } from '../services/api';

const VerifyPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isTokenVerificationFailed, setIsTokenVerificationFailed] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get('token');
  const email = localStorage.getItem('email');
  const isForgotPassword = location.state?.from === 'forgot-password';

  if (!email) {
    navigate('/register');
    return null;
  }

  useEffect(() => {
    const initializeVerification = async () => {
      try {
        const verificationStatus = await checkVerification({ email });
        if (verificationStatus.isVerified && !isForgotPassword) {
          setIsVerified(true);
          return;
        }

        if (token && !isTokenVerificationFailed) {
          setStatus('Verifying with link...');
          console.log('Attempting token verification with token:', token);
          const response = await fetch(`http://localhost:3021/api/auth/verify?token=${token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('Token verification response:', data);
          if (data.status === 'success') {
            setIsVerified(true);
          } else {
            setStatus('');
            setIsTokenVerificationFailed(true);
            setError(data.message || 'Invalid or expired verification link');
          }
        }
      } catch (err) {
        console.error('Token verification error:', err);
        setStatus('');
        setIsTokenVerificationFailed(true);
        setError(err.message || 'Verification check failed');
      }
    };

    initializeVerification();
  }, [token, email, navigate, isTokenVerificationFailed, isForgotPassword]);

  useEffect(() => {
    if (isVerified) {
      console.log('Verification successful, redirecting...');
      setTimeout(() => {
        localStorage.removeItem('email');
        navigate(isForgotPassword ? '/reset-password' : '/login');
      }, 2000);
    }
  }, [isVerified, navigate, isForgotPassword]);

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
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    try {
      if (isForgotPassword) {
        await sendForgotPassword({ email });
      } else {
        await resendConfirmationEmail({ email });
      }
      setTimer(300);
      setIsResendDisabled(true);
      alert('A new verification code and link have been sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to resend email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const code = otp.join('');
    try {
      const response = await confirmEmail({ email, code });
      if (response.data.status === 'success') {
        setIsVerified(true);
      }
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex">
          <div className="hidden md:block w-1/2 bg-blue-600 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
            <div className="relative z-10 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                {isForgotPassword ? 'Reset Your Password' : 'Verify Your Account'}
              </h2>
              <p className="text-lg mb-6">
                {isForgotPassword ? 'Verify to reset your password' : 'One step closer to connecting with your campus'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-mail-check-line text-2xl mr-3"></i>
                  <span>Check your email</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-shield-keyhole-line text-2xl mr-3"></i>
                  <span>Enter code or click link</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-double-line text-2xl mr-3"></i>
                  <span>{isForgotPassword ? 'Reset your password' : 'Start using Campus Connect'}</span>
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
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Verification Successful!</h2>
                <p className="text-gray-600">
                  {isForgotPassword
                    ? 'You can now reset your password. Redirecting...'
                    : 'Your account has been verified. Redirecting to login...'}
                </p>
              </>
            ) : status ? (
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{status}</h2>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                    <i className="ri-mail-send-line text-4xl text-blue-600"></i>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                  <p className="text-gray-600">We’ve sent a code and link to {email}.</p>
                  <p className="text-gray-600">Enter the code below or click the link in your email.</p>
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
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>

                  <div className="text-center space-y-4">
                    <p className="text-gray-600">
                      Didn’t receive it?{' '}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;