import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import AnimeEntry from "@/models/AnimeEntry";
import MangaEntry from "@/models/MangaEntry";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = params;
    const { status, score, mediaType } = await request.json();
    const userId = session.user.id;

    if (!mediaType || (mediaType !== 'anime' && mediaType !== 'manga')) {
      return NextResponse.json({ message: "El tipo de medio (mediaType) es inválido." }, { status: 400 });
    }

    const Model = mediaType === 'anime' ? AnimeEntry : MangaEntry;

    const updatedEntry = await Model.findOneAndUpdate(
      { _id: id, userId },
      { $set: { status, score } },
      { new: true }
    );

    if (!updatedEntry) {
      return NextResponse.json({ message: "Entrada no encontrada o no te pertenece." }, { status: 404 });
    }

    return NextResponse.json({ message: "Entrada actualizada.", entry: updatedEntry }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la entrada:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}