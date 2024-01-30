import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  allowuser:[]
 
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    SetUsersData: (state, { payload }) => {
      state.data = payload;
    },
    setAllowuser: (state, { payload }) => {
      state.allowuser = payload;
    },
  },
  extraReducers: {},
});

export const { SetUsersData,setAllowuser } = UsersSlice.actions;

export default UsersSlice.reducer;
