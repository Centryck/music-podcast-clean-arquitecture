import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EpisodeListItemComponent from "./";
import { Episode } from "../../../domain/entity/episode/episode";

const fixedDate = new Date("2023-01-01T00:00:00Z");

const mockEpisode: Episode = {
  id: 1,
  collectionId: 1,
  name: "test name",
  releaseDate: fixedDate,
  episodeUrl: "https://url-test-episode.com",
  trackTimeMillis: 600000,
  collectionName: "collection",
};

const renderElement = (episode: Episode) => {
  const utils = render(
    <Router>
      <EpisodeListItemComponent episode={episode} />
    </Router>
  );

  const query = {
    episodeTitle: () => screen.queryByText(episode.name),
    episodeDate: () => screen.queryByText("1/1/2023"),
    episodeDuration: () => screen.queryByText("10:00"),
    link: () => screen.queryByRole("link", { name: episode.name }),
  };

  return {
    ...utils,
    query,
  };
};

describe("EpisodeListItemComponent", () => {
  it("should render correctly with the episode data", () => {
    const { query } = renderElement(mockEpisode);

    expect(query.episodeTitle()).not.toBeNull();
    expect(query.episodeDate()).not.toBeNull();
    expect(query.episodeDuration()).not.toBeNull();
    expect(query.link()).toHaveAttribute(
      "href",
      `/podcast/${mockEpisode.collectionId}/episode/${mockEpisode.id}`
    );
  });

  it("should format the release date correctly", () => {
    const { query } = renderElement(mockEpisode);

    expect(query.episodeDate()).toHaveTextContent("1/1/2023");
  });

  it("should format the episode duration correctly", () => {
    const { query } = renderElement(mockEpisode);

    expect(query.episodeDuration()).toHaveTextContent("10:00");
  });
});
