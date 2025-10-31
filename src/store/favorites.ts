import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Job } from "../types/jobs";

interface FavoritesState {
  favorites: Job[];
  addFavorite: (job: Job) => void;
  removeFavorite: (jobId: string) => void;
  isFavorite: (jobId: string) => boolean;
}

export const useFavoriteStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (job) => {
        const current = get().favorites;
        const exists = current.some((item) => item.id === job.id);
        if (!exists) set({ favorites: [...current, job] });
      },
      removeFavorite: (jobId) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== jobId),
        });
      },
      isFavorite: (jobId) => get().favorites.some((item) => item.id === jobId),
    }),
    {
      name: "favorite-jobs",
    }
  )
);