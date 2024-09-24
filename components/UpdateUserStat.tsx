"use client";

import { useState } from 'react';

export default function UpdateUserStat() {
  const [userId, setUserId] = useState<number>(0);
  const [killCount, setKillCount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, kill_count: killCount }),
    });
    if (response.ok) {
      alert('User stat updated');
    } else {
      alert('Failed to update user stat');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Kill Count:</label>
        <input
          type="number"
          value={killCount}
          onChange={(e) => setKillCount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Update Stat
      </button>
    </form>
  );
}