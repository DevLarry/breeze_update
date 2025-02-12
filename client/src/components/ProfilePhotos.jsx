import React from 'react';

const ProfilePhotos = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img src="../images/ola.jpg" alt="Photo 1" className="rounded-xl w-full h-40 object-cover" />
        <img src="../images/myimg.jpg" alt="Photo 2" className="rounded-xl w-full h-40 object-cover" />
        <img src="../images/ola.jpg" alt="Photo 3" className="rounded-xl w-full h-40 object-cover" />
        <img src="../images/sunset.jpg" alt="Photo 3" className="rounded-xl w-full h-40 object-cover" />
      </div>
    </div>
  );
};

export default ProfilePhotos;