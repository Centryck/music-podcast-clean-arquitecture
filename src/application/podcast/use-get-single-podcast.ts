import { useEffect, useState } from "react";
import { GetSinglePodcastUseCase } from "../../use-case/get-single-podcast/get-single-podcast";
import { PodcastRepositoryImpl } from "../../data/repository/podcast-repository-impl";
import { Podcast } from "../../domain/entity/podcast/podcast";
import useStoredSinglePodcast from "../use-storage/use-stored-single-podcast";

const podcastRepositoryImpl = new PodcastRepositoryImpl();
const getSinglePodcastUseCase = new GetSinglePodcastUseCase(
  podcastRepositoryImpl
);

interface UseSinglePodcastReturn {
  podcast: Podcast | undefined;
  isLoading: boolean;
  error?: string;
}

export const useGetSinglePodcast = (
  podcastId: string
): UseSinglePodcastReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const storedPodcasts = useStoredSinglePodcast(podcastId);
  const savedPodcast = storedPodcasts.getState().podcast;
  const setPodcastToStore = storedPodcasts.getState().setPodcast;

  useEffect(() => {
    if (!podcastId) {
      setIsLoading(false);
      return;
    }

    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const timeElapsed =
      new Date().getTime() - new Date(savedPodcast?.date).getTime();

    if (savedPodcast && timeElapsed < dayInMilliseconds) {
      setPodcast(savedPodcast.podcast);
      setIsLoading(false);
    } else {
      const fetchPodcast = async () => {
        try {
          const data = await getSinglePodcastUseCase.execute({ id: podcastId });
          setPodcast(data[0]);
          setPodcastToStore(data[0], new Date());
        } catch (err) {
          setError("Error fetching podcast: " + err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPodcast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastId]);

  return {
    podcast,
    isLoading,
    error,
  };
};
