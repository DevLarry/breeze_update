import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Publicize = () => {
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [amount, setAmount] = useState(10); // Default fixed amount
  const [postType, setPostType] = useState('existing'); // 'existing' or 'new'

  // Mock data for posts and tags
  const postsData = {
    posts: [
      { id: 1, title: 'Exciting News: Campus Project Selected!' },
      { id: 2, title: 'Check Out This Amazing Sunset!' },
      { id: 3, title: 'New Course Registration Open' },
    ],
  };

  const tagsData = {
    tags: [
      { id: 1, name: 'Computer Science Society' },
      { id: 2, name: 'Environmental Club' },
      { id: 3, name: 'Sports Society' },
      { id: 4, name: 'Art and Culture Club' },
    ],
  };

  const handlePublize = () => {
    if ((postType === 'existing' && !selectedPostId) || selectedTags.length === 0 || amount <= 0) {
      alert('Please fill in all required fields.');
      return;
    }

    // Mock API call (replace with actual backend integration later)
    console.log('Publizing post with:', {
      postType,
      postId: selectedPostId,
      tags: selectedTags,
      amount,
    });

    alert('Post successfully promoted! (Mock)');
    navigate('/dashboard');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex">
      <div className="w-full lg:w-1/2 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Publize Your Post</h1>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Do you want to promote an existing post or create a new one?
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setPostType('existing')}
              className={`px-6 py-2 rounded-lg transition ${
                postType === 'existing'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Existing Post
            </button>
            <button
              onClick={() => setPostType('new')}
              className={`px-6 py-2 rounded-lg transition ${
                postType === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              New Post
            </button>
          </div>
        </div>

        {/* Step 2: Select Post (for existing posts) */}
        {postType === 'existing' && (
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">Select a Post</label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a post</option>
              {postsData.posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Target Groups</label>
          <div className="space-y-2">
            {tagsData.tags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag.id)
                        ? prev.filter((id) => id !== tag.id)
                        : [...prev, tag.id]
                    )
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={`tag-${tag.id}`} className="text-gray-700">
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>

       
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Amount to pay</label>
          <div className="flex space-x-4">
            {[1500].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`px-6 py-2 rounded-lg transition ${
                  amount === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                #{value}
              </button>
            ))}
          </div>
        </div>

      
        <button
          onClick={handlePublize}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Confirm and Publize
        </button>
      </div>

   <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-center items-center text-white">
    
        

        <h2 className="text-3xl font-bold mb-4 text-center p-10">Reach a Wider Audience</h2>
        <p className="text-lg text-center">
          Promote your post to specific groups and societies on Campus Connect. Boost engagement and
          visibility with our premium Publize feature!
        </p>

       
      </div>
    </div>
  );
};

export default Publicize;