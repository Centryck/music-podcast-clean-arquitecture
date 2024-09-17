import { useEffect, useState } from "react";
import useStoredPodcasts from "../use-storage/use-stored-podcasts";
import { GetAllPodcastsUseCase } from "../../use-case/get-all-podcasts/get-all-podcasts";
import { PodcastRepositoryImpl } from "../../data/repository/podcast-repository-impl";
import { Podcast, StoredPodcasts } from "../../domain/entity/podcast/podcast";

const podcastRepositoryImpl = new PodcastRepositoryImpl();
const getPodcastsUseCase = new GetAllPodcastsUseCase(podcastRepositoryImpl);

interface UseGetAllPodcastsReturn {
  podcasts: Podcast[];
  isLoading: boolean;
  error?: string;
}

export const useGetAllPodcasts = (): UseGetAllPodcastsReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const savedPodcasts: StoredPodcasts = useStoredPodcasts().getState().podcasts;
  const setPodcastsToStore = useStoredPodcasts().getState().setPodcasts;

  useEffect(() => {
    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    const timeElapsed =
      new Date().getTime() - new Date(savedPodcasts?.date).getTime();

    if (timeElapsed <= dayInMilliseconds) {
      setPodcasts(savedPodcasts.podcast);
      setIsLoading(false);
    } else {
      const getPodcasts = async () => {
        getPodcastsUseCase
          .execute()
          ?.then((data) => {
            setPodcasts(data.podcast);
            setPodcastsToStore(data.podcast, new Date());
            setIsLoading(false);
          })
          .catch((err) => {
            setError("Error on getPodcasts: " + err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      getPodcasts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    podcasts,
    isLoading,
    error,
  };
};
