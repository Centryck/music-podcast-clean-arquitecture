import Axios from "axios";
import { EpisodeResult } from "../../domain/entity/episode/itunes-episode";
import {
  EpisodeRepository,
  GetAllEpisodesParams,
  GetSingleEpisodeParams,
} from "../../domain/repository/episode-repository/episode-repository";
import { Episode } from "../../domain/entity/episode/episode";
import { mapEpisodesResults } from "../../mapper/map-episodes-from-itunes";

export const getEpisodesEndpoint = async (id: number) => {
  try {
    const response = await Axios.get(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data as EpisodeResult;
  } catch (error) {
    throw new Error("Error at retrieving the episodes");
  }
};

export class EpisodeRepositoryImpl implements EpisodeRepository {
  async getAllEpisodes(params: GetAllEpisodesParams): Promise<Episode[]> {
    try {
      return await getEpisodesEndpoint(params.podcastId).then((data) => {
        return mapEpisodesResults(data);
      });
    } catch (err) {
      throw new Error("Error at retrieving the episodes");
    }
  }

  async getSingleEpisode(params: GetSingleEpisodeParams): Promise<Episode[]> {
    const allEpisodes = this.getAllEpisodes(params);

    const requiredEpisode = (await allEpisodes).filter(
      (filteredEpisode: Episode) => filteredEpisode.id === params.episodeId
    );

    return requiredEpisode;
  }
}
