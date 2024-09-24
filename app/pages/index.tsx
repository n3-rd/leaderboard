import Leaderboard from '../../components/Leaderboard';
import UpdateUserStat from '../../components/UpdateUserStat';

export default function Home() {
  return (
    <div>
      <h1>Leaderboard App</h1>
      <UpdateUserStat />
      <Leaderboard />
    </div>
  );
}