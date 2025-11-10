import { useThemeStore } from '@store/themeStore';

export const useTheme = () => {
  const { theme, mode, toggleTheme, setTheme } = useThemeStore();

  return {
    theme,
    mode,
    toggleTheme,
    setTheme,
    isDark: mode === 'dark',
  };
};
