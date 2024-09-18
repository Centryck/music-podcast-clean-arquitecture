import { GetSingleEpisodeUseCase } from "./get-single-episode";
import {
  EpisodeRepository,
  GetSingleEpisodeParams,
} from "../../domain/repository/episode-repository/episode-repository";
import { Episode } from "../../domain/entity/episode/episode";

const mockEpisodeRepository = {
  getSingleEpisode: jest.fn(),
} as unknown as jest.Mocked<EpisodeRepository>;

const fixedDate = new Date("2023-01-01T00:00:00Z");

const episodeMock: Episode = {
  id: 1,
  collectionId: 1,
  name: "test name",
  releaseDate: fixedDate,
  episodeUrl: "https://url-test-episode.com",
  trackTimeMillis: 1000,
  collectionName: "collection",
};

describe("GetSingleEpisodeUseCase", () => {
  let useCase: GetSingleEpisodeUseCase;

  beforeEach(() => {
    useCase = new GetSingleEpisodeUseCase(mockEpisodeRepository);
    jest.clearAllMocks();
  });

  it("should return a single episode", async () => {
    mockEpisodeRepository.getSingleEpisode.mockResolvedValue([episodeMock]);

    const params: GetSingleEpisodeParams = { podcastId: 1, episodeId: 1 };
    const result = await useCase.execute(params);

    expect(mockEpisodeRepository.getSingleEpisode).toHaveBeenCalledWith(params);
    expect(mockEpisodeRepository.getSingleEpisode).toHaveBeenCalledTimes(1);

    expect(result).toEqual([episodeMock]);
  });

  it("should throw an error if api call fails", async () => {
    mockEpisodeRepository.getSingleEpisode.mockRejectedValue(
      new Error("API Error")
    );

    const params: GetSingleEpisodeParams = { podcastId: 1, episodeId: 1 };

    await expect(useCase.execute(params)).rejects.toThrow("API Error");

    expect(mockEpisodeRepository.getSingleEpisode).toHaveBeenCalledWith(params);
    expect(mockEpisodeRepository.getSingleEpisode).toHaveBeenCalledTimes(1);
  });
});
