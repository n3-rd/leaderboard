import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../data/users.json';

const userData = [...users];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'POST') {
    const { id, kill_count } = req.body;
    const user = userData.find(user => user.id === id);
    if (user) {
      user.kill_count = kill_count;
      res.status(200).json({ message: 'User stat updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}