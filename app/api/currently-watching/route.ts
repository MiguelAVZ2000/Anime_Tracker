
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/dbConnect';
import AnimeEntry from '@/models/AnimeEntry';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const currentlyWatching = await AnimeEntry.find({
      userId: session.user.id,
      status: 'Watching',
    });

    return NextResponse.json(currentlyWatching);
  } catch (error) {
    console.error('Error fetching currently watching list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
