import React from 'react';
import AboutContent from '../components/AboutContent';

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex flex-col justify-center items-center">
      <div className="text-red-600 text-6xl">Error 404</div>
      <div className="max-w-6xl mx-auto text-red-500 text-3xl px-4 py-8">Page not Found!</div>
    </div>
  );
};

export default NotFound;
