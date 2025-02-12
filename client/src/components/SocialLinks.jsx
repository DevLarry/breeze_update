import React from 'react';

const SocialLinks = () => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Connect with Us</h3>
      <div className="flex space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          <i className="ri-facebook-fill text-2xl"></i>
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700"
        >
          <i className="ri-whatsapp-fill text-2xl"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500"
        >
          <i className="ri-twitter-fill text-2xl"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;