import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface oneAdDataState {
  value: string;
}

const initialState: oneAdDataState = {
  value: "",
};

export const oneAdSlice = createSlice({
  name: "oneAdData",
  initialState,
  reducers: {
    setOneAdData: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setOneAdData } = oneAdSlice.actions;

export default oneAdSlice.reducer;
