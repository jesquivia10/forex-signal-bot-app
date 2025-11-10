import { create } from 'zustand';
import { ThemeMode, Theme, darkTheme, lightTheme } from '@config/theme.config';
import { StorageService, STORAGE_KEYS } from '@services/storage/storage';

interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'dark',
  theme: darkTheme,

  toggleTheme: () => {
    const newMode = get().mode === 'dark' ? 'light' : 'dark';
    const newTheme = newMode === 'dark' ? darkTheme : lightTheme;
    set({ mode: newMode, theme: newTheme });
    StorageService.setItem(STORAGE_KEYS.THEME, newMode);
  },

  setTheme: (mode: ThemeMode) => {
    const newTheme = mode === 'dark' ? darkTheme : lightTheme;
    set({ mode, theme: newTheme });
    StorageService.setItem(STORAGE_KEYS.THEME, mode);
  },

  loadTheme: async () => {
    const savedMode = await StorageService.getItem<ThemeMode>(STORAGE_KEYS.THEME);
    if (savedMode) {
      get().setTheme(savedMode);
    }
  },
}));
