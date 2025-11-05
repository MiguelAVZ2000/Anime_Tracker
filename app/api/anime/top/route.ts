import { NextResponse } from 'next/server';
import { getTopAnime } from '@/lib/jikanApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  try {
    const jikanResponse = await getTopAnime(page ? parseInt(page) : 1);

    const mappedData = jikanResponse.data.map((item: any) => ({
      mal_id: item.mal_id,
      title: item.title_english || item.title || item.title_japanese,
      images: { jpg: { large_image_url: item.images?.jpg?.large_image_url || item.images?.webp?.large_image_url } },
      episodes: item.episodes,
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
    console.error('Error al obtener top anime:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
