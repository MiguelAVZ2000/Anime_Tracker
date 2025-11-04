
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

    const animeList = await AnimeEntry.find({ userId: session.user.id });
    const mangaList = await MangaEntry.find({ userId: session.user.id });

    const totalAnime = animeList.length;
    const totalManga = mangaList.length;

    const animeScores = animeList.map(entry => entry.rating).filter(rating => rating !== null && rating !== undefined) as number[];
    const mangaScores = mangaList.map(entry => entry.rating).filter(rating => rating !== null && rating !== undefined) as number[];

    const meanAnimeScore = animeScores.length > 0 ? animeScores.reduce((a, b) => a + b, 0) / animeScores.length : 0;
    const meanMangaScore = mangaScores.length > 0 ? mangaScores.reduce((a, b) => a + b, 0) / mangaScores.length : 0;

    const episodesWatched = animeList.reduce((acc, entry) => acc + entry.progress, 0);
    const timeSpentWatching = episodesWatched * 24; // Assuming 24 minutes per episode

    const chaptersRead = mangaList.reduce((acc, entry) => acc + entry.progress, 0);

    return NextResponse.json({
      totalAnime,
      totalManga,
      meanAnimeScore,
      meanMangaScore,
      timeSpentWatching,
      chaptersRead,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
