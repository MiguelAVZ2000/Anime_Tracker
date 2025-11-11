export const translations: { [key: string]: string } = {
  "Finished Airing": "Finalizado",
  "Currently Airing": "En emisión",
  "Not yet aired": "No emitido",
  "Finished": "Finalizado",
  "Publishing": "Publicándose",
  "On Hiatus": "En pausa",
  "Discontinued": "Descontinuado",
  "Not yet published": "No publicado",
  "Episodes": "Episodios",
  "Chapters": "Capítulos",
  "Popularity": "Popularidad",
  "Type": "Tipo",
  "Aired": "Emitido",
  "Studios": "Estudios",
  "Synopsis": "Sinopsis",
  "Trailer": "Tráiler",
  "TV": "TV",
  "Movie": "Película",
  "OVA": "OVA",
  "Special": "Especial",
  "ONA": "ONA",
  "Music": "Música",
  "Rank": "Rango",
  "Pop.": "Pop.",
  "Publication": "Publicación",
  "Authors": "Autores",
  "Manga": "Manga",
  "Manhwa": "Manhwa",
  "Manhua": "Manhua",
  "Light Novel": "Novela Ligera",
  "One-shot": "One-shot",
  "Doujinshi": "Doujinshi",
};

export const translate = (text: string | null | undefined): string => {
  if (!text) {
    return "";
  }
  return translations[text] || text;
};
