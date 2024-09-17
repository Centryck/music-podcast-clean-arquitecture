import { renderHook, waitFor } from "@testing-library/react";
import { useGetAllPodcasts } from "./use-get-all-podcasts";
import useStoredPodcasts from "../use-storage/use-stored-podcasts";
import { GetAllPodcastsUseCase } from "../../use-case/get-all-podcasts/get-all-podcasts";

jest.mock("../use-storage/use-stored-podcasts");
jest.mock("../../use-case/get-all-podcasts/get-all-podcasts");

describe("useGetAllPodcasts", () => {
  const mockStoredPodcasts = useStoredPodcasts as jest.Mock;
  const mockGetPodcastsUseCase = GetAllPodcastsUseCase.prototype
    .execute as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stored podcasts if valid", () => {
    const savedPodcasts = {
      podcast: [{ id: 1, title: "Podcast 1" }],
      date: new Date(),
    };

    mockStoredPodcasts.mockReturnValue({
      getState: jest.fn(() => ({
        podcasts: savedPodcasts,
        setPodcasts: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useGetAllPodcasts());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.podcasts).toEqual(savedPodcasts.podcast);
    expect(result.current.error).toBeUndefined();
  });

  it("should fetch with current podcasts if elapsedTime is greater than 1 day", async () => {
    const savedPodcasts = {
      podcast: [{ id: 1, title: "Podcast Antiguo" }],
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    };

    const fetchedPodcasts = { podcast: [{ id: 2, title: "Podcast Nuevo" }] };

    mockStoredPodcasts.mockReturnValue({
      getState: jest.fn(() => ({
        podcasts: savedPodcasts,
        setPodcasts: jest.fn(),
      })),
    });

    mockGetPodcastsUseCase.mockResolvedValue(fetchedPodcasts);

    const { result } = renderHook(() => useGetAllPodcasts());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() =>
      expect(result.current.podcasts).toEqual(fetchedPodcasts.podcast)
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should manage errors correctly", async () => {
    const savedPodcasts = {
      podcast: [{ id: 1, title: "Podcast Antiguo" }],
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    };

    mockStoredPodcasts.mockReturnValue({
      getState: jest.fn(() => ({
        podcasts: savedPodcasts,
        setPodcasts: jest.fn(),
      })),
    });

    mockGetPodcastsUseCase.mockRejectedValue(
      new Error("Error al obtener podcasts")
    );

    const { result } = renderHook(() => useGetAllPodcasts());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(result.current.error).toBe(
        "Error on getPodcasts: Error: Error al obtener podcasts"
      )
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.podcasts).toEqual([]);
  });
});
