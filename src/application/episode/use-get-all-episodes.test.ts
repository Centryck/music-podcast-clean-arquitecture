import { renderHook, waitFor } from "@testing-library/react";
import { useGetAllEpisodes } from "./use-get-all-episodes";
import useStoredEpisodes from "../use-storage/use-stored-episodes";
import { GetAllEpisodesUseCase } from "../../use-case/get-all-episodes/get-all-episodes";

jest.mock("../use-storage/use-stored-episodes");
jest.mock("../../use-case/get-all-episodes/get-all-episodes");

const OLD_DATE = new Date("2023-12-30T00:00:00Z");

describe("useGetAllEpisodes", () => {
  const mockStoredEpisodes = useStoredEpisodes as jest.Mock;
  const mockGetEpisodesUseCase = GetAllEpisodesUseCase.prototype
    .execute as jest.Mock;

  const podcastId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stored data if valid", async () => {
    const savedEpisodes = {
      episodes: [{ id: 1, title: "Episodio 1" }],
      date: new Date(),
    };

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useGetAllEpisodes(podcastId));

    expect(result.current.episodes).toEqual(savedEpisodes.episodes);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should fetch episodes if timeElapsed is greater than 1 day", async () => {
    const savedEpisodes = {
      episodes: [{ id: 1, title: "Episodio Antiguo" }],
      date: OLD_DATE,
    };

    const fetchedEpisodes = [{ id: 2, title: "Episodio Nuevo" }];

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: jest.fn(),
      })),
    });

    mockGetEpisodesUseCase.mockResolvedValue(fetchedEpisodes);

    const { result } = renderHook(() => useGetAllEpisodes(podcastId));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.episodes).toEqual(fetchedEpisodes);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should manage errors correctly", async () => {
    const savedEpisodes = {
      episodes: [{ id: 1, title: "Episodio Antiguo" }],
      date: OLD_DATE,
    };

    mockStoredEpisodes.mockReturnValue({
      getState: jest.fn(() => ({
        episode: savedEpisodes,
        setEpisodes: jest.fn(),
      })),
    });

    mockGetEpisodesUseCase.mockRejectedValue(
      new Error("Error al obtener episodios")
    );

    const { result } = renderHook(() => useGetAllEpisodes(podcastId));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(result.current.error).toBe(
        "Error on getEpisodes: Error: Error al obtener episodios"
      )
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.episodes).toEqual([]);
  });
});
