import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_USER_PREFERENCES, UserPreferences } from '@domain/models/preferences';
import { PreferencesRepository } from '@data/repositories/preferencesRepository';
import { RootState } from './store';

const preferencesRepository = new PreferencesRepository();

interface PreferencesState {
  current: UserPreferences;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: PreferencesState = {
  current: DEFAULT_USER_PREFERENCES,
  status: 'idle',
};

export const loadPreferences = createAsyncThunk('preferences/load', async () => {
  const stored = await preferencesRepository.loadPreferences();
  return stored;
});

export const persistPreferences = createAsyncThunk(
  'preferences/persist',
  async (preferences: UserPreferences) => {
    await preferencesRepository.persistPreferences(preferences);
    return preferences;
  },
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setThemePreference(state, action: PayloadAction<UserPreferences['theme']>) {
      state.current.theme = action.payload;
    },
    updateIndicatorPreferences(
      state,
      action: PayloadAction<Partial<UserPreferences['indicatorPreferences']>>,
    ) {
      state.current.indicatorPreferences = {
        ...state.current.indicatorPreferences,
        ...action.payload,
      };
    },
    updateNotificationPreferences(
      state,
      action: PayloadAction<Partial<UserPreferences['notifications']>>,
    ) {
      state.current.notifications = {
        ...state.current.notifications,
        ...action.payload,
      };
    },
    updateMonitoredPairs(state, action: PayloadAction<UserPreferences['monitoredPairs']>) {
      state.current.monitoredPairs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPreferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(loadPreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'No se pudieron cargar las preferencias';
      })
      .addCase(persistPreferences.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const {
  setThemePreference,
  updateIndicatorPreferences,
  updateNotificationPreferences,
  updateMonitoredPairs,
} = preferencesSlice.actions;

export const selectPreferences = (state: RootState) => state.preferences.current;
export const selectThemePreference = (state: RootState) => state.preferences.current.theme;

export default preferencesSlice.reducer;
