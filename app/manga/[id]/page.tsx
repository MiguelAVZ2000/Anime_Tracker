import { getMangaById } from "@/lib/jikanApi";
import { translate } from "@/lib/translator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, Book, Calendar, Users, BarChart, PenSquare } from "lucide-react";
import AddToListButton from "@/components/AddToListButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ReviewsSection from "@/components/ReviewsSection";
import Synopsis from "@/components/Synopsis";

interface MangaDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MangaDetailsPage({ params }: MangaDetailsPageProps) {
  const session = await getServerSession(authOptions);
  const manga = await getMangaById(Number(params.id));

  if (!manga) {
    return <div className="container mx-auto px-4 py-8 text-center">Manga no encontrado.</div>;
  }

  const mediaDataForList = {
    mal_id: manga.mal_id,
    title: manga.title,
    image: manga.images.jpg.large_image_url,
    type: manga.type,
    totalChapters: manga.chapters,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={manga.images.jpg.large_image_url}
            alt={manga.title}
            width={350}
            height={500}
            className="rounded-lg shadow-lg w-full"
          />
          {session?.user && <AddToListButton media={mediaDataForList} mediaType="manga" />}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{manga.title}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">{manga.title_japanese}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {manga.genres.map((genre: any) => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-6 text-lg">
            <div className="flex items-center gap-2 font-bold">
              <Star className="text-yellow-400" />
              <span>{manga.score || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart />
              <span>{translate("Rank")} #{manga.rank || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users />
              <span>{translate("Pop.")} #{manga.popularity || "N/A"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2"><Book /> <strong>{translate("Type")}:</strong> {translate(manga.type) || "N/A"}</div>
            <div className="flex items-center gap-2"><PenSquare /> <strong>{translate("Chapters")}:</strong> {manga.chapters || "N/A"}</div>
            <div className="flex items-center gap-2"><Calendar /> <strong>{translate("Publication")}:</strong> {manga.published.string || "N/A"}</div>
            <div className="flex items-center gap-2">
              <strong>{translate("Authors")}:</strong>
              <div className="flex flex-wrap gap-1">
                {manga.authors.map((author: any) => (
                  <Badge key={author.mal_id} variant="outline" className="text-xs">{author.name}</Badge>
                ))}
              </div>
            </div>
          </div>

import Synopsis from "@/components/Synopsis";

          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">{translate("Synopsis")}</h3>
          <Synopsis text={manga.synopsis || "No hay sinopsis disponible."} />

        </div>
      </div>

      <ReviewsSection mediaId={manga.mal_id} mediaType="manga" />
    </div>
  );
}