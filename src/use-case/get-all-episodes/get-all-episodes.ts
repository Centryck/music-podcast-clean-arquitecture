import { Episode } from "../../domain/entity/episode/episode";
import {
  EpisodeRepository,
  GetAllEpisodesParams,
} from "../../domain/repository/episode-repository/episode-repository";
import { UseCase } from "../utils";

export class GetAllEpisodesUseCase
  implements UseCase<GetAllEpisodesParams, Promise<Episode[]>>
{
  episodeRepository: EpisodeRepository;

  constructor(episodeRepository: EpisodeRepository) {
    this.episodeRepository = episodeRepository;
  }

  async execute(params: GetAllEpisodesParams): Promise<Episode[]> {
    return this.episodeRepository.getAllEpisodes(params);
  }
}
