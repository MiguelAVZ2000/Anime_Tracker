export const JIKAN_API_BASE_URL = "https://api.jikan.moe/v4";

async function fetchJikan(endpoint: string) {
  const response = await fetch(`${JIKAN_API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    // Jikan a veces responde con 429 (Too Many Requests).
    // Podríamos implementar un reintento simple aquí.
    if (response.status === 429) {
      await new Promise(res => setTimeout(res, 1000)); // Esperar 1 segundo
      const retryResponse = await fetch(`${JIKAN_API_BASE_URL}${endpoint}`);
      if (!retryResponse.ok) {
        throw new Error(`Error en Jikan API después de reintento: ${retryResponse.statusText}`);
      }
      const retryData = await retryResponse.json();
      return retryData;
    }
    throw new Error(`Error en Jikan API: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function searchAnime(query: string, page: number = 1, limit: number = 12) {
  return fetchJikan(`/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
}

export async function getAnimeById(id: number) {
  const result = await fetchJikan(`/anime/${id}/full`);
  if (!result || !result.data) {
    throw new Error(`No se encontraron datos para el anime con ID: ${id}`);
  }
  return result.data;
}

export async function getTopAnime(page: number = 1, limit: number = 12) {
  return fetchJikan(`/top/anime?page=${page}&limit=${limit}`);
}

export async function getSeasonNow(page: number = 1, limit: number = 12) {
  return fetchJikan(`/seasons/now?page=${page}&limit=${limit}`);
}

export async function searchManga(query: string, page: number = 1, limit: number = 12) {
  return fetchJikan(`/manga?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
}

export async function getMangaById(id: number) {
  const result = await fetchJikan(`/manga/${id}/full`);
  if (!result || !result.data) {
    throw new Error(`No se encontraron datos para el manga con ID: ${id}`);
  }
  return result.data;
}

export async function getTopManga(page: number = 1, limit: number = 12) {
  return fetchJikan(`/top/manga?page=${page}&limit=${limit}`);
}

export async function getSeasonUpcoming(page: number = 1, limit: number = 12) {
  return fetchJikan(`/seasons/upcoming?page=${page}&limit=${limit}`);
}