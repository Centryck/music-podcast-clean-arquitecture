import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EpisodeDetails from "./";
import { useGetSingleEpisode } from "../../application/episode/use-get-single-episode";
import { useGetSinglePodcast } from "../../application/podcast/use-get-single-podcast";

jest.mock("../../application/episode/use-get-single-episode");
jest.mock("../../application/podcast/use-get-single-podcast");

const mockUseGetSingleEpisode = useGetSingleEpisode as jest.Mock;
const mockUseGetSinglePodcast = useGetSinglePodcast as jest.Mock;

const podcastData = {
  id: 1,
  name: "Podcast 1",
  artist: "Artist 1",
  image: ["", "", "image-url"],
  summary: "Description",
};
const episodeData = {
  id: 1,
  name: "Episode 1",
  description: "Episode 1 description",
};

const renderElement = () => {
  const utils = render(
    <MemoryRouter initialEntries={["/podcast/1/episode/1"]}>
      <Routes>
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetails />}
        />
      </Routes>
    </MemoryRouter>
  );

  const query = {
    podcastTitle: () => screen.queryByText("Podcast 1"),
    episodeTitle: () => screen.queryByText("Episode 1"),
    episodeDescription: () => screen.queryByText("Episode 1 description"),
    loadingBadge: () => screen.queryByTestId("badge"),
  };

  return {
    ...utils,
    query,
  };
};

describe("EpisodeDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render episode and podcast details", () => {
    mockUseGetSinglePodcast.mockReturnValue({
      podcast: podcastData,
      isLoading: false,
    });
    mockUseGetSingleEpisode.mockReturnValue({
      episode: episodeData,
      isLoading: false,
    });
    const { query } = renderElement();

    expect(query.podcastTitle()).not.toBeNull();
    expect(query.episodeDescription()).not.toBeNull();
    expect(query.episodeTitle()).not.toBeNull();
  });

  it("should show loading state", () => {
    mockUseGetSinglePodcast.mockReturnValue({
      podcast: undefined,
      isLoading: true,
    });
    mockUseGetSingleEpisode.mockReturnValue({
      episode: undefined,
      isLoading: true,
    });
    const { query } = renderElement();

    expect(query.loadingBadge()).not.toBeNull();
  });
});
