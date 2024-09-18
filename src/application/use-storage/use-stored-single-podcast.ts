import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Podcast,
  StoredSinglePodcast,
} from "../../domain/entity/podcast/podcast";

interface UseStoredSinglePodcastInterface {
  podcast: StoredSinglePodcast;
  setPodcast: (newPodcast: Podcast, date: Date) => void;
}

const useStoredSinglePodcast = (podcastId: string) =>
  create<UseStoredSinglePodcastInterface>()(
    persist(
      (set) => ({
        podcast: {} as StoredSinglePodcast,
        setPodcast: (newPodcast: Podcast, date: Date) =>
          set({
            podcast: {
              podcast: newPodcast,
              date: date,
            },
          }),
      }),
      {
        name: `${podcastId}-podcast-storage`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

export default useStoredSinglePodcast;
