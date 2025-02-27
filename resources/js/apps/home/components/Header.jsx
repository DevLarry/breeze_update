import React from 'react';
import { RiSearchLine, RiNotification2Line } from '@remixicon/react';

const Header = () => {
  return (
    <header className="bg-white rounded-2xl shadow-lg p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/images/logo.jfif" alt="Logo" className="w-12 h-12 rounded-xl" />
          <h1 className="text-xl font-bold text-gray-900">Campus Connect</h1>
        </div>

        <div className="relative flex-1 mx-6">
          <input
            type="text"
            placeholder="Search posts, topics..."
            className="w-full px-6 py-2.5 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <RiSearchLine className="absolute right-4 top-3 text-gray-500" />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-indigo-600 relative">
            <RiNotification2Line className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
          <a href="/profile">
            <img
              src="/images/myimg.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;