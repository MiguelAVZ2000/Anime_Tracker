
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/dbConnect';
import AnimeEntry from '@/models/AnimeEntry';
import { getSeasonUpcoming } from '@/lib/jikanApi';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const planToWatch = await AnimeEntry.find({
      userId: session.user.id,
      status: 'Plan to Watch',
    });

    const upcomingSeason = await getSeasonUpcoming();
    const upcomingAnimeIds = upcomingSeason.data.map((anime: any) => anime.mal_id);

    const upcomingReleases = planToWatch.filter(entry => upcomingAnimeIds.includes(entry.mediaId));

    return NextResponse.json(upcomingReleases);
  } catch (error) {
    console.error('Error fetching upcoming releases:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
