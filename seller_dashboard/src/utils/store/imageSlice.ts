import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface imageState {
  value: string;
}

const initialState: imageState = {
  value: '', 
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setImage } = imageSlice.actions;

export default imageSlice.reducer;
