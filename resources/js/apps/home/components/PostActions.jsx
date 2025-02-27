import React from 'react';

const PostActions = () => {
  return (
    <div className="flex justify-between border-t border-b py-2">
      <button className="flex items-center justify-center w-1/3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <i className="ri-thumb-up-line mr-2"></i> Like
      </button>
      <button className="flex items-center justify-center w-1/3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <i className="ri-chat-1-line mr-2"></i> Comment
      </button>
      <button className="flex items-center justify-center w-1/3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <i className="ri-share-line mr-2"></i> Share
      </button>
    </div>
  );
};

export default PostActions;