import { createAsyncThunk } from "@reduxjs/toolkit";
import { setBillboardData } from "../../store/billBoard";
import APIName from "../endPoints";
import { billBoardRepo } from "./billBoardRepo";
import Swal from 'sweetalert2'
export const addBillboard = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.addBillboard,
  async (payload, thunkAPI) => {
    try {
      const reqPayload = new FormData();
      const {data} = await billBoardRepo.addBillboard(payload);
      if (data.data.Responsecode==100) {
        await getSuccessMessage("success","Billboard Added")
        return data;
      }
    } catch (err) {
      await getSuccessMessage("warning","Something went wrong")
      await CheckLogin(err);
    }
    return false;
  }
);
const getSuccessMessage=(type,messga)=>{
  setTimeout(() => {
   Swal.fire({
     icon: type,
     title:messga,
     showConfirmButton: false,
     timer: 2000
   })
  },[]);
 }
export const getBillboard = createAsyncThunk(
  APIName.getBillboard,
  async (payload, thunkAPI) => {
    try {
      const responce = await billBoardRepo.getBillboard(payload);
      if (
        responce.status == 200
      ) {

        thunkAPI.dispatch(setBillboardData(responce.data.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
const CheckLogin = (err) => {
  if (err.response.status == "403") {
    localStorage.removeItem("token");
    const baseUrl = window.location.protocol + "//" + window.location.host;
    getSuccessMessage("warning", "Your Session Expired?");
    setTimeout(() => {
      window.location.href = baseUrl + "/" + "AlumniAdmin/login";
    },1000);
  }
};
export const updateBillboard = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      const response = await billBoardRepo.updateBillboard(payload);
      if (response.status == 200) {
        await getSuccessMessage("success","Billboard Updated")
        return response;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);

      if (response.status == 200) {
        await getSuccessMessage("error","Something went wrong")
        return response;
      }
    }
    return false;
  }
);

export const deleteBillboard = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      const response = await billBoardRepo.updateBillboard(payload);
      if (response.status == 200) {
        await getSuccessMessage("success","Billboard Deleated")
        return response;
      }
    } catch (err) {
      console.log(err);


      await CheckLogin(err);
      if (response.status == 200) {
        await getSuccessMessage("error","Something went wrong")
        return response;
      }
    }
    return false;
  }
);