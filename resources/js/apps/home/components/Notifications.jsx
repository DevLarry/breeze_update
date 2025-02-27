import React from 'react';
import { RiChatNewLine, RiCalendarTodoLine, RiBookOpenLine } from '@remixicon/react';

const Notifications = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <RiChatNewLine className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">New comment on your post</p>
            <p className="text-xs text-gray-400">2 hours ago</p>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <RiCalendarTodoLine className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Deadline for submission: March 12</p>
            <p className="text-xs text-gray-400">1 day ago</p>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
            <RiBookOpenLine className="text-pink-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Course registration is open</p>
            <p className="text-xs text-gray-400">3 days ago</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Notifications;