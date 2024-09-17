import { DetailedItunesPodcast } from "../podcast/itunes-podcast";

interface EpisodeGenre {
  name: string;
  id: string;
}

export interface ItunesEpisode extends Partial<DetailedItunesPodcast> {
  country: string;
  previewUrl?: string;
  artistIds?: number[];
  genres: EpisodeGenre[] | string[];
  episodeGuid?: string;
  description?: string;
  shortDescription?: string;
  trackId: number;
  trackName: string;
  collectionId: number;
  collectionName: string;
  feedUrl: string;
  closedCaptioning?: string;
  releaseDate: Date;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  artworkUrl160?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  episodeUrl?: string;
  artworkUrl600: string;
  artworkUrl60: string;
  artistViewUrl: string;
  kind: string;
}

export interface EpisodeResult {
  resultCount: number;
  results: ItunesEpisode[];
}
