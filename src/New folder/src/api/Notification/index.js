import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEventData } from "../../store/community/event";
import { setPostData } from "../../store/community/post";
import { SetTabs } from "../../store/community/tabs";
import Swal from "sweetalert2";
import APIName from "../endPoints";
import { NotificationRepo } from "./NotificationRepo";
import { Notification } from "../../store/Notification";
export const CreateNotification = createAsyncThunk(
  APIName.CreateNotification,
  async (payload, thunkAPI) => {
    console.log(payload,"payloadpayloadpayload")
    try {
      const response = await NotificationRepo.CreateNotification(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Notification Added");
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
export const AllNotification = createAsyncThunk(
  APIName.AllNotification,
  async (payload, thunkAPI) => {
    try {
    
      const response = await NotificationRepo.AllNotification(payload);
      if (response.status == 200) {
        // await getSuccessMessage("success", "Notification Added");
        thunkAPI.dispatch(Notification(response.data.data.data));
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
export const uploadexcel = createAsyncThunk(
  APIName.uploadexcel,
  async (payload, thunkAPI) => {
    try {
      const response = await NotificationRepo.uploadexcel(payload);
      if (response.status == 200) {
        // await getSuccessMessage("success", "Notification Added");
        // thunkAPI.dispatch(Notification(response.data.data.data));
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
export const DownloadAllNotification = createAsyncThunk(
  APIName.AllNotification,
  async (payload, thunkAPI) => {
    try {
      const response = await NotificationRepo.AllNotification(payload);
      if (response.status == 200) {
        // await getSuccessMessage("success", "Notification Added");
        // thunkAPI.dispatch(Notification(response.data.data.data));
        return response.data.data.data;
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
