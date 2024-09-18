import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PodcastDetails from "./";
import { useGetAllEpisodes } from "../../application/episode/use-get-all-episodes";
import { useGetSinglePodcast } from "../../application/podcast/use-get-single-podcast";

jest.mock("../../application/episode/use-get-all-episodes");
jest.mock("../../application/podcast/use-get-single-podcast");

const podcastData = {
  id: 1,
  name: "Podcast 1",
  artist: "Artist 1",
  image: ["", "", "image-url"],
  summary: "Description",
};
const episodesData = [
  { id: 1, name: "Episode 1" },
  { id: 2, name: "Episode 2" },
];

const mockUseGetAllEpisodes = useGetAllEpisodes as jest.Mock;
const mockUseGetSinglePodcast = useGetSinglePodcast as jest.Mock;

const renderElement = () => {
  const utils = render(
    <MemoryRouter initialEntries={["/podcast/1"]}>
      <Routes>
        <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
      </Routes>
    </MemoryRouter>
  );

  const query = {
    podcastTitle: () => screen.queryByText("Podcast 1"),
    artistTitle: () => screen.queryByText("by Artist 1"),
    episodesList: () => screen.queryAllByTestId("episode-item"),
    loadingBadge: () => screen.queryByTestId("badge"),
  };

  return {
    ...utils,
    query,
  };
};
describe("PodcastDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render podcast details and episodes", () => {
    mockUseGetSinglePodcast.mockReturnValue({
      podcast: podcastData,
      isLoading: false,
    });
    mockUseGetAllEpisodes.mockReturnValue({
      episodes: episodesData,
      isLoading: false,
    });

    const { query } = renderElement();

    expect(query.podcastTitle()).not.toBeNull();
    expect(query.artistTitle()).not.toBeNull();
    expect(query.episodesList()).toHaveLength(2);
  });

  it("should show loading state", () => {
    mockUseGetSinglePodcast.mockReturnValue({
      podcast: undefined,
      isLoading: true,
    });
    mockUseGetAllEpisodes.mockReturnValue({ episodes: [], isLoading: true });

    const { query } = renderElement();

    expect(query.loadingBadge()).not.toBeNull();
  });
});
