import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface User {
  id: number;
  kill_count: number;

}

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { id, kill_count } = await request.json();
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);
  
  const user = users.find((user: User) => user.id === id);
  if (user) {
    user.kill_count = kill_count;
    // Note: We're not writing the changes back to the file
    return NextResponse.json({ message: 'User stat updated' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}