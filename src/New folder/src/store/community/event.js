import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  registeruser:{},
  EventUsers:[]

};

const communitySlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    setEventData: (state, { payload }) => {
      state.data = payload;
    },
    registerUser: (state, { payload }) => {
      state.registeruser = payload;
    },
    EventUser: (state, { payload }) => {
      console.log(payload,"pppppppppppppppppp")
      state.EventUsers = payload;
    },
  },
  extraReducers: {},
});

export const { setEventData,registerUser,EventUser } = communitySlice.actions;

export default communitySlice.reducer;
