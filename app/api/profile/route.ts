
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import AnimeEntry from '@/models/AnimeEntry';
import MangaEntry from '@/models/MangaEntry';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const user = await User.findById(session.user.id).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const animeList = await AnimeEntry.find({ userId: session.user.id });
    const mangaList = await MangaEntry.find({ userId: session.user.id });

    return NextResponse.json({
      user,
      animeList,
      mangaList,
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
