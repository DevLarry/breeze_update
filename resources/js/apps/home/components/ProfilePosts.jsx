import React from 'react';
import Post from './Post';

const ProfilePosts = () => {
  const posts = [
    {
      author: { name: 'Hassan Mahmud', image: '/images/myimg.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      image: '../images/ola.jpg',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
    {
      author: { name: 'Hassan Mahmud', image: '/images/ola.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      image: '../images/sunset.jpg',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
    {
      author: { name: 'Hassan Mahmud', image: '/images/sunset.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      image: '../images/myimg.jpg',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
    {
      author: { name: 'Hassan Mahmud', image: '/images/myimg.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      image: '../images/ola.jpg',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
    {
      author: { name: 'Hassan Mahmud', image: '/images/sunset.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      image: '../images/sunset.jpg',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
  ];

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default ProfilePosts;