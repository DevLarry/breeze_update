import React from 'react';

const CommentItem = () => {
  return (
    <div className="flex space-x-3">
      <img src="/api/placeholder/32/32" alt="Commenter" className="w-8 h-8 rounded-full" />
      <div>
        <div className="bg-gray-100 rounded-2xl px-4 py-2">
          <h4 className="font-semibold text-sm">John Doe</h4>
          <p className="text-gray-700">Congratulations! This is amazing news! 🎉</p>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
          <button className="hover:text-gray-700">Like</button>
          <button className="hover:text-gray-700">Reply</button>
          <span>5m ago</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;