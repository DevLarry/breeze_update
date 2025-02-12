import React from 'react';
import { RiImageLine, RiEmotionLine } from '@remixicon/react';

const PostForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex space-x-4">
        <img src="/images/myimg.jpg" alt="User" className="w-12 h-12 rounded-xl" />
        <input
          type="text"
          placeholder="Share your thoughts..."
          className="flex-1 bg-gray-100 rounded-xl px-6 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mt-6 flex items-center justify-between pt-4 border-t">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100">
            <RiImageLine className="text-indigo-600" />
            <span className="text-gray-700">Media</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100">
            <RiEmotionLine className="text-blue-600" />
            <span className="text-gray-700">Feeling</span>
          </button>
        </div>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
          Share Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;