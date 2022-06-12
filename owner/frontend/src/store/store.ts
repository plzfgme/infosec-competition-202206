import { configureStore } from '@reduxjs/toolkit';

import keysReducer from './keys/keysSlice';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
