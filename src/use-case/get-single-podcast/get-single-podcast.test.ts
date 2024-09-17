import { GetSinglePodcastUseCase } from "./get-single-podcast";
import {
  PodcastRepository,
  GetSinglePodcastParams,
} from "../../domain/repository/podcast-repository/podcast-repository";
import { Podcast } from "../../domain/entity/podcast/podcast";

const mockPodcastRepository = {
  getSinglePodcast: jest.fn(),
} as unknown as jest.Mocked<PodcastRepository>;

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
describe("GetSinglePodcastUseCase", () => {
  let useCase: GetSinglePodcastUseCase;

  beforeEach(() => {
    useCase = new GetSinglePodcastUseCase(mockPodcastRepository);
    jest.clearAllMocks();
  });

  it("should return a single podcast", async () => {
    mockPodcastRepository.getSinglePodcast.mockResolvedValue([podcastMock]);

    const params: GetSinglePodcastParams = { id: "1" };
    const result = await useCase.execute(params);

    expect(mockPodcastRepository.getSinglePodcast).toHaveBeenCalledWith(params);
    expect(mockPodcastRepository.getSinglePodcast).toHaveBeenCalledTimes(1);

    expect(result).toEqual([podcastMock]);
  });

  it("should throw an error if api call fails", async () => {
    mockPodcastRepository.getSinglePodcast.mockRejectedValue(
      new Error("API Error")
    );

    const params: GetSinglePodcastParams = { id: "1" };

    await expect(useCase.execute(params)).rejects.toThrow("API Error");

    expect(mockPodcastRepository.getSinglePodcast).toHaveBeenCalledWith(params);
    expect(mockPodcastRepository.getSinglePodcast).toHaveBeenCalledTimes(1);
  });
});
