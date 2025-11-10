import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme as NavigationDefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { usePreferredTheme } from '@presentation/hooks/usePreferredTheme';
import { store } from '@application/store/store';
import { loadPreferences } from '@application/store/preferencesSlice';
import { loadSignalHistory } from '@application/store/signalsSlice';
import { refreshMarketData } from '@application/store/marketSlice';
import { useAppDispatch } from '@application/hooks';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Bootstrapper>
        <RootLayoutNav />
      </Bootstrapper>
    </Provider>
  );
}

const Bootstrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPreferences())
      .unwrap()
      .catch(() => undefined)
      .finally(() => {
        dispatch(loadSignalHistory());
        dispatch(refreshMarketData());
      });
  }, [dispatch]);

  return <>{children}</>;
};

function RootLayoutNav() {
  const theme = usePreferredTheme();

  const navigationTheme = {
    ...NavigationDefaultTheme,
    dark: theme.name === 'dark',
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: theme.colors.accent,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.divider,
      notification: theme.colors.accent,
    },
  };

  return (
    <StyledThemeProvider theme={theme}>
      <NavigationThemeProvider value={navigationTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </NavigationThemeProvider>
    </StyledThemeProvider>
  );
}
