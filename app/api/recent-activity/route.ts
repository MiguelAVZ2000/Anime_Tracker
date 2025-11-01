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
    const recentActivity = await db.collection('activity').find({ userId }).sort({ createdAt: -1 }).limit(5).toArray();

    return NextResponse.json(recentActivity);
  } catch (error) {
    console.error('Error al obtener actividad reciente:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
