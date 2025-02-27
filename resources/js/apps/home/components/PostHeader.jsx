import React from 'react';

const PostHeader = () => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <a href="/profile">
            <img
              src="/api/placeholder/48/48"
              alt="Author"
              className="w-12 h-12 rounded-full hover:opacity-90"
            />
          </a>
          <div>
            <a href="/profile" className="font-semibold text-gray-800 hover:underline">
             Hassan Mahmud
            </a>
            <p className="text-sm text-gray-500">2 hours ago · Public</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="ri-more-2-fill text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default PostHeader;