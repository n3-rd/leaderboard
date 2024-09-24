"use client"; // Add this line

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  kill_count: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const topUsers = [...users].sort((a, b) => b.kill_count - a.kill_count).slice(0, 30);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Leaderboard</h1>
      <ol className="list-decimal list-inside">
        {topUsers.map(user => (
          <li key={user.id} className="mb-2 text-gray-700 dark:text-gray-300">
            {user.name} - {user.kill_count} kills
          </li>
        ))}
      </ol>
    </div>
  );
}