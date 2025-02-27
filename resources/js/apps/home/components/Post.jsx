import React from 'react';

const Post = () => {
  const post = {
    author: { name: 'Sarah Johnson', image: '../images/myimg.jpg' },
    time: '2 hours ago · Public',
    content:
      'Exciting news! Our campus project "Green Initiative" has been selected for the national competition. Thanks to everyone who contributed to making our campus more environmentally friendly! 🌱',
    image: '../images/ola.jpg',
    reactions: 234,
    comments: 42,
    shares: 18,
  };

  return (
    <div className="bg-gray-50 antialiased">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <a href="/profile">
                  <img
                    src={post.author.image}
                    alt="Author"
                    className="w-12 h-12 rounded-full hover:opacity-90"
                  />
                </a>
                <div>
                  <a href="/profile" className="font-semibold text-gray-800 hover:underline">
                    {post.author.name}
                  </a>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="ri-more-2-fill text-xl"></i>
              </button>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-700 mb-4">{post.content}</p>
            <img
              src={post.image}
              alt="Post Image"
              className="w-full rounded-lg mb-4"
            />

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <i className="ri-thumb-up-fill text-blue-500"></i>
                  <i className="ri-heart-fill text-red-500 -ml-1"></i>
                  <span className="ml-2">{post.reactions} reactions</span>
                </span>
              </div>
              <div className="flex space-x-4">
                <span>{post.comments} Comments</span>
                <span>{post.shares} Shares</span>
              </div>
            </div>

            <div className="flex justify-between border-t border-b py-2">
              <button className="flex items-center justify-center w-1/3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <i className="ri-thumb-up-line mr-2"></i> Like
              </button>
              <button className="flex items-center justify-center w-1/3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <i className="ri-chat-1-line mr-2"></i> Comment
              </button>
              <button className="flex items-center justify-center w-1/3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <i className="ri-share-line mr-2"></i> Share
              </button>
            </div>


            <div className="mt-4 space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src="/images/myimg.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-3">
                  <img
                    src="/images/myimg.jpg"
                    alt="Commenter"
                    className="w-8 h-8 rounded-full"
                  />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;