import { NextResponse } from 'next/server';
import { searchManga } from '@/lib/jikanApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro de búsqueda (q)' }, { status: 400 });
  }

  try {
    const jikanResponse = await searchManga(query, page ? parseInt(page) : 1);

    const mappedData = jikanResponse.data.map((item: any) => ({
      mal_id: item.mal_id,
      title: item.title_english || item.title || item.title_japanese,
      images: { jpg: { large_image_url: item.images?.jpg?.large_image_url || item.images?.webp?.large_image_url } },
      chapters: item.chapters,
      score: item.score,
      type: item.type,
    }));

    const pagination = {
      last_visible_page: jikanResponse.pagination.last_visible_page,
      has_next_page: jikanResponse.pagination.has_next_page,
      current_page: jikanResponse.pagination.current_page,
    };

    return NextResponse.json({ data: mappedData, pagination: pagination });
  } catch (error: any) {
    console.error('Error al buscar manga:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
