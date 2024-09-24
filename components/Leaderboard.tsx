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
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {topUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.kill_count} kills
          </li>
        ))}
      </ol>
    </div>
  );
}