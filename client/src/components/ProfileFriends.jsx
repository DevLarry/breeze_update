import React from 'react';

const ProfileFriends = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Friends</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
          <img src="/images/myimg.jpg" alt="Friend 1" className="w-12 h-12 rounded-xl" />
          <div>
            <p className="font-medium text-gray-900">Ibn Hassan</p>
            <p className="text-sm text-gray-500">10 Mutual Friends</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
          <img src="/images/myimg.jpg" alt="Friend 2" className="w-12 h-12 rounded-xl" />
          <div>
            <p className="font-medium text-gray-900">Dev Larry Smith</p>
            <p className="text-sm text-gray-500">50 Mutual Friends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriends;