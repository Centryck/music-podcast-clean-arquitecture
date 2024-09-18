import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Episode,
  StoredSingleEpisode,
} from "../../domain/entity/episode/episode";

interface UseStoredEpisodesInterface {
  episode: StoredSingleEpisode;
  setEpisode: (newEpisode: Episode, date: Date) => void;
}

const useStoredSingleEpisode = (podcastId: number, episodeId: number) =>
  create<UseStoredEpisodesInterface>()(
    persist(
      (set) => ({
        episode: {} as StoredSingleEpisode,
        setEpisode: (newEpisode: Episode, date: Date) =>
          set({
            episode: {
              episode: newEpisode,
              date: date,
            },
          }),
      }),
      {
        name: `${podcastId}-${episodeId}-episodes-store`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

export default useStoredSingleEpisode;
