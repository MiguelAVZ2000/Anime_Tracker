import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10); // 10 es el número de rondas de sal

    const newUser = {
      email,
      password: hashedPassword,
      username,
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    if (result.acknowledged) {
      return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
    } else {
      throw new Error('Error al insertar el usuario');
    }

  } catch (error: any) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ message: 'Error interno del servidor', error: error.message }, { status: 500 });
  }
}