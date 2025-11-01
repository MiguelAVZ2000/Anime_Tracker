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
    const profile = await db.collection('users').findOne({ _id: userId });

    if (profile) {
      return NextResponse.json(profile);
    } else {
      return NextResponse.json({ message: 'Perfil no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const body = await request.json();
    const { _id, ...profileData } = body; // Asegurarse de que _id no se actualice

    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $set: profileData }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: 'Perfil actualizado exitosamente' });
    } else {
      return NextResponse.json({ message: 'Perfil no encontrado para actualizar' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
}
