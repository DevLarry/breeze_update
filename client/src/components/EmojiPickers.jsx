import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickers = ({ onSelectEmoji }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        😊
      </button>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              onSelectEmoji(emojiObject.emoji);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickers;