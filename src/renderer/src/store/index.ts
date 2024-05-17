import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppStateProps {
  isdark: boolean;
  setIsdark: (data: boolean) => boolean;
}

export const useAppStore = create<AppStateProps>()(
  persist(
    (set) => ({
      isdark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      setIsdark: (data) => {
        set({ isdark: data });
        return data;
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
