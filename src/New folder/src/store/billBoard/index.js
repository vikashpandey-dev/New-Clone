import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const billBoardSlice = createSlice({
  name: "billBoard",
  initialState,
  reducers: {
    setBillboardData: (state, { payload }) => {
        state.data = payload;
    },
  },
  extraReducers: {},
});

export const { setBillboardData } = billBoardSlice.actions;

export default billBoardSlice.reducer;
