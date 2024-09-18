import { renderHook, waitFor } from "@testing-library/react";
import { useGetSingleEpisode } from "./use-get-single-episode";
import useStoredEpisodes from "../use-storage/use-stored-episodes";
import { GetSingleEpisodeUseCase } from "../../use-case/get-single-episode/get-single-episode";
import { Episode } from "../../domain/entity/episode/episode";

jest.mock("../use-storage/use-stored-episodes");
jest.mock("../../use-case/get-single-episode/get-single-episode");

const FIXED_DATE = new Date("2023-12-30T00:00:00Z");

describe("useGetSingleEpisode", () => {
  const mockStoredEpisodes = useStoredEpisodes as jest.Mock;
  const mockGetEpisodeUseCase = GetSingleEpisodeUseCase.prototype
    .execute as jest.Mock;

  const podcastId = 1;
  const episodeId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the episode from stored data if valid", () => {
    const savedEpisodes = {
      episodes: [{ id: episodeId, name: "Episodio 1" }] as Episode[],
      date: new Date(),
    };

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: jest.fn(),
      })),
    });

    const { result } = renderHook(() =>
      useGetSingleEpisode(podcastId, episodeId)
    );

    expect(result.current.episode).toEqual(savedEpisodes.episodes[0]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should fetch and update episode if not found in stored data", async () => {
    const savedEpisodes = {
      episodes: [] as Episode[],
      date: FIXED_DATE,
    };

    const fetchedEpisode = { id: episodeId, name: "Episodio Nuevo" } as Episode;
    const setEpisodesMock = jest.fn();

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: setEpisodesMock,
      })),
    });

    mockGetEpisodeUseCase.mockResolvedValue([fetchedEpisode]);

    const { result } = renderHook(() =>
      useGetSingleEpisode(podcastId, episodeId)
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.episode).toEqual(fetchedEpisode);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();

    expect(setEpisodesMock).toHaveBeenCalledWith(
      [fetchedEpisode],
      expect.any(Date)
    );
  });

  it("should handle errors correctly", async () => {
    const savedEpisodes = {
      episodes: [] as Episode[],
      date: FIXED_DATE,
    };

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: jest.fn(),
      })),
    });

    mockGetEpisodeUseCase.mockRejectedValue(
      new Error("Error al obtener episodio")
    );

    const { result } = renderHook(() =>
      useGetSingleEpisode(podcastId, episodeId)
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(result.current.error).toBe(
        "Error fetching episode: Error: Error al obtener episodio"
      )
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.episode).toBeUndefined();
  });
});
