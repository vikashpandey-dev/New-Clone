import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUSerData } from "../../store/auth";
import APIName from "../endPoints";
import { authRepo } from "./authRepo";
import Swal from "sweetalert2";
export const adminlogin = createAsyncThunk(
  APIName.adminauth,
  async (payload, thunkAPI) => {
    console.log(payload,"payloadpayloadpayloadpayload")
    const npayload={
      EMPL_ID:payload.UserId
    }
    try {
      // const { data } = await authRepo.adminlogin(npayload);
      // if (data.data.Responsecode == 100) {
      //   localStorage.setItem("token", data.data.data[0].TOKEN);
      //   GetMessage("success", "successfully login");
      //   return data.data;
      // }

      const { data } = await authRepo.LdapLogin(payload);
      if(data.data.Data.message=='Authorized User'){
        const { data } = await authRepo.adminlogin(npayload);
        if (data.data.Responsecode == 100) {
          localStorage.setItem("token", data.data.data[0].TOKEN);
          GetMessage("success", "successfully login");
        }
        if (data.data.Responsecode == 100) {
          thunkAPI.dispatch(setUSerData(data.data.data));
        }
        return data.data;
      }
    } catch (err) {
      // GetMessage("error", "Invalid Credentials");
      // GetMessage("error", 'Unauthorize');
      // const res = JSON.parse(err.response.data.message);
      // if (res.statuscode == 404) {
      // GetMessage("error", "Invalid Credentials");  
      // }
    }
    return false;
  }
);

const GetMessage = (type, messga) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const adminRegister = createAsyncThunk(
  APIName.getBillboard,
  async (payload, thunkAPI) => {
    try {
      const response = await authRepo.adminRegister(payload);
      // const responseData = response;

      // console.log("res", responseData.data);
      if (
        response.data.Responsecode == 100 &&
        response.data.message == "GET Data Sucessfully"
      ) {
        thunkAPI.dispatch(setBillboardData(response.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);

export const updateBillboard = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      let reqPayload = new FormData();
      if (payload.flag) {
        reqPayload.append("title", payload.title);
        reqPayload.append("description", payload.description);
        reqPayload.append("textcolor", payload.textcolor);
        reqPayload.append("buttontext", payload.buttontext);
        reqPayload.append("buttoncolor", payload.buttoncolor);
        reqPayload.append("buttonurl", payload.buttonurl);
        reqPayload.append("image", payload.image);
        reqPayload.append("id", payload.id);
      } else {
        reqPayload.append("isdeleated", payload.isdeleated);
        reqPayload.append("id", payload.id);
      }

      for (const pair of reqPayload.entries()) {
      }

      const response = await billBoardRepo.updateBillboard(reqPayload);
      if (response.data.Responsecode == 100) {
        return true;
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong", "");
    }
    return false;
  }
);
