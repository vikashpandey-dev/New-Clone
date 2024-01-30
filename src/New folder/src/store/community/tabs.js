import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ActiveTabs:"",
};

const communitySlice = createSlice({
  name: "Tabs",
  initialState,
  reducers: {
    SetTabs: (state, { payload }) => {
      state.ActiveTabs = payload;
    },
  },
  extraReducers: {},
});

export const { SetTabs } = communitySlice.actions;

export default communitySlice.reducer;
