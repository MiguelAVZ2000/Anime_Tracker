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
    const currentlyWatching = await db.collection('user_anime').aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'anime',
          localField: 'animeId',
          foreignField: '_id',
          as: 'anime',
        },
      },
      { $unwind: '$anime' },
      { $match: { status: 'watching' } }, // Filtrar por status después del unwind
      {
        $project: {
          id: '$anime._id',
          title: '$anime.title',
          image: '$anime.image',
          progress: '$progress',
          total: '$anime.total_episodes',
          rating: '$rating',
          type: 'anime',
        },
      },
    ]).toArray();

    return NextResponse.json(currentlyWatching);
  } catch (error) {
    console.error('Error al obtener anime viendo actualmente:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
