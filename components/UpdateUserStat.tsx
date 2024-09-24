"use client"; // Add this line

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Kill Count:</label>
        <input
          type="number"
          value={killCount}
          onChange={(e) => setKillCount(Number(e.target.value))}
        />
      </div>
      <button type="submit">Update Stat</button>
    </form>
  );
}