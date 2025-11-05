import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface MediaItem {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes?: number;
  chapters?: number;
  score: number;
  type: string;
}

interface MediaCardProps {
  item: MediaItem;
  mediaType: "anime" | "manga";
}

const MediaCard: React.FC<MediaCardProps> = ({ item, mediaType }) => {
  const imageUrl = item.images?.jpg?.large_image_url || '/placeholder.png'; // Usar una imagen de placeholder si no hay
  const detailLink = `/${mediaType}/${item.mal_id}`;

  return (
    <Link href={detailLink} className="block group">
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-200">
        <Image
          src={imageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-200"
        />
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
          {item.score > 0 ? item.score.toFixed(1) : 'N/A'}
        </Badge>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {mediaType === 'anime' && item.episodes ? `${item.episodes} episodios` : ''}
          {mediaType === 'manga' && item.chapters ? `${item.chapters} capítulos` : ''}
        </p>
      </div>
    </Link>
  );
};

export default MediaCard;
