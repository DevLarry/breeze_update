import React from 'react';
import { RiBookOpenLine, RiBriefcaseLine, RiHeartLine } from '@remixicon/react';

const ProfileAbout = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">About Hassan Mahmud</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-indigo-50">
          <RiBookOpenLine className="text-xl text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Studies</p>
            <p className="font-medium text-gray-900">Computer Science</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-purple-50">
          <RiBriefcaseLine className="text-xl text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Work</p>
            <p className="font-medium text-gray-900">DevLarry Tech Solutions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-pink-50">
          <RiHeartLine className="text-xl text-pink-600" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-gray-900">Single</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;