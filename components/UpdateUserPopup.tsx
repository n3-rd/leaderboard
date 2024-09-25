import { useState } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  kill_count: number;
  image: string;
}

interface UpdateUserPopupProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

export default function UpdateUserPopup({ user, onClose, onUpdate }: UpdateUserPopupProps) {
  const [killCount, setKillCount] = useState<number>(user.kill_count);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id, kill_count: killCount }),
    });
    if (response.ok) {
        toast.success('User stat updated');
      onUpdate({ ...user, kill_count: killCount });
    } else {
        toast.error('Failed to update user stat');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 ">Update Kill Count</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700  mb-2">Kill Count:</label>
            <input
              type="number"
              value={killCount}
              onChange={(e) => setKillCount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md text-black"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}