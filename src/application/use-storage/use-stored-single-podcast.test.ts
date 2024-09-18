import { renderHook, act } from "@testing-library/react";
import useStoredSinglePodcast from "./use-stored-single-podcast";
import { Podcast } from "../../domain/entity/podcast/podcast";

const podcastMock: Podcast = {
  id: "1",
  name: "Test Podcast",
  image: [
    {
      label: "img",
      attributes: { height: "2" },
    },
  ],
  summary: "Test Summary",
  rights: "Test Rights",
  title: "Test Title",
  artist: "Test Artist",
};

describe("useStoredSinglePodcast", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and retrieve podcasts with dynamic ID", () => {
    const podcastId = "1";
    const { result } = renderHook(() => useStoredSinglePodcast(podcastId));

    act(() => {
      result.current.getState().setPodcast(podcastMock, new Date());
    });

    const storedPodcast = JSON.parse(
      localStorage.getItem(`${podcastId}-podcast-storage`)!
    );

    expect(storedPodcast.state.podcast.podcast).toEqual(podcastMock);
  });

  it("should return stored podcast data if available", () => {
    const podcastId = "1";
    const storedData = {
      state: {
        podcast: {
          podcast: podcastMock,
          date: new Date(),
        },
      },
    };
    localStorage.setItem(
      `${podcastId}-podcast-storage`,
      JSON.stringify(storedData)
    );

    const { result } = renderHook(() => useStoredSinglePodcast(podcastId));

    expect(result.current.getState().podcast.podcast).toEqual(podcastMock);
  });
});
