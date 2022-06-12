import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type KeysState = Array<string>;

const initialState: KeysState = [];

export const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    del: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { add, del } = keysSlice.actions;

export const selectKeys = (state: RootState) => state.keys;

export default keysSlice.reducer;
