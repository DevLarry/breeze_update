import React from 'react';
import { Link } from 'react-router-dom';
import { RiMegaphoneLine } from '@remixicon/react';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="space-y-4">
        <button className="w-full px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center justify-center">
          <i className="ri-edit-line mr-2"></i>
          Create Post
        </button>
        <Link
          to="/publize"
          className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <RiMegaphoneLine className="mr-2" />
          Publize
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;