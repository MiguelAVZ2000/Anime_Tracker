import { NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import { searchAnime } from '@/lib/anilistApi';
import { translateText } from '@/lib/translationService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page');
  const perPage = 12; // AniList uses perPage instead of limit

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro de búsqueda (q)' }, { status: 400 });
  }

  console.log(`Buscando anime con query: ${query}, página: ${page}`);

  try {
    const anilistResponse = await searchAnime(query, page ? parseInt(page) : 1, perPage);
    console.log('Respuesta cruda de AniList API (anime search):', anilistResponse);

    const mappedData = await Promise.all(anilistResponse.Page.media.map(async (item: any) => {
      const translatedTitle = await translateText(item.title.english || item.title.romaji || item.title.native);
      const translatedDescription = await translateText(item.description || '');

      return {
        id: item.id,
        title: translatedTitle,
        images: { jpg: { large_image_url: item.coverImage.large } },
        episodes: item.episodes,
        score: item.averageScore,
        type: item.type,
        description: translatedDescription,
      };
    }));

    const pagination = {
      last_visible_page: anilistResponse.Page.pageInfo.lastPage,
      has_next_page: anilistResponse.Page.pageInfo.hasNextPage,
      current_page: anilistResponse.Page.pageInfo.currentPage,
    };

    console.log('Datos mapeados (anime search):', mappedData);

    return NextResponse.json({ data: mappedData, pagination: pagination });
  } catch (error: any) {

