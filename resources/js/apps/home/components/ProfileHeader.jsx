import React from 'react';
import { RiEditLine, RiSettings4Line, RiMapPinLine, RiUserFollowLine, RiBriefcaseLine } from '@remixicon/react';

const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
   
      <div className="h-64 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

  
      <div className="relative px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-8">
          <div className="relative -mt-20 mb-4 md:mb-0">
            <img
              src="../images/myimg.jpg"
              alt="Profile Picture"
              className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hassan Mahmud .O</h1>
                <p className="text-indigo-600 font-medium">Computer Science Student | Class of 2026</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center">
                  <RiEditLine className="mr-2" />
                  Edit Profile
                </button>
                <button className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition shadow-md hover:shadow-lg">
                  <RiSettings4Line className="text-xl" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <RiMapPinLine className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">Bauchi State University, Gadau</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <RiUserFollowLine className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="font-medium text-gray-900">300</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <RiBriefcaseLine className="text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Work</p>
                  <p className="font-medium text-gray-900">Intern at DevLarry Tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="mt-8 flex space-x-1">
          <button onClick={() => showSection('posts')} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-100 text-white font-medium">
            Posts
          </button>
          <button onClick={() => showSection('photos')} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-100 font-medium">
            Photos
          </button>
          <button onClick={() => showSection('friends')} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-100 font-medium">
            Friends
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader;