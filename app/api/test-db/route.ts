
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({ message: "Successfully connected to MongoDB!" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to connect to MongoDB.", error: error.message }, { status: 500 });
  }
}
