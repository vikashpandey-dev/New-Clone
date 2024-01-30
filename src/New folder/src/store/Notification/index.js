import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  toggletabs: false,
  settabs:0,
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    Notification: (state, { payload })   => {
      state.data = payload;
    }
  },
  extraReducers: {},
});

export const { Notification} = NotificationSlice.actions;

export default NotificationSlice.reducer;
