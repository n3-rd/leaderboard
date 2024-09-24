import Leaderboard from '../components/Leaderboard';
import UpdateUserStat from '../components/UpdateUserStat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">Leaderboard App</h1>
      <UpdateUserStat />
      <Leaderboard />
    </div>
  );
}
