import { render, screen, waitFor } from "@testing-library/react";
import EpisodeList from "./";
import { Episode } from "../../domain/entity/episode/episode";
import { MemoryRouter } from "react-router-dom";

const fixedDate = new Date("2023-12-30T00:00:00Z");

const mockEpisodes: Episode[] = [
  {
    id: 1,
    collectionId: 1,
    name: "test name",
    releaseDate: fixedDate,
    episodeUrl: "https://url-test-episode.com",
    trackTimeMillis: 1000,
    collectionName: "collection",
  },
  {
    id: 2,
    collectionId: 1,
    name: "mock name",
    releaseDate: fixedDate,
    episodeUrl: "https://url-mock-episode.com",
    trackTimeMillis: 1000,
    collectionName: "collection",
  },
];

const renderElement = (episodes: Episode[]) => {
  const utils = render(
    <MemoryRouter>
      <EpisodeList episodes={episodes} />
    </MemoryRouter>
  );

  const query = {
    episodesNumber: () => screen.queryByText(`Episodes: ${episodes.length}`),
    episodeItems: () => screen.queryAllByTestId("episode-item"),
    titleHeader: () => screen.queryByText("Title"),
    dateHeader: () => screen.queryByText("Date"),
    durationHeader: () => screen.queryByText("Duration"),
  };

  return {
    ...utils,
    query,
  };
};

describe("EpisodeList Component", () => {
  it("should render correctly with given episodes", async () => {
    const { query } = renderElement(mockEpisodes);

    expect(query.episodesNumber()).not.toBeNull();

    expect(query.titleHeader()).not.toBeNull();
    expect(query.dateHeader()).not.toBeNull();
    expect(query.durationHeader()).not.toBeNull();

    await waitFor(() =>
      expect(query.episodeItems().length).toBe(mockEpisodes.length)
    );
  });

  it("should render correctly with no episodes", () => {
    const { query } = renderElement([]);

    expect(query.episodesNumber()).not.toBeNull();
    expect(query.episodesNumber()).toHaveTextContent("Episodes: 0");

    expect(query.episodeItems().length).toBe(0);
  });
});
