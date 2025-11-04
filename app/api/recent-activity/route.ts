
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/dbConnect';
import AnimeEntry from '@/models/AnimeEntry';
import MangaEntry from '@/models/MangaEntry';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const recentAnime = await AnimeEntry.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .limit(10);

    const recentManga = await MangaEntry.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .limit(10);

    const recentActivity = [...recentAnime, ...recentManga].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );

    return NextResponse.json(recentActivity.slice(0, 10));
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
