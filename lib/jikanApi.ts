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
