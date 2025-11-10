import { create } from 'zustand';
import { Timeframe, ConfidenceLevel } from '@types/signal.types';
import { StorageService, STORAGE_KEYS } from '@services/storage/storage';
import { APP_CONFIG } from '@config/api.config';

export interface UserSettings {
  // Notification settings
  notificationsEnabled: boolean;
  updateInterval: number; // in minutes
  minConfidenceLevel: ConfidenceLevel;
  
  // Indicator settings
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  bbPeriod: number;
  bbStdDev: number;
  smaPeriods: [number, number];
  emaPeriods: [number, number];
  
  // Display settings
  defaultTimeframe: Timeframe;
  favoritePairs: string[];
  
  // App settings
  onboardingCompleted: boolean;
}

interface SettingsState extends UserSettings {
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetToDefaults: () => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

const defaultSettings: UserSettings = {
  notificationsEnabled: true,
  updateInterval: APP_CONFIG.DEFAULT_UPDATE_INTERVAL,
  minConfidenceLevel: 'MEDIUM',
  rsiPeriod: APP_CONFIG.DEFAULT_RSI_PERIOD,
  rsiOverbought: APP_CONFIG.DEFAULT_RSI_OVERBOUGHT,
  rsiOversold: APP_CONFIG.DEFAULT_RSI_OVERSOLD,
  bbPeriod: APP_CONFIG.DEFAULT_BB_PERIOD,
  bbStdDev: APP_CONFIG.DEFAULT_BB_STD_DEV,
  smaPeriods: APP_CONFIG.DEFAULT_SMA_PERIODS,
  emaPeriods: APP_CONFIG.DEFAULT_EMA_PERIODS,
  defaultTimeframe: APP_CONFIG.DEFAULT_TIMEFRAME,
  favoritePairs: ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF'],
  onboardingCompleted: false,
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,

  updateSettings: (settings: Partial<UserSettings>) => {
    set(settings);
    get().saveSettings();
  },

  resetToDefaults: () => {
    set(defaultSettings);
    get().saveSettings();
  },

  loadSettings: async () => {
    const saved = await StorageService.getItem<UserSettings>(STORAGE_KEYS.SETTINGS);
    if (saved) {
      set(saved);
    }
  },

  saveSettings: async () => {
    const { updateSettings, resetToDefaults, loadSettings, saveSettings, ...settings } = get();
    await StorageService.setItem(STORAGE_KEYS.SETTINGS, settings);
  },
}));
