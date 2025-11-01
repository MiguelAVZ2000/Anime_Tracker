import { getAnimeById } from "@/lib/jikanApi";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, Tv, Film, Calendar, Clapperboard, Book, Users, BarChart } from "lucide-react";
import AddToListButton from "@/components/AddToListButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface AnimeDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function AnimeDetailsPage({ params }: AnimeDetailsPageProps) {
  const session = await getServerSession(authOptions);
  const anime = await getAnimeById(Number(params.id));

  if (!anime) {
    return <div className="container mx-auto px-4 py-8 text-center">Anime no encontrado.</div>;
  }

  const mediaDataForList = {
    mal_id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.large_image_url,
    type: anime.type,
    totalEpisodes: anime.episodes,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            width={350}
            height={500}
            className="rounded-lg shadow-lg w-full"
          />
          {session?.user && <AddToListButton media={mediaDataForList} mediaType="anime" />}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">{anime.title_japanese}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres.map((genre: any) => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-6 text-lg">
            <div className="flex items-center gap-2 font-bold">
              <Star className="text-yellow-400" />
              <span>{anime.score || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart />
              <span>Rank #{anime.rank || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users />
              <span>Pop. #{anime.popularity || "N/A"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2"><Tv /> <strong>Tipo:</strong> {anime.type || "N/A"}</div>
            <div className="flex items-center gap-2"><Clapperboard /> <strong>Episodios:</strong> {anime.episodes || "N/A"}</div>
            <div className="flex items-center gap-2"><Calendar /> <strong>Emisión:</strong> {anime.aired.string || "N/A"}</div>
            <div className="flex items-center gap-2"><Book /> <strong>Fuente:</strong> {anime.source || "N/A"}</div>
          </div>

          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Sinopsis</h3>
          <p className="text-muted-foreground whitespace-pre-wrap">{anime.synopsis || "No hay sinopsis disponible."}</p>

          {anime.trailer?.youtube_id && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Trailer</h3>
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}