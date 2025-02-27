import React, { useState } from 'react';

const PublizeForm = () => {
  const [selectedGroups, setSelectedGroups] = useState([]);

  const groups = [
    { id: 1, name: 'Computer Science Society' },
    { id: 2, name: 'Environmental Club' },
    { id: 3, name: 'Sports Society' },
    { id: 4, name: 'Art and Culture Club' },
  ];

  const handleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Publize Your Post</h2>
      <p className="text-gray-600 mb-6">
        Select the groups or societies you want to promote your post to. This is a premium feature.
      </p>

      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <input
              type="checkbox"
              id={`group-${group.id}`}
              checked={selectedGroups.includes(group.id)}
              onChange={() => handleGroupSelection(group.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={`group-${group.id}`} className="text-gray-700">
              {group.name}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert('Proceed to payment')}
        className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default PublizeForm;