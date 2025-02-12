import React from 'react';
import CreatePostForm from '../components/CreatePostForm';

const CreatePost = () => {
  const handleSubmit = (data) => {
    console.log('Post Data:', data);
    alert('Post created successfully!');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Post</h1>
        <CreatePostForm onSubmit={handleSubmit} />
      </div>
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-center items-center text-white">
    
        

    <h2 className="text-3xl font-bold mb-4 text-center p-10">Reach a Wider Audience</h2>
    <p className="text-lg text-center">
       <strong> Create a new post.</strong>
    </p>

   
  </div>
    </div>
  );
};

export default CreatePost;