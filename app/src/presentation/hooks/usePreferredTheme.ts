import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

import { useAppSelector } from '@application/hooks';
import { selectThemePreference } from '@application/store/preferencesSlice';
import { darkTheme, lightTheme, themes } from '@presentation/theme';

export const usePreferredTheme = () => {
  const systemColorScheme = useColorScheme();
  const userPreference = useAppSelector(selectThemePreference);

  return useMemo(() => {
    if (userPreference === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themes[userPreference];
  }, [systemColorScheme, userPreference]);
};
