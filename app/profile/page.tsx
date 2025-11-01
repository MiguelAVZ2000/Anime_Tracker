import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserLists from "@/components/UserLists";
import dbConnect from "@/lib/dbConnect";
import AnimeEntry from "@/models/AnimeEntry";
import MangaEntry from "@/models/MangaEntry";

async function getUserLists(userId: string) {
  await dbConnect();
  const animeList = await AnimeEntry.find({ userId }).sort({ updatedAt: -1 }).lean();
  const mangaList = await MangaEntry.find({ userId }).sort({ updatedAt: -1 }).lean();

  // Convertir ObjectId a string para que sea serializable
  return {
    animeList: JSON.parse(JSON.stringify(animeList)),
    mangaList: JSON.parse(JSON.stringify(mangaList)),
  };
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { animeList, mangaList } = await getUserLists(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarImage src={session.user.image || ""} alt={session.user.name || "Usuario"} />
          <AvatarFallback className="text-3xl">
            {session.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{session.user.name}</h1>
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      {/* Pasamos las listas al componente cliente */}
      <UserLists initialAnimeList={animeList} initialMangaList={mangaList} />
    </div>
  );
}