import { searchManga } from "@/lib/jikanApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({ error: "El parámetro 'q' es requerido" }, { status: 400 });
  }

  try {
    const results = await searchManga(query, parseInt(page));
    return NextResponse.json(results); // Devuelve el objeto completo { data, pagination }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}