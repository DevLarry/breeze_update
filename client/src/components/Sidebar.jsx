import React from 'react';
import QuickActions from './QuickActions';
import Notifications from './Notifications';

const Sidebar = () => {
  return (
    <div className="lg:col-span-1">
      <QuickActions />
      <Notifications />
    </div>
  );
};

export default Sidebar;