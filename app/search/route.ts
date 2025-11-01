import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import AnimeEntry from "@/models/AnimeEntry";
import MangaEntry from "@/models/MangaEntry";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  await dbConnect();

  try {
    const userId = session.user.id;

    const animeList = await AnimeEntry.find({ userId }).sort({ updatedAt: -1 });
    const mangaList = await MangaEntry.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json({ animeList, mangaList });
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}