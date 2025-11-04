
import dbConnect from './dbConnect'; // Importar dbConnect
import { ObjectId } from 'mongodb'; // ObjectId sigue siendo necesario para IDs de MongoDB
import { getServerSession } from 'next-auth';

async function getDb() {
  const conn = await dbConnect(); // Obtener la conexión de Mongoose
  return conn.connection.db; // Acceder a la base de datos nativa de MongoDB a través de la conexión de Mongoose
}

async function getUserId() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return null;
  }
  return new ObjectId(session.user.id);
}

export async function getUserStats() {
  const userId = await getUserId();
  if (!userId) return null;

  const db = await getDb();
  const userAnime = await db.collection('user_anime').find({ userId }).toArray();
  const userManga = await db.collection('user_manga').find({ userId }).toArray();

  const animeWatching = userAnime.filter((d) => d.status === 'watching').length;
  const animeCompleted = userAnime.filter((d) => d.status === 'completed').length;
  const animePlanToWatch = userAnime.filter((d) => d.status === 'plan_to_watch').length;

  const mangaReading = userManga.filter((d) => d.status === 'reading').length;
  const mangaCompleted = userManga.filter((d) => d.status === 'completed').length;
  const mangaPlanToRead = userManga.filter((d) => d.status === 'plan_to_read').length;

  // Mocking other stats for now
  return {
    animeWatching,
    animeCompleted,
    animePlanToWatch,
    mangaReading,
    mangaCompleted,
    mangaPlanToRead,
    totalEpisodesWatched: 2847,
    totalChaptersRead: 1523,
    daysWatched: 42.3,
    averageScore: 8.2,
  };
}

export async function getCurrentlyWatching() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await getDb();
  const currentlyWatching = await db.collection('user_anime').aggregate([
    { $match: { userId, status: 'watching' } },
    {
      $lookup: {
        from: 'anime',
        localField: 'animeId',
        foreignField: '_id',
        as: 'anime',
      },
    },
    { $unwind: '$anime' },
    {
      $project: {
        id: '$anime._id',
        title: '$anime.title',
        image: '$anime.image',
        progress: '$progress',
        total: '$anime.total_episodes',
        rating: '$rating',
        type: 'anime',
      },
    },
  ]).toArray();

  return currentlyWatching;
}

export async function getCurrentlyReading() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await getDb();
  const currentlyReading = await db.collection('user_manga').aggregate([
    { $match: { userId, status: 'reading' } },
    {
      $lookup: {
        from: 'manga',
        localField: 'mangaId',
        foreignField: '_id',
        as: 'manga',
      },
    },
    { $unwind: '$manga' },
    {
      $project: {
        id: '$manga._id',
        title: '$manga.title',
        image: '$manga.image',
        progress: '$progress',
        total: '$manga.total_chapters',
        rating: '$rating',
        type: 'manga',
      },
    },
  ]).toArray();

  return currentlyReading;
}

export async function getRecentActivity() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await getDb();
  const recentActivity = await db.collection('activity').find({ userId }).sort({ createdAt: -1 }).limit(5).toArray();

  return recentActivity;
}

export async function getUpcomingReleases() {
  const db = await getDb();
  const upcomingReleases = await db.collection('releases').find().sort({ release_date: 1 }).limit(3).toArray();

  return upcomingReleases;
}

export async function getProfile() {
  const userId = await getUserId();
  if (!userId) return null;

  const db = await getDb();
  const profile = await db.collection('users').findOne({ _id: userId });

  return profile;
}

export async function updateProfile(profile: any) {
  const userId = await getUserId();
  if (!userId) return null;

  const db = await getDb();
  const { _id: __id, ...profileData } = profile;
  const result = await db.collection('users').updateOne({ _id: userId }, { $set: profileData });

  return result;
}
