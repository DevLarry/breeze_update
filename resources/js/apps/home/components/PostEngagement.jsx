import React from 'react';

const PostEngagement = () => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
      <div className="flex items-center space-x-2">
        <span className="flex items-center">
          <i className="ri-thumb-up-fill text-blue-500"></i>
          <i className="ri-heart-fill text-red-500 -ml-1"></i>
          <span className="ml-2">100 reactions</span>
        </span>
      </div>
      <div className="flex space-x-4">
        <span>50 Comments</span>
        <span>18 Shares</span>
      </div>
    </div>
  );
};

export default PostEngagement;