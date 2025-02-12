import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfilePhotos from '../components/ProfilePhotos';
import ProfileFriends from '../components/ProfileFriends';
import ProfilePosts from '../components/ProfilePosts';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('posts');

  const showSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileHeader showSection={showSection} />
        {activeSection === 'about' && <ProfileAbout />}
        {activeSection === 'photos' && <ProfilePhotos />}
        {activeSection === 'friends' && <ProfileFriends />}
        {activeSection === 'posts' && <ProfilePosts />}
      </div>
    </div>
  );
};

export default Profile;