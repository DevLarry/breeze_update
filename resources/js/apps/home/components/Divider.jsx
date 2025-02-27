import React from 'react';

const Divider = () => {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow border-t"></div>
      <span className="mx-4 text-gray-500">or</span>
      <div className="flex-grow border-t"></div>
    </div>
  );
};

export default Divider;