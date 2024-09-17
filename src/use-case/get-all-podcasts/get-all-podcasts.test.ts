import { GetAllPodcastsUseCase } from "./get-all-podcasts";
import { PodcastRepository } from "../../domain/repository/podcast-repository/podcast-repository";
import { Podcast, RawPodcast } from "../../domain/entity/podcast/podcast";

const mockPodcastRepository = {
  getAllPodcasts: jest.fn(),
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

const rawPodcastMock: RawPodcast = {
  podcast: [podcastMock, secondPodcastMock],
};

describe("GetAllPodcastsUseCase", () => {
  let useCase: GetAllPodcastsUseCase;

  beforeEach(() => {
    useCase = new GetAllPodcastsUseCase(mockPodcastRepository);
    jest.clearAllMocks();
  });

  it("should return podcasts from repo", async () => {
    mockPodcastRepository.getAllPodcasts.mockResolvedValue(rawPodcastMock);

    const result = await useCase.execute();

    expect(mockPodcastRepository.getAllPodcasts).toHaveBeenCalledTimes(1);

    expect(result).toEqual(rawPodcastMock);
  });

  it("should throw an error if api fails", async () => {
    mockPodcastRepository.getAllPodcasts.mockRejectedValue(
      new Error("API Error")
    );

    await expect(useCase.execute()).rejects.toThrow("API Error");

    expect(mockPodcastRepository.getAllPodcasts).toHaveBeenCalledTimes(1);
  });
});
