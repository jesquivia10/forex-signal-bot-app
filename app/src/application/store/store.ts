import { configureStore } from '@reduxjs/toolkit';

import marketReducer from './marketSlice';
import signalsReducer from './signalsSlice';
import preferencesReducer from './preferencesSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    signals: signalsReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
