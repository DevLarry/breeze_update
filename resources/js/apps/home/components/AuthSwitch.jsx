import React from 'react';
import { Link } from 'react-router-dom';

const AuthSwitch = ({ isLogin }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-700">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={isLogin ? '/register' : '/login'}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </Link>
      </p>
    </div>
  );
};

export default AuthSwitch;