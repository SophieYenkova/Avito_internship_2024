import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SortState {
  value: string;
}

const initialState: SortState = {
  value: 'likes', 
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
