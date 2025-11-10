import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkThemeBase,
  DefaultTheme as NavigationLightThemeBase,
  type Theme as NavigationTheme,
} from '@react-navigation/native';

const commonColors = {
  success: '#2BAE66',
  warning: '#FBC02D',
  error: '#E53935',
};

export const lightPaperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#335DFF',
    secondary: '#00BFA6',
    tertiary: '#FF7043',
    background: '#F6F8FB',
    surface: '#FFFFFF',
    surfaceVariant: '#E1E8F5',
    onSurface: '#0F172A',
    onBackground: '#1E293B',
    outline: '#94A3B8',
    ...commonColors,
  },
};

export const darkPaperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#84A9FF',
    secondary: '#4DDAC6',
    tertiary: '#FF8A65',
    background: '#0B1121',
    surface: '#111827',
    surfaceVariant: '#1F2937',
    onSurface: '#E2E8F0',
    onBackground: '#F1F5F9',
    outline: '#475569',
    ...commonColors,
  },
};

export const lightNavigationTheme: NavigationTheme = {
  ...NavigationLightThemeBase,
  colors: {
    ...NavigationLightThemeBase.colors,
    primary: lightPaperTheme.colors.primary,
    background: lightPaperTheme.colors.background,
    card: lightPaperTheme.colors.surface,
    text: lightPaperTheme.colors.onSurface,
    border: lightPaperTheme.colors.outline,
    notification: lightPaperTheme.colors.tertiary,
  },
};

export const darkNavigationTheme: NavigationTheme = {
  ...NavigationDarkThemeBase,
  colors: {
    ...NavigationDarkThemeBase.colors,
    primary: darkPaperTheme.colors.primary,
    background: darkPaperTheme.colors.background,
    card: darkPaperTheme.colors.surface,
    text: darkPaperTheme.colors.onSurface,
    border: darkPaperTheme.colors.outline,
    notification: darkPaperTheme.colors.tertiary,
  },
};

export type TradeSenseTheme = typeof lightPaperTheme;
