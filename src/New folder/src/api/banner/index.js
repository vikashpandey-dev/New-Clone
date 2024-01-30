import { createAsyncThunk } from "@reduxjs/toolkit";
import { setBannerData, handletoggle, handletabss } from "../../store/banner";
import APIName from "../endPoints";
import { bannerRepo } from "./bannerRepo";
import Swal from "sweetalert2";
export const addBanner = createAsyncThunk(
  APIName.addBanner,
  async (payload, thunkAPI) => {
    try {
      const { data } = await bannerRepo.addBanner(payload);
      if (data.data.Responsecode == 100) {
        await getSuccessMessage("success", "Banner Added");
        return data;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
      await getSuccessMessage("error", "Something went wrong");
    }
    return false;
  }
);

export const getBanner = createAsyncThunk(
  APIName.getBanner,
  async (payload, thunkAPI) => {
    try {
      let { data } = await bannerRepo.getBanner(payload);
      if (data.data.Responsecode == 100) {
        await thunkAPI.dispatch(setBannerData(data.data.data));
      }
    } catch (err) {
      await CheckLogin(err);
      console.log(err);
    }
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
export const updateBanner = createAsyncThunk(
  APIName.updateBanner,
  async (payload, thunkAPI) => {
    try {
      const reqPayload = new FormData();
      const response = await bannerRepo.updateBanner(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Banner Updated");
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
      await getSuccessMessage("error", "Something went wrong");
    }
    return false;
  }
);
export const deleteBanner = createAsyncThunk(
  APIName.delete,
  async (payload, thunkAPI) => {
    try {
      const payloa = {
        isDeleated: 1,
        id: payload.id,
      };
      const { data } = await bannerRepo.DeleteBanner(payloa);
      if (data.data.Responsecode == 100) {
        return true;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
      await getSuccessMessage("error", "Something went wrong");
    }
    return false;
  }
);
export const handletoggletabse = createAsyncThunk(
  APIName.getBanner,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(handletoggle(payload));
      return true;
    } catch (err) {
      console.log(err);
      await getSuccessMessage("error", "Something went wrong");
    }
    return false;
  }
);

export const handletabs = createAsyncThunk(
  APIName.getBanner,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(handletabss(payload));
      return true;
    } catch (err) {
      console.log(err);
      await getSuccessMessage("error", "Something went wrong");
    }
    return false;
  }
);
