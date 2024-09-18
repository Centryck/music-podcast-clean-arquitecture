import { Episode } from "../../domain/entity/episode/episode";
import {
  EpisodeRepository,
  GetSingleEpisodeParams,
} from "../../domain/repository/episode-repository/episode-repository";
import { UseCase } from "../utils";

export class GetSingleEpisodeUseCase
  implements UseCase<GetSingleEpisodeParams, Promise<Episode[]>>
{
  EpisodeRepository: EpisodeRepository;

  constructor(EpisodeRepository: EpisodeRepository) {
    this.EpisodeRepository = EpisodeRepository;
  }
  async execute(params: GetSingleEpisodeParams): Promise<Episode[]> {
    return this.EpisodeRepository.getSingleEpisode(params);
  }
}
