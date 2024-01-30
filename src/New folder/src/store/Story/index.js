import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const StorySlice = createSlice({
  name: "billBoard",
  initialState,
  reducers: {
    SetstoryData: (state, { payload }) => {
        state.data = payload;
    },
  },
  extraReducers: {},
});

export const { SetstoryData } = StorySlice.actions;

export default StorySlice.reducer;
