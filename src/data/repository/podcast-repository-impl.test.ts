import Axios from "axios";
import {
  PodcastRepositoryImpl,
  getPodcastsEndpoint,
} from "./podcast-repository-impl";
import { mapPodcastsFromItunes } from "../../mapper/map-podcast-from-itunes";
import { Podcast } from "../../domain/entity/podcast/podcast";

jest.mock("axios");
jest.mock("../../mapper/map-podcast-from-itunes");
const podcastMock: Podcast = {
  id: "1",
  name: "podcast",
  image: [
    {
      label: "img",
      attributes: { height: "2" },
    },
  ],
  summary: "summary",
  rights: "rights",
  title: "podcast title",
  artist: "artist",
};

const secondPodcastMock: Podcast = {
  id: "2",
  name: "podcast",
  image: [
    {
      label: "img",
      attributes: { height: "2" },
    },
  ],
  summary: "summary",
  rights: "rights",
  title: "podcast title",
  artist: "artist",
};

const rawPodcastMock = {
  podcast: [podcastMock, secondPodcastMock],
};

describe("PodcastRepositoryImpl", () => {
  const mockAxiosGet = Axios.get as jest.Mock;
  const mockMapPodcastsFromItunes = mapPodcastsFromItunes as jest.Mock;
  const podcastRepository = new PodcastRepositoryImpl();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPodcastsEndpoint", () => {
    it("should return correct data from API", async () => {
      const mockData = {
        results: [{ collectionId: 1, collectionName: "Podcast 1" }],
      };

      mockAxiosGet.mockResolvedValueOnce({ data: mockData });

      const result = await getPodcastsEndpoint();

      expect(mockAxiosGet).toHaveBeenCalledWith(
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        { headers: { "Content-Type": "application/json" } }
      );
      expect(result).toEqual(mockData);
    });

    it("should throw an error if fails", async () => {
      mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getPodcastsEndpoint()).rejects.toThrow("Network Error");
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllPodcasts", () => {
    it("should return a list of mapped podcasts", async () => {
      const mockPodcastResult = {
        results: [{ collectionId: 1, collectionName: "Podcast 1" }],
      };

      mockAxiosGet.mockResolvedValueOnce({ data: mockPodcastResult });
      mockMapPodcastsFromItunes.mockReturnValue(rawPodcastMock);

      const podcasts = await podcastRepository.getAllPodcasts();

      expect(mockAxiosGet).toHaveBeenCalledWith(
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        { headers: { "Content-Type": "application/json" } }
      );
      expect(mockMapPodcastsFromItunes).toHaveBeenCalledWith(mockPodcastResult);
      expect(podcasts).toEqual(rawPodcastMock);
    });

    it("should throw an error if map fails", async () => {
      mockAxiosGet.mockRejectedValueOnce(new Error("API Error"));

      await expect(podcastRepository.getAllPodcasts()).rejects.toThrow(
        "Error at retrieving the podcasts"
      );
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });
  });

  describe("getSinglePodcast", () => {
    it("should return correct podcast filtered by id", async () => {
      jest
        .spyOn(podcastRepository, "getAllPodcasts")
        .mockResolvedValueOnce(rawPodcastMock);

      const params = { id: "2" };
      const podcast = await podcastRepository.getSinglePodcast(params);

      expect(podcast).toEqual([
        {
          id: "2",
          name: "podcast",
          image: [
            {
              label: "img",
              attributes: { height: "2" },
            },
          ],
          summary: "summary",
          rights: "rights",
          title: "podcast title",
          artist: "artist",
        },
      ]);
    });

    it("should return an empty array if podcast was not found", async () => {
      jest
        .spyOn(podcastRepository, "getAllPodcasts")
        .mockResolvedValueOnce(rawPodcastMock);

      const params = { id: "99" };
      const podcast = await podcastRepository.getSinglePodcast(params);

      expect(podcast).toEqual([]);
    });
  });
});
