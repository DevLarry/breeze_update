import React, { useState } from 'react';

const TaggingInput = ({ onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
      onTagsChange([...tags, inputValue.trim()]);
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Tag Groups or Users</label>
      <div className="flex flex-wrap items-center border border-gray-300 rounded-lg p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter to tag"
          className="flex-1 px-2 py-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TaggingInput;