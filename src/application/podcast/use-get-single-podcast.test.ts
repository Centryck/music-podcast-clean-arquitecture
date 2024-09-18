import { renderHook, waitFor } from "@testing-library/react";
import { useGetSinglePodcast } from "./use-get-single-podcast";
import useStoredSinglePodcast from "../use-storage/use-stored-single-podcast";
import { GetSinglePodcastUseCase } from "../../use-case/get-single-podcast/get-single-podcast";

jest.mock("../use-storage/use-stored-single-podcast");
jest.mock("../../use-case/get-single-podcast/get-single-podcast");

describe("useGetSinglePodcast", () => {
  const mockStoredSinglePodcast = useStoredSinglePodcast as jest.Mock;
  const mockGetSinglePodcastUseCase = GetSinglePodcastUseCase.prototype
    .execute as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stored podcast if valid", () => {
    const savedPodcast = {
      podcast: { id: "1", title: "Podcast 1" },
      date: new Date(),
    };

    mockStoredSinglePodcast.mockReturnValue({
      getState: jest.fn(() => ({
        podcast: savedPodcast,
        setPodcast: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useGetSinglePodcast("1"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.podcast).toEqual(savedPodcast.podcast);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle missing podcastId", () => {
    const savedPodcast = {
      podcast: { id: "1", title: "Some Podcast" },
      date: new Date(),
    };

    mockStoredSinglePodcast.mockReturnValue({
      getState: jest.fn(() => ({
        podcast: savedPodcast,
        setPodcast: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useGetSinglePodcast(""));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.podcast).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should fetch podcast if elapsedTime is greater than 1 day", async () => {
    const savedPodcast = {
      podcast: { id: "1", title: "Old Podcast" },
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    };

    const fetchedPodcast = { id: "2", title: "New Podcast" };

    mockStoredSinglePodcast.mockReturnValue({
      getState: jest.fn(() => ({
        podcast: savedPodcast,
        setPodcast: jest.fn(),
      })),
    });

    mockGetSinglePodcastUseCase.mockResolvedValue([fetchedPodcast]);

    const { result } = renderHook(() => useGetSinglePodcast("2"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.podcast).toEqual(fetchedPodcast));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle errors correctly", async () => {
    const savedPodcast = {
      podcast: { id: "1", title: "Old Podcast" },
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    };

    mockStoredSinglePodcast.mockReturnValue({
      getState: jest.fn(() => ({
        podcast: savedPodcast,
        setPodcast: jest.fn(),
      })),
    });

    mockGetSinglePodcastUseCase.mockRejectedValue(
      new Error("Error fetching podcast")
    );

    const { result } = renderHook(() => useGetSinglePodcast("1"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(result.current.error).toBe(
        "Error fetching podcast: Error: Error fetching podcast"
      )
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.podcast).toBeUndefined();
  });
});
