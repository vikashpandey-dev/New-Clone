import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetUsersData,setAllowuser } from "../../store/users";
import APIName from "../endPoints";
import { userRepo } from "./userRepo";

export const GetUSers = createAsyncThunk(
  APIName.GetUSers,
  async (payload, thunkAPI) => {
    try {
      console.log(payload,"skdjslkdjlksdjkl")
      const response = await userRepo.GetUSers(payload);
      console.log(response,"GetUSersGetUSers")

      if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(SetUsersData(response.data.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
export const GetAllowUser = createAsyncThunk(
  APIName.GetUSers,
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const response = await userRepo.GetUSers(payload);
      console.log(response)
      if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(setAllowuser(response.data.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
export const updateUser = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      const response = await userRepo.UpdateUsers(payload);
      if (response.data.Responsecode == 100) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
