import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Podcast, StoredPodcasts } from "../../domain/entity/podcast/podcast";

interface UseStoredPodcastsInterface {
  podcasts: StoredPodcasts;
  setPodcasts: (newPodcasts: Podcast[], date: Date) => void;
}

const useStoredPodcasts = () =>
  create<UseStoredPodcastsInterface>()(
    persist(
      (set) => ({
        podcasts: {} as StoredPodcasts,
        setPodcasts: (newPodcasts: Podcast[], date: Date) =>
          set({
            podcasts: {
              podcast: newPodcasts,
              date: date,
            },
          }),
      }),
      {
        name: "podcast-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

export default useStoredPodcasts;
