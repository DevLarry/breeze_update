import React from 'react';

const AboutContent = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="space-y-6">
        <p className="text-gray-600">
          Campus Connect is a platform designed to bring students, faculty, and staff together. Our
          mission is to create a vibrant community where everyone can share ideas, collaborate, and
          stay connected.
        </p>
        <p className="text-gray-600">
          Founded in 2025, Campus Connect has grown to become the go-to platform for campus updates,
          events, and discussions. We are committed to providing a safe and inclusive space for all
          members.
        </p>
      </div>
    </div>
  );
};

export default AboutContent;