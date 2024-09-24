'use client'
import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp, ArrowDown, Minus, Pencil } from 'lucide-react';
import UpdateUserPopup from './UpdateUserPopup';
import Top3Leaderboard from './Top3Leaderboard';

interface User {
  id: number;
  name: string;
  kill_count: number;
  prize?: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'full' | 'top3'>('full');
  const previousUsersRef = useRef<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        previousUsersRef.current = data;
      });
  }, []);

  const topUsers = [...users].sort((a, b) => b.kill_count - a.kill_count);
  const top3Users = topUsers.slice(0, 3).map((user, index) => ({
    ...user,
    prize: index === 0 ? 100 : index === 1 ? 60 : 40,
  }));

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
      previousUsersRef.current = prevUsers;
      return updatedUsers.sort((a, b) => b.kill_count - a.kill_count);
    });
    setSelectedUser(null);
  };

  const getArrow = (user: User) => {
    const previousUser = previousUsersRef.current.find(u => u.id === user.id);
    if (previousUser) {
      if (user.kill_count > previousUser.kill_count) {
        return <ArrowUp className="text-green-500 mr-1" size={16} />;
      } else if (user.kill_count < previousUser.kill_count) {
        return <ArrowDown className="text-red-500 mr-1" size={16} />;
      } else {
        return <Minus className="text-gray-500 mr-1" size={16} />;
      }
    }
    return <Minus className="text-gray-500 mr-1" size={16} />;
  };

  const renderUsers = (usersToRender: User[]) => (
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
        {usersToRender.map((user, index) => (
          <tr key={user.id} className="border-t border-gray-200">
            <td className="py-4">
              <div className="flex items-center">
                {getArrow(user)}
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
               <Pencil />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('full')}
          className={`px-4 py-2 ${activeTab === 'full' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md`}
        >
          Full Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('top3')}
          className={`px-4 py-2 ${activeTab === 'top3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md`}
        >
          Top 3
        </button>
      </div>
      {activeTab === 'full' ? renderUsers(topUsers) : <Top3Leaderboard users={top3Users} />}
      {selectedUser && (
        <UpdateUserPopup user={selectedUser} onClose={handleClosePopup} onUpdate={handleUserUpdate} />
      )}
    </div>
  );
};

export default Leaderboard;