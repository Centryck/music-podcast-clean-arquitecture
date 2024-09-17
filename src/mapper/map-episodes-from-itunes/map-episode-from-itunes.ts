import { Episode } from "../../domain/entity/episode/episode";
import {
  EpisodeResult,
  ItunesEpisode,
} from "../../domain/entity/episode/itunes-episode";

type Mapper<BackendType, MappedType> = (input: BackendType) => MappedType;

const mapEpisode: Mapper<ItunesEpisode, Episode> = (input) => {
  return {
    id: input.trackId,
    name: input.trackName,
    description: input.description,
    releaseDate: input.releaseDate,
    collectionId: input.collectionId,
    trackTimeMillis: input.trackTimeMillis,
    episodeUrl: input.episodeUrl,
    collectionName: input.collectionName,
  };
};

const mapEpisodes = (episodes: ItunesEpisode[]): Episode[] =>
  episodes.map(mapEpisode).map((episode, index) => {
    return {
      ...episode,
      index,
    };
  });

export const mapEpisodesResults: Mapper<EpisodeResult, Episode[]> = (input) => {
  return mapEpisodes(input.results);
};
