import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <button
        onClick={toggleFAQ}
        className="w-full flex justify-between items-center bg-white text-left text-xl font-semibold text-gray-900 hover:text-indigo-600 transition"
      >
        <span>{question}</span>
        <i className={`ri-arrow-down-s-line text-xl transform transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div
        className={`faq-answer mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-0'}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQItem;