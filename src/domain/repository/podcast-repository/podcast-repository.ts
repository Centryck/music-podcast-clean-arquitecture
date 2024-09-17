import { Podcast, RawPodcast } from "../../entity/podcast/podcast";

export interface GetSinglePodcastParams {
	id: string;
}

export interface PodcastRepository {
	getAllPodcasts(): Promise<RawPodcast>;
	getSinglePodcast(params: GetSinglePodcastParams): Promise<Podcast[]>;
}