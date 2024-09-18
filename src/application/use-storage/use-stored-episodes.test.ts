import { renderHook, act } from "@testing-library/react";
import useStoredEpisodes from "./use-stored-episodes";
import { Episode } from "../../domain/entity/episode/episode";

const FIXED_DATE = new Date("2023-12-30T00:00:00Z");

const episodeMock: Episode = {
  id: 1,
  name: "Test Episode",
  description: "Test Description",
  trackTimeMillis: 1200,
  collectionId: 1,
  collectionName: "Test Collection",
  releaseDate: FIXED_DATE,
  episodeUrl: "url",
};

const podcastId = 1;

describe("useStoredEpisodes", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and retrieve episodes", () => {
    const { result } = renderHook(() => useStoredEpisodes(podcastId));

    act(() => {
      result.current.getState().setEpisodes([episodeMock], new Date());
    });

    const storedEpisodes = JSON.parse(
      localStorage.getItem(`${podcastId}-episodes-store`)!
    );

    expect(storedEpisodes.state.episode.episodes).toEqual([
      {
        id: 1,
        name: "Test Episode",
        description: "Test Description",
        trackTimeMillis: 1200,
        collectionId: 1,
        collectionName: "Test Collection",
        releaseDate: "2023-12-30T00:00:00.000Z",
        episodeUrl: "url",
      },
    ]);
  });

  it("should return stored episodes data if available", () => {
    const storedData = {
      state: {
        episode: {
          episodes: [episodeMock],
          date: new Date(),
        },
      },
    };
    localStorage.setItem(
      `${podcastId}-episodes-store`,
      JSON.stringify(storedData)
    );

    const { result } = renderHook(() => useStoredEpisodes(podcastId));

    expect(result.current.getState().episode.episodes).toEqual([
      {
        id: 1,
        name: "Test Episode",
        description: "Test Description",
        trackTimeMillis: 1200,
        collectionId: 1,
        collectionName: "Test Collection",
        releaseDate: "2023-12-30T00:00:00.000Z",
        episodeUrl: "url",
      },
    ]);
  });
});
