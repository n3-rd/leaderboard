import { NextRequest, NextResponse } from 'next/server';
import users from '../../../data/users.json';
let userData = [...users];

export async function GET() {
  return NextResponse.json(userData);
}

export async function POST(request: NextRequest) {
  const { id, kill_count } = await request.json();
  const user = userData.find(user => user.id === id);
  if (user) {
    user.kill_count = kill_count;
    return NextResponse.json({ message: 'User stat updated' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, OPTIONS'
    }
  });
}