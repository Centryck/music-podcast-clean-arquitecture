import { RawPodcast } from "../../domain/entity/podcast/podcast";
import { PodcastRepository } from "../../domain/repository/podcast-repository/podcast-repository";
import { UseCase } from "../utils";

export class GetAllPodcastsUseCase
  implements UseCase<undefined, Promise<RawPodcast>>
{
  podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository;
  }

  async execute(): Promise<RawPodcast> {
    return this.podcastRepository.getAllPodcasts();
  }
}
