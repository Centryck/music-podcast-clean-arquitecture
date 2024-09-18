import React from "react";
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

const renderElement = (props?: EpisodeCardComponentProps) => {
  const utils = render(
    <EpisodeCardComponent episode={episodeMock} {...props} />
  );
  const query = {
    title: () => screen.queryByText("episode title"),
    description: () => screen.queryByText("description"),
    audio: () => screen.queryByTestId("audio-player"),
  };

  return { ...utils, query };
};

describe("EpisodeCard", () => {
  it("should render the episode title", () => {
    const { query } = renderElement();

    expect(query.title()).not.toBeNull();
  });

  it("should render the episode description", () => {
    const { query } = renderElement();

    expect(query.description()).not.toBeNull();
  });

  it("should render the audio player", () => {
    const { query } = renderElement();

    expect(query.audio()).not.toBeNull();
  });
});
