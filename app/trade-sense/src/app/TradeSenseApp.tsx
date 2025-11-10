import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { StatusBar, type StatusBarStyle } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';

import { AppNavigator } from './navigation/AppNavigator';
import { darkNavigationTheme, darkPaperTheme, lightNavigationTheme, lightPaperTheme } from '../presentation/theme/paperTheme';
import { ServicesProvider } from './providers/ServiceProvider';
import { AppBootstrap } from './AppBootstrap';

import '../presentation/i18n/config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 60_000,
    },
  },
});

const { LightTheme: adaptedLightTheme, DarkTheme: adaptedDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

enableScreens();

export function TradeSenseApp() {
  const colorScheme = useColorScheme();

  const { paperTheme, navigationTheme, statusBarStyle } = useMemo(() => {
    const isDark = colorScheme === 'dark';
    const statusBarStyle: StatusBarStyle = isDark ? 'light' : 'dark';
    return {
      paperTheme: isDark ? darkPaperTheme : lightPaperTheme,
      navigationTheme: {
        ...(isDark ? adaptedDarkTheme : adaptedLightTheme),
        colors: {
          ...(isDark ? adaptedDarkTheme.colors : adaptedLightTheme.colors),
          background: isDark ? darkNavigationTheme.colors.background : lightNavigationTheme.colors.background,
          card: isDark ? darkNavigationTheme.colors.card : lightNavigationTheme.colors.card,
          primary: isDark ? darkNavigationTheme.colors.primary : lightNavigationTheme.colors.primary,
          text: isDark ? darkNavigationTheme.colors.text : lightNavigationTheme.colors.text,
          border: isDark ? darkNavigationTheme.colors.border : lightNavigationTheme.colors.border,
        },
      },
      statusBarStyle,
    };
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ServicesProvider>
          <AppBootstrap>
            <PaperProvider theme={paperTheme}>
              <SafeAreaProvider>
                <NavigationContainer theme={navigationTheme}>
                  <StatusBar style={statusBarStyle} />
                  <AppNavigator />
                </NavigationContainer>
              </SafeAreaProvider>
            </PaperProvider>
          </AppBootstrap>
        </ServicesProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
