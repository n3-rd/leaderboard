import Leaderboard from '../components/Leaderboard';
import UpdateUserStat from '../components/UpdateUserStat';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-white">
    <div><Toaster/></div>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Leaderboard App</h1>
      {/* <UpdateUserStat /> */}
      <Leaderboard />
    </div>
  );
}
