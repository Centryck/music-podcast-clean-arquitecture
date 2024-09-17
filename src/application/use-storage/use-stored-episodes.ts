import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Episode, StoredEpisodes } from "../../domain/entity/episode/episode";

interface UseStoredEpisodesInterface {
  episode: StoredEpisodes;
  setEpisodes: (newEpisodes: Episode[], date: Date) => void;
}

const useStoredEpisodes = (podcastId: number) =>
  create<UseStoredEpisodesInterface>()(
    persist(
      (set) => ({
        episode: {} as StoredEpisodes,
        setEpisodes: (newEpisodes: Episode[], date: Date) =>
          set({
            episode: {
              episodes: newEpisodes,
              date: date,
            },
          }),
      }),
      {
        name: `${podcastId}-episodes-store`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

export default useStoredEpisodes;
