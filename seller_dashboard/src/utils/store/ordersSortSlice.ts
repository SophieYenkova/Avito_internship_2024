import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  value: string;
}

const initialState: SortState = {
  value: 'total', 
};

const sortOrdersSlice = createSlice({
  name: 'sortOrders',
  initialState,
  reducers: {
    sortOrders(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { sortOrders } = sortOrdersSlice.actions;
export default sortOrdersSlice.reducer;
