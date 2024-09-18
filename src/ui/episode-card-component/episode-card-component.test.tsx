import { render, screen } from "@testing-library/react";
import EpisodeCardComponent, { EpisodeCardComponentProps } from "./";
import { Episode } from "../../domain/entity/episode/episode";

const episodeMock: Episode = {
  name: "episode title",
  description: "description",
  episodeUrl: "http://www.example.com/episode1.mp3",
  id: 123456,
  collectionId: 123123,
  collectionName: "podcast name",
  releaseDate: new Date(),
  trackTimeMillis: 0,
};

const episodeWithoutDescriptionMock: Episode = {
  name: "episode title",
  episodeUrl: "http://www.example.com/episode1.mp3",
  id: 123456,
  collectionId: 123123,
  collectionName: "podcast name",
  releaseDate: new Date(),
  trackTimeMillis: 0,
};

const renderElement = (props?: EpisodeCardComponentProps) => {
  const utils = render(
    <EpisodeCardComponent episode={episodeMock} {...props} />
  );
  const query = {
    title: () => screen.queryByText("episode title"),
    description: () => screen.queryByText("description"),
    episodeDescriptionId: () => screen.queryByTestId("episode-description"),
    audio: () => screen.queryByTestId("audio-player"),
  };

  return { ...utils, query };
};

describe("EpisodeCard", () => {
  it("should render the episode by default", () => {
    const { query } = renderElement();

    expect(query.title()).not.toBeNull();
    expect(query.description()).not.toBeNull();
    expect(query.audio()).not.toBeNull();
  });

  it("should render the episode without description", () => {
    const { query } = renderElement({ episode: episodeWithoutDescriptionMock });

    expect(query.title()).not.toBeNull();
    expect(query.description()).toBeNull();
    expect(query.episodeDescriptionId()).not.toBeNull();

    expect(query.audio()).not.toBeNull();
  });
});
