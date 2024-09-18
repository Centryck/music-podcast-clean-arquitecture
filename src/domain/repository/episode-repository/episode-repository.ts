import { Episode } from "../../entity/episode/episode";

export interface GetAllEpisodesParams {
  podcastId: number;
}

export interface GetSingleEpisodeParams {
  podcastId: number;
  episodeId: number;
}

export interface EpisodeRepository {
  getAllEpisodes(params: GetAllEpisodesParams): Promise<Episode[]>;
  getSingleEpisode(params: GetSingleEpisodeParams): Promise<Episode[]>;
}
