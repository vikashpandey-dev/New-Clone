import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  toggletabs: false,
  IsPage:null
};

const authSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setUSerData: (state, { payload }) => {
      state.data = payload;
    },
    setPage: (state, { payload }) => {
      state.IsPage = payload;
    },
  },
  extraReducers: {},
});

export const { setUSerData,setPage } = authSlice.actions;

export default authSlice.reducer;
