import { useEffect, useState } from "react";
import { Episode } from "../../domain/entity/episode/episode";
import { GetSingleEpisodeUseCase } from "../../use-case/get-single-episode/get-single-episode";
import { EpisodeRepositoryImpl } from "../../data/repository/episode-repository-impl";
import useStoredEpisodes from "../use-storage/use-stored-episodes";

const episodeRepositoryImpl = new EpisodeRepositoryImpl();
const getSingleEpisodeUseCase = new GetSingleEpisodeUseCase(
  episodeRepositoryImpl
);

interface UseGetSingleEpisodeReturn {
  episode: Episode | undefined;
  isLoading: boolean;
  error?: string;
}

export const useGetSingleEpisode = (
  podcastId: number,
  episodeId: number
): UseGetSingleEpisodeReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);

  const storedEpisodes = useStoredEpisodes(podcastId);
  const savedEpisodes = storedEpisodes.getState().episode;
  const setEpisodesToStore = storedEpisodes.getState().setEpisodes;

  useEffect(() => {
    const foundEpisode = savedEpisodes?.episodes.find(
      (ep) => ep.id === episodeId
    );
    if (foundEpisode) {
      setEpisode(foundEpisode);
      setIsLoading(false);
      return;
    }

    const fetchEpisode = async () => {
      try {
        const data = await getSingleEpisodeUseCase.execute({
          podcastId,
          episodeId,
        });
        setEpisode(data[0]);
        const updatedEpisodes = [...(savedEpisodes?.episodes || []), data[0]];
        setEpisodesToStore(updatedEpisodes, new Date());
      } catch (err) {
        setError(`Error fetching episode: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastId, episodeId]);

  return {
    episode,
    isLoading,
    error,
  };
};
