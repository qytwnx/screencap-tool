import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppStateProps {
  isdark: boolean | undefined;
  setting: ISetting;
  setIsdark: (data: boolean) => boolean;
  setSetting: (data: ISetting) => ISetting;
}

const defaultSetting: ISetting = {
  videoPath: '',
  fileFormat: 'mp4',
  resolution: '1920x1080',
  frameRate: 30
};

export const useAppStore = create<AppStateProps>()(
  persist(
    (set) => ({
      isdark: undefined,
      setIsdark: (data) => {
        set({ isdark: data });
        return data;
      },
      setting: defaultSetting,
      setSetting: (data) => {
        set({ setting: data });
        return data;
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
