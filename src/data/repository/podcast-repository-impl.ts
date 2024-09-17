import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { ItunesPodcast } from "../../domain/entity/podcast/itunes-podcast";
import {
  GetSinglePodcastParams,
  PodcastRepository,
} from "../../domain/repository/podcast-repository/podcast-repository";
import { Podcast, RawPodcast } from "../../domain/entity/podcast/podcast";
import { mapPodcastsFromItunes } from "../../mapper/map-podcast-from-itunes";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

const axios = setupCache(Axios);

export const getPodcastsEndpoint = async () => {
  const response = await axios.get(proxyUrl + targetUrl, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data as ItunesPodcast;
};

export class PodcastRepositoryImpl implements PodcastRepository {
  async getAllPodcasts(): Promise<RawPodcast> {
    try {
      return await getPodcastsEndpoint().then((data) => {
        return mapPodcastsFromItunes(data);
      });
    } catch (err) {
      throw new Error("Error at retrieving the podcasts");
    }
  }

  async getSinglePodcast({ id }: GetSinglePodcastParams): Promise<Podcast[]> {
    const allPodcasts = this.getAllPodcasts();

    const requiredPodcast = (await allPodcasts).podcast.filter(
      (filteredPodcast: Podcast) => filteredPodcast.id === id
    );

    return requiredPodcast;
  }
}
