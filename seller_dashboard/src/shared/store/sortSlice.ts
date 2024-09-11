import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  value: string;
}

const initialState: SortState = {
  value: 'likes', // По умолчанию сортировка по лайкам
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
