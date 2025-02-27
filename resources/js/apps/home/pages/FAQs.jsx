import React, { useState } from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: 'How do I create a post?',
      answer: 'To create a post, click on the "Create Post" button on the homepage. You can add text, images, or videos to your post.',
    },
    {
      question: 'How do I edit my profile?',
      answer: 'Go to your profile page and click on the "Edit Profile" button. You can update your information, profile picture, and bio.',
    },
    {
      question: 'How do I contact support?',
      answer: 'Visit the <a href="/contact" class="text-blue-600 hover:underline">Contact Us</a> page to send us a message.',
    },
    {
      question: 'What is Publize, and is it premium?',
      answer: 'Publize is a feature that allows you to promote your posts to a wider audience. It is a <strong>premium feature</strong> available to those who pay for it.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click on "Forgot Password." Enter your email address, and we\'ll send you a link to reset your password.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'Visit your profile settings and click on "Delete Account." Follow the prompts to permanently delete your account.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-900 hover:text-blue-600 transition"
                >
                  <span>{faq.question}</span>
                  <i
                    className={`ri-arrow-down-s-line text-xl transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                <div
                  className={`faq-answer mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;