import React from 'react';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
          <ContactForm />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default Contact;