const JIKAN_API_URL = "https://api.jikan.moe/v4";

async function fetchJikan(endpoint: string) {
  const response = await fetch(`${JIKAN_API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error en Jikan API: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function getSeasonNow() {
  return fetchJikan("/seasons/now");
}

export async function getSeasonUpcoming() {
  return fetchJikan("/seasons/upcoming");
}

export async function getTopAnime() {
  return fetchJikan("/top/anime");
}

export async function getAnimeById(id: number) {
  const response = await fetchJikan(`/anime/${id}`);
  return response.data;
}

export async function getTopManga() {
  return fetchJikan("/top/manga");
}

export async function searchAnime(query: string, page: number, limit: number) {
  return fetchJikan(`/anime?q=${query}&page=${page}&limit=${limit}`);
}

export async function searchManga(query: string, page: number, limit: number) {
  return fetchJikan(`/manga?q=${query}&page=${page}&limit=${limit}`);
}

export async function getMangaById(id: number) {
  const response = await fetchJikan(`/manga/${id}`);
  return response.data;
}
