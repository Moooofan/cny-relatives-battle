import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReducedMotionSetting = "auto" | "on";

interface SettingsState {
  sfx: boolean;
  reducedMotion: ReducedMotionSetting;
  setSfx: (v: boolean) => void;
  toggleSfx: () => void;
  setReducedMotion: (v: ReducedMotionSetting) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      sfx: true,
      reducedMotion: "auto",
      setSfx: (v) => set({ sfx: v }),
      toggleSfx: () => set({ sfx: !get().sfx }),
      setReducedMotion: (v) => set({ reducedMotion: v }),
    }),
    {
      name: "dzsg:settings",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
