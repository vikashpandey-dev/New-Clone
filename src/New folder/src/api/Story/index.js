import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEventData } from "../../store/community/event";
import { setPostData } from "../../store/community/post";
import { SetTabs } from "../../store/community/tabs";
import { SetstoryData } from "../../store/Story";
import Swal from "sweetalert2";
import APIName from "../endPoints";
import { StoryRepo } from "./StoryRepo";
export const CreateStory = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.CreateStory,
  async (payload, thunkAPI) => {
    try {
      const response = await StoryRepo.CreateStory(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Story Added");
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);

export const GetStory = createAsyncThunk(
  APIName.GetStory,
  async (payload, thunkAPI) => {
    try {
      const response = await StoryRepo.GetStory(payload);
      if (response.status == 200) {
        thunkAPI.dispatch(SetstoryData(response.data.data.data));
        // await getSuccessMessage("success", "Story Added");
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
export const DeleteStory = createAsyncThunk(
  APIName.DeleteStory,
  async (payload, thunkAPI) => {
    try {
      const response = await StoryRepo.DeleteStory(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Story Deleated");
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
const getSuccessMessage = (type, messga) => {
  setTimeout(() => {
    Swal.fire({
      icon: type,
      title: messga,
      showConfirmButton: false,
      timer: 2000,
    });
  }, []);
};
const CheckLogin = (err) => {
  if (err.response.status == "403") {
    localStorage.removeItem("token");
    const baseUrl = window.location.protocol + "//" + window.location.host;
    getSuccessMessage("warning", "Your Session Expired?");
    setTimeout(() => {
      window.location.href = baseUrl + "/" + "AlumniAdmin/login";
    }, 1000);
  }
};
