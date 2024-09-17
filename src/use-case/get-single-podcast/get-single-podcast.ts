import { Podcast } from "../../domain/entity/podcast/podcast";
import {
  PodcastRepository,
  GetSinglePodcastParams,
} from "../../domain/repository/podcast-repository/podcast-repository";
import { UseCase } from "../utils";

export class GetSinglePodcastUseCase
  implements UseCase<GetSinglePodcastParams, Promise<Podcast[]>>
{
  podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository;
  }
  async execute(params: GetSinglePodcastParams): Promise<Podcast[]> {
    return this.podcastRepository.getSinglePodcast(params);
  }
}
