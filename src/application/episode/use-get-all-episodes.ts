import { useState, useEffect } from "react";
import { Episode, StoredEpisodes } from "../../domain/entity/episode/episode";
import { GetAllEpisodesUseCase } from "../../use-case/get-all-episodes/get-all-episodes";
import { EpisodeRepositoryImpl } from "../../data/repository/episode-repository-impl";
import useStoredEpisodes from "../use-storage/use-stored-episodes";

const episodeRepositoryImpl = new EpisodeRepositoryImpl();
const getEpisodesUseCase = new GetAllEpisodesUseCase(episodeRepositoryImpl);

interface UseGetAllEpisodesReturn {
  episodes: Episode[];
  isLoading: boolean;
  error?: string;
}

export const useGetAllEpisodes = (
  podcastId: number
): UseGetAllEpisodesReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const storedEpisodes = useStoredEpisodes(podcastId);
  const savedEpisodes: StoredEpisodes = storedEpisodes.getState().episode;

  const setEpisodesToStore = storedEpisodes.getState().setEpisodes;

  useEffect(() => {
    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    const timeElapsed =
      new Date().getTime() - new Date(savedEpisodes?.date).getTime();

    if (timeElapsed <= dayInMilliseconds) {
      setEpisodes(savedEpisodes.episodes);
      setIsLoading(false);
    } else {
      const getEpisodes = async () => {
        getEpisodesUseCase
          .execute({ podcastId })
          ?.then((data) => {
            data.shift();
            setEpisodes(data);
            setEpisodesToStore(data, new Date());
            setIsLoading(false);
          })
          .catch((err) => {
            setError("Error on getEpisodes: " + err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      getEpisodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    episodes,
    isLoading,
    error,
  };
};
