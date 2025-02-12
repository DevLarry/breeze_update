import React from 'react';
import AboutContent from '../components/AboutContent';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AboutContent />
      </div>
    </div>
  );
};

export default About;