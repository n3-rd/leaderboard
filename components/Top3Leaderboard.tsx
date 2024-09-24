import React from 'react';

interface LeaderboardItemProps {
  rank: number;
  name: string;
  points: number;
  prize: number;
}

const LeaderboardItem = ({ rank, name, points, prize }: LeaderboardItemProps) => {
  const height = rank === 1 ? 'h-48' : rank === 2 ? 'h-40' : 'h-36';
  const color = rank === 1 ? 'bg-yellow-100' : rank === 2 ? 'bg-gray-100' : 'bg-orange-100';

  return (
    <div className={`flex flex-col items-center text-gray-900 ${rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}>
      <div className={`w-16 h-16 rounded-full bg-gray-300 mb-2`}></div>
      <div className={`${height} ${color} rounded-t-2xl flex flex-col justify-end items-center text-sm p-2 bg-white/39`}>
        <p className="font-bold">{rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}</p>
        <p>{points} PTS · ${prize}</p>
      </div>
      <p className="mt-2 text-sm font-semibold">{name}</p>
    </div>
  );
};

interface Top3LeaderboardProps {
  users: { name: string; kill_count: number; prize: number }[];
}

const Top3Leaderboard = ({ users }: Top3LeaderboardProps) => {
  return (
    <div className="flex justify-center items-end gap-4 p-4">
      {users.map((user, index) => (
        <LeaderboardItem
          key={user.name}
          rank={index + 1}
          name={user.name}
          points={user.kill_count}
          prize={user.prize}
        />
      ))}
    </div>
  );
};

export default Top3Leaderboard;
