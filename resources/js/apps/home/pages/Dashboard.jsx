import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostForm from '../components/PostForm';
import Post from '../components/Post';

const Dashboard = () => {
  const posts = [
    {
      author: { name: 'Hassan Mahmud', image: '../images/myimg.jpg' },
      time: 'Yesterday at 3:45 PM · Public',
      content: 'Just finished my final presentation for Software Engineering! Thank you everyone for the support and feedback! 🎓💻',
      reactions: 156,
      comments: 28,
      shares: 12,
    },
    {
      author: { name: 'Jane Smith', image: '../images/myimg.jpg' },
      time: '5 hours ago · Public',
      content: 'Check out this amazing sunset from the campus rooftop! 🌅',
      image: 'https://th.bing.com/th/id/R.1e9f9cce215795a1e770989e0416fe53?rik=cPiemXkOWpO4FQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f6%2f6%2fe%2f795475-most-popular-cool-sunset-backgrounds-3840x2160-for-hd.jpg&ehk=OWMvCF2necpJyFhjSIuWEWQLFevbFT466Qnwb0L8Qog%3d&risl=&pid=ImgRaw&r=0',
      reactions: 10,
      comments: 15, 
      shares: 8,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Sidebar />
          <div className="lg:col-span-2 md:max-h-[100vh] md:overflow-y-scroll">
            <PostForm />
            <div className="space-y-8">
              {posts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;