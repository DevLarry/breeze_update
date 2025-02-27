import React from 'react';

const PostContent = () => {
  return (
    <div className="p-4">
      <p className="text-gray-700 mb-4">
        Exciting news! Our campus project "Green Initiative" has been selected for the national
        competition. Thanks to everyone who contributed to making our campus more environmentally
        friendly! 🌱
      </p>
      <img
        src="/api/placeholder/600/400"
        alt="Post Image"
        className="w-full rounded-lg mb-4"
      />
    </div>
  );
};

export default PostContent;