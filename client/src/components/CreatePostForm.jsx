import React, { useState } from 'react';
import MediaUpload from './MediaUpload';
import EmojiPicker from './EmojiPickers';
import TaggingInput from './TaggingInput';

const CreatePostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content, files, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Post Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <div className="mt-2 flex justify-end">
          <EmojiPicker onSelectEmoji={(emoji) => setContent(content + emoji)} />
        </div>
      </div>

      <MediaUpload onFilesChange={setFiles} />
      <TaggingInput onTagsChange={setTags} />

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;