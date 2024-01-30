import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  PostLike:[]
};

const communitySlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setPostData: (state, { payload }) => {
      state.data = payload;
    },
    PostLikeUsers: (state, { payload }) => {
      console.log(payload,"payloadpayloadpayload")
      state.PostLike = payload;
    },
  },
  extraReducers: {},
});
export const { setPostData,PostLikeUsers } = communitySlice.actions;

export default communitySlice.reducer;
