import React from 'react';

const CommentInput = () => {
  return (
    <div className="flex items-start space-x-3">
      <img src="/api/placeholder/40/40" alt="User" className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CommentInput;