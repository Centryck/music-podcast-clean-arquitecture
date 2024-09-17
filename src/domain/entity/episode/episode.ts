export interface Episode {
  id: number;
  collectionId: number;
  name: string;
  description?: string;
  collectionName: string;
  releaseDate: Date;
  episodeUrl?: string;
  trackTimeMillis: number;
  index?: number;
}

export interface StoredEpisodes {
  episodes: Episode[];
  date: Date;
}

export interface StoredSingleEpisode {
  episode: Episode;
  date: Date;
}
