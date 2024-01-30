import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEventData,EventUser, registerUser } from "../../store/community/event";
import { setPostData,PostLikeUsers } from "../../store/community/post";
import { SetTabs } from "../../store/community/tabs";
import Swal from "sweetalert2";
import APIName from "../endPoints";
import { communityRepo } from "./communityRepo";
export const createEvent = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.createEvent,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.createEvent(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Event Added");
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
export const getEvent = createAsyncThunk(
  APIName.getEvent,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.getEvent(payload);

      if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(setEventData(response.data.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
export const registeruser = createAsyncThunk(
  APIName.registeruser,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.registeruser(payload);

      if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(registerUser(response.data.data.data));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
export const deleteEvent = createAsyncThunk(
  APIName.deleteEvent,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.deleteEvent(payload);
      if (response.data.data.Responsecode == 100) {
        await getSuccessMessage("success", "Event Deleated");
        return true;
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);

export const updateEvent = createAsyncThunk(
  APIName.updateEvent,
  async (payload, thunkAPI) => {
    try {
      const reqPayload = new FormData();
      const response = await communityRepo.updateEvent(payload);
      if (response.data.Responsecode == 100) {
        await getSuccessMessage("success", "Event Updated");
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);

export const createPost = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.createPost,
  async (payload, thunkAPI) => {
    console.log(payload, "payloadpayloadpayload");
    try {
      const reqPayload = new FormData();
      reqPayload.append("EMPL_ID", payload.EMPL_ID);
      reqPayload.append("type", payload.type);
      reqPayload.append("caption", payload.caption);
      reqPayload.append("Isdelete", payload.Isdelete);
      reqPayload.append("url", payload.url);
      reqPayload.append("tags", payload.tags);
      reqPayload.append(
        "trending",
        payload.setTrending ? payload.setTrending : 0
      );

      for (const pair of reqPayload.entries()) {
      }
      const { data } = await communityRepo.createPost(payload);
      if (data.data.Responsecode == 100) {
        await getSuccessMessage("success", "Post Added");
      }
    } catch (err) {
      console.log(err);
      await CheckLogin(err);
    }
    return false;
  }
);
export const getPost = createAsyncThunk(
  APIName.getPost,
  async (payload, thunkAPI) => {
    try {
      let newpayload = {
        EMPL_ID: "0",
      };
      if (payload.page > 0) {
        Object.assign(newpayload, { setoffset: payload.page });
      }
      if (payload.Search) {
        Object.assign(newpayload, { Search: payload.Search });
      }
      if (payload.Role) {
        Object.assign(newpayload, { Role: payload.Role });
      }
      if (payload.startdate) {
        Object.assign(newpayload, { startdate: payload.startdate });
      }
      if (payload.enddate) {
        Object.assign(newpayload, { enddate: payload.enddate });
      }
      console.log(payload)
      const responce = await communityRepo.getPost(newpayload);
      console.log(responce.data.data.data,"lengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      if (responce.data.data.Responsecode == 100) {
        thunkAPI.dispatch(setPostData(responce.data.data.data));
        return responce;
      }
    } catch (err) {
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
    }, 1000);
  }
};
export const updatePost = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateEvent,
  async (payload, thunkAPI) => {
    try {
      let reqPayload = new FormData();
      const response = await communityRepo.updatePost(payload);
      if (response.status == 200) {
        await getSuccessMessage("success", "Post Updated");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
export const DeletePost = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.updateEvent,
  async (payload, thunkAPI) => {
    try {
      let reqPayload = new FormData();
      reqPayload.append("Isdeleated", 1);
      reqPayload.append("FEED_ID", payload.id);

      for (const pair of reqPayload.entries()) {
      }
      const response = await communityRepo.updatePost(payload);
      if (response.data.Responsecode == 100) {
        await getSuccessMessage("success", "Post Deleated");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);

export const downloadUser = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.downloadUser,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.downloadUser(payload);
      if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(EventUser(response.data.data.data));
        return response;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }
);

export const PoatLikeUser = createAsyncThunk(
  // console.log("jsdhksjadasd"),
  APIName.Postlike,
  async (payload, thunkAPI) => {
    try {
      const response = await communityRepo.PostLikeUser(payload);
            if (response.data.data.Responsecode == 100) {
        thunkAPI.dispatch(PostLikeUsers(response.data.data.data));
        return response.data.data.data;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);

export const SetActiveTabs = createAsyncThunk(
  APIName.getPost,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(SetTabs(payload));
    } catch (err) {
      console.log(err);
    }
    return false;
  }
);
