import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LIVES } from "@/content/lives";

interface LifeState {
  lifeId: string | null;
  setLife: (id: string) => void;
  randomLife: () => string;
  clearLife: () => void;
}

export const useLifeStore = create<LifeState>()(
  persist(
    (set) => ({
      lifeId: null,
      setLife: (id) => set({ lifeId: id }),
      randomLife: () => {
        const life = LIVES[Math.floor(Math.random() * LIVES.length)];
        set({ lifeId: life.id });
        return life.id;
      },
      clearLife: () => set({ lifeId: null }),
    }),
    {
      name: "dzsg:life",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
