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
  // No se requiere autenticación para próximos estrenos si son públicos
  // Si se requiere, descomentar las siguientes líneas:
  // const userId = await getUserId();
  // if (!userId) {
  //   return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  // }

  try {
    const db = await getDb();
    const upcomingReleases = await db.collection('releases').find().sort({ release_date: 1 }).limit(3).toArray();

    return NextResponse.json(upcomingReleases);
  } catch (error) {
    console.error('Error al obtener próximos estrenos:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
