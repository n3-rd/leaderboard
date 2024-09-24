'use client'
import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import UpdateUserPopup from './UpdateUserPopup';

interface User {
  id: number;
  name: string;
  kill_count: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const topUsers = [...users].sort((a, b) => b.kill_count - a.kill_count);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      return updatedUsers.sort((a, b) => b.kill_count - a.kill_count);
    });
    setSelectedUser(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2">Place</th>
            <th>Name</th>
            <th className="text-right">Points</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, index) => (
            <tr key={user.id} className="border-t border-gray-200">
              <td className="py-4">
                <div className="flex items-center">
                  {index === 0 && <ArrowUp className="text-green-500 mr-1" size={16} />}
                  {index === 1 && <ArrowDown className="text-red-500 mr-1" size={16} />}
                  <span className={`font-semibold ${index === 0 ? 'text-blue-600' : 'text-gray-900'}`}>
                    {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="text-right">
                <span className="font-semibold text-gray-900">{user.kill_count} PTS</span>
              </td>
              <td className="text-right">
                <button
                  onClick={() => handleUpdateClick(user)}
                  className="ml-4 bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UpdateUserPopup user={selectedUser} onClose={handleClosePopup} onUpdate={handleUserUpdate} />
      )}
    </div>
  );
};

export default Leaderboard;