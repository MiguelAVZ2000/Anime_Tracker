
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/dbConnect';
import MangaEntry from '@/models/MangaEntry';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const currentlyReading = await MangaEntry.find({
      userId: session.user.id,
      status: 'Reading',
    });

    return NextResponse.json(currentlyReading);
  } catch (error) {
    console.error('Error fetching currently reading list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
