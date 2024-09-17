import { GetAllEpisodesUseCase } from "./get-all-episodes";
import {
  EpisodeRepository,
  GetAllEpisodesParams,
} from "../../domain/repository/episode-repository/episode-repository";
import { Episode } from "../../domain/entity/episode/episode";

const mockEpisodeRepository = {
  getAllEpisodes: jest.fn(),
} as unknown as jest.Mocked<EpisodeRepository>;

describe("GetAllEpisodesUseCase", () => {
  let useCase: GetAllEpisodesUseCase;

  beforeEach(() => {
    useCase = new GetAllEpisodesUseCase(mockEpisodeRepository);
    jest.clearAllMocks();
  });

  it("should return a list of episodes from repo", async () => {
    const mockEpisodes: Episode[] = [
      {
        id: 1,
        name: "Episode 1",
        collectionId: 1,
        collectionName: "Podcast",
        releaseDate: new Date(),
        trackTimeMillis: 1000,
      },
    ];

    mockEpisodeRepository.getAllEpisodes.mockResolvedValue(mockEpisodes);

    const params: GetAllEpisodesParams = { podcastId: 123 };
    const result = await useCase.execute(params);

    expect(mockEpisodeRepository.getAllEpisodes).toHaveBeenCalledWith(params);
    expect(mockEpisodeRepository.getAllEpisodes).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockEpisodes);
  });

  it("should throw an error if repo fails", async () => {
    mockEpisodeRepository.getAllEpisodes.mockRejectedValue(
      new Error("API Error")
    );

    const params: GetAllEpisodesParams = { podcastId: 123 };

    await expect(useCase.execute(params)).rejects.toThrow("API Error");

    expect(mockEpisodeRepository.getAllEpisodes).toHaveBeenCalledWith(params);
    expect(mockEpisodeRepository.getAllEpisodes).toHaveBeenCalledTimes(1);
  });
});
