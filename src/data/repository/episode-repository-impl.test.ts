import Axios from "axios";
import {
  EpisodeRepositoryImpl,
  getEpisodesEndpoint,
} from "./episode-repository-impl";
import { mapEpisodesResults } from "../../mapper/map-episodes-from-itunes";
import { Episode } from "../../domain/entity/episode/episode";

jest.mock("axios");
jest.mock("../../mapper/map-episodes-from-itunes");

const FIXED_DATE = new Date("2023-12-30T00:00:00Z");

describe("EpisodeRepositoryImpl", () => {
  const mockAxiosGet = Axios.get as jest.Mock;
  const mockMapEpisodesResults = mapEpisodesResults as jest.Mock;
  const episodeRepository = new EpisodeRepositoryImpl();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getEpisodesEndpoint", () => {
    it("should return correct data from API", async () => {
      const mockData = { results: [{ trackId: 1, trackName: "Episode 1" }] };

      mockAxiosGet.mockResolvedValueOnce({ data: mockData });

      const result = await getEpisodesEndpoint(123);

      expect(mockAxiosGet).toHaveBeenCalledWith(
        "https://itunes.apple.com/lookup?id=123&media=podcast&entity=podcastEpisode",
        { headers: { "Content-Type": "application/json" } }
      );
      expect(result).toEqual(mockData);
    });

    it("should throw an error if API fails", async () => {
      mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getEpisodesEndpoint(123)).rejects.toThrow(
        "Error at retrieving the episodes"
      );
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllEpisodes", () => {
    it("should return an array of episodes mapped correctly", async () => {
      const mockEpisodeResult = {
        results: [{ trackId: 1, trackName: "Episode 1" }],
      };
      const mockMappedEpisodes: Episode[] = [
        {
          id: 1,
          name: "Episode 1",
          collectionId: 1,
          collectionName: "name",
          releaseDate: FIXED_DATE,
          trackTimeMillis: 1,
        },
      ];

      mockAxiosGet.mockResolvedValueOnce({ data: mockEpisodeResult });
      mockMapEpisodesResults.mockReturnValue(mockMappedEpisodes);

      const params = { podcastId: 123 };
      const episodes = await episodeRepository.getAllEpisodes(params);

      expect(mockAxiosGet).toHaveBeenCalledWith(
        "https://itunes.apple.com/lookup?id=123&media=podcast&entity=podcastEpisode",
        { headers: { "Content-Type": "application/json" } }
      );
      expect(mockMapEpisodesResults).toHaveBeenCalledWith(mockEpisodeResult);
      expect(episodes).toEqual(mockMappedEpisodes);
    });

    it("should throw an error if map fails", async () => {
      mockAxiosGet.mockRejectedValueOnce(new Error("API Error"));

      const params = { podcastId: 123 };

      await expect(episodeRepository.getAllEpisodes(params)).rejects.toThrow(
        "Error at retrieving the episodes"
      );
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });
  });

  describe("getSingleEpisode", () => {
    it("should return correct episode filtering by id", async () => {
      const mockMappedEpisodes: Episode[] = [
        {
          id: 1,
          name: "Episode 1",
          collectionId: 1,
          collectionName: "name",
          releaseDate: FIXED_DATE,
          trackTimeMillis: 1,
        },
        {
          id: 2,
          name: "Episode 2",
          collectionId: 1,
          collectionName: "name",
          releaseDate: FIXED_DATE,
          trackTimeMillis: 1,
        },
      ];

      jest
        .spyOn(episodeRepository, "getAllEpisodes")
        .mockResolvedValueOnce(mockMappedEpisodes);

      const params = { podcastId: 123, episodeId: 2 };
      const episode = await episodeRepository.getSingleEpisode(params);

      expect(episode).toEqual([
        {
          id: 2,
          name: "Episode 2",
          collectionId: 1,
          collectionName: "name",
          releaseDate: FIXED_DATE,
          trackTimeMillis: 1,
        },
      ]);
    });

    it("should return an empty array if episode was not found", async () => {
      const mockMappedEpisodes: Episode[] = [
        {
          id: 1,
          name: "Episode 1",
          collectionId: 1,
          collectionName: "name",
          releaseDate: FIXED_DATE,
          trackTimeMillis: 1,
        },
      ];

      jest
        .spyOn(episodeRepository, "getAllEpisodes")
        .mockResolvedValueOnce(mockMappedEpisodes);

      const params = { podcastId: 123, episodeId: 99 };
      const episode = await episodeRepository.getSingleEpisode(params);

      expect(episode).toEqual([]);
    });
  });
});
