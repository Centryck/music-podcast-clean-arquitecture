import { renderHook, act } from "@testing-library/react";
import useStoredPodcasts from "./use-stored-podcasts";
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

describe("useStoredPodcasts", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and retrieve podcasts", () => {
    const { result } = renderHook(() => useStoredPodcasts());

    act(() => {
      result.current.getState().setPodcasts([podcastMock], new Date());
    });

    const storedPodcasts = JSON.parse(localStorage.getItem("podcast-storage")!);

    expect(storedPodcasts.state.podcasts.podcast).toEqual([podcastMock]);
  });

  it("should return stored podcasts data if available", () => {
    const storedData = {
      state: {
        podcasts: {
          podcast: [podcastMock],
          date: new Date(),
        },
      },
    };
    localStorage.setItem("podcast-storage", JSON.stringify(storedData));

    const { result } = renderHook(() => useStoredPodcasts());

    expect(result.current.getState().podcasts.podcast).toEqual([podcastMock]);
  });
});
