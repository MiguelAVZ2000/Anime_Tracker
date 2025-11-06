import { NextResponse } from 'next/server';
import { searchManga } from '@/lib/jikanApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page');
  const perPage = 12;

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro de búsqueda (q)' }, { status: 400 });
  }

  try {
    const jikanResponse = await searchManga(query, page ? parseInt(page) : 1, perPage);
    return NextResponse.json({ data: jikanResponse.data, pagination: jikanResponse.pagination });
  } catch (error: any) {
    console.error('Error al buscar manga:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
