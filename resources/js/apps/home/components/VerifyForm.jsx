import React, { useState, useEffect } from 'react';

const VerifyForm = ({ onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); 
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendCode = () => {
    setTimer(300); // Reset timer to 5 minutes
    setIsResendDisabled(true);
    alert('A new code has been sent to your email.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(); // Trigger success message
  };

  return (
    <div className="w-full md:w-1/2 p-12">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
          <i className="ri-mail-send-line text-4xl text-blue-600"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Check Your Email</h2>
        <p className="text-gray-600">We've sent a verification code to your email</p>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Verify Account
        </button>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResendDisabled}
              className={`text-blue-600 hover:underline ${
                isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend Code
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