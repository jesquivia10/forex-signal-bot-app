import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@store/themeStore';
import { useSettingsStore } from '@store/settingsStore';
import { useHistoryStore } from '@store/historyStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const { mode, loadTheme } = useThemeStore();
  const { loadSettings } = useSettingsStore();
  const { loadHistory } = useHistoryStore();

  useEffect(() => {
    // Load persisted data on app start
    loadTheme();
    loadSettings();
    loadHistory();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="signal/[id]"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Signal Details',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
