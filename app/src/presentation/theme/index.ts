export interface TradeSenseTheme {
  name: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    card: string;
    text: string;
    mutedText: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    divider: string;
  };
}

export const lightTheme: TradeSenseTheme = {
  name: 'light',
  colors: {
    background: '#F4F6FA',
    surface: '#FFFFFF',
    card: '#1B263B',
    text: '#1C1C1E',
    mutedText: '#6B7280',
    accent: '#2563EB',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    divider: '#E5E7EB',
  },
};

export const darkTheme: TradeSenseTheme = {
  name: 'dark',
  colors: {
    background: '#0B1120',
    surface: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    mutedText: '#9CA3AF',
    accent: '#3B82F6',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    divider: '#1F2937',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
