import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';

async function getDb() {
  const client = await clientPromise;
  return client.db();
}

async function getUserId() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return null;
  }
  return new ObjectId(session.user.id);
}

export async function GET(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const userAnime = await db.collection('user_anime').find({ userId }).toArray();
    const userManga = await db.collection('user_manga').find({ userId }).toArray();

    const animeWatching = userAnime.filter((d) => d.status === 'watching').length;
    const animeCompleted = userAnime.filter((d) => d.status === 'completed').length;
    const animePlanToWatch = userAnime.filter((d) => d.status === 'plan_to_watch').length;

    const mangaReading = userManga.filter((d) => d.status === 'reading').length;
    const mangaCompleted = userManga.filter((d) => d.status === 'completed').length;
    const mangaPlanToRead = userManga.filter((d) => d.status === 'plan_to_read').length;

    // Mocking other stats for now
    const userStats = {
      animeWatching,
      animeCompleted,
      animePlanToWatch,
      mangaReading,
      mangaCompleted,
      mangaPlanToRead,
      totalEpisodesWatched: 2847,
      totalChaptersRead: 1523,
      daysWatched: 42.3,
      averageScore: 8.2,
    };

    return NextResponse.json(userStats);
  } catch (error) {
    console.error('Error al obtener estadísticas del usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
