import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  toggletabs: false,
  settabs: 0,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBannerData: (state, { payload }) => {
      state.data = payload;
    },
    handletoggle: (stata, { payload }) => {
      stata.toggletabs = payload.toggletabs;
    },
    handletabss: (state, { payload }) => {
      state.settabs = payload.tabs;
    },
  },
  extraReducers: {},
});

export const { setBannerData, handletoggle, handletabss } = bannerSlice.actions;

export default bannerSlice.reducer;
