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
    const currentlyReading = await db.collection('user_manga').aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'manga',
          localField: 'mangaId',
          foreignField: '_id',
          as: 'manga',
        },
      },
      { $unwind: '$manga' },
      { $match: { status: 'reading' } }, // Filtrar por status después del unwind
      {
        $project: {
          id: '$manga._id',
          title: '$manga.title',
          image: '$manga.image',
          progress: '$progress',
          total: '$manga.total_chapters',
          rating: '$rating',
          type: 'manga',
        },
      },
    ]).toArray();

    return NextResponse.json(currentlyReading);
  } catch (error) {
    console.error('Error al obtener manga leyendo actualmente:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
