import  Repository  from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const communityRepo = {
  createEvent(payload) {
    return Repository.post(APIName.createEvent, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getEvent(payload) {
    return Repository.post(APIName.getEvent, payload);
  },
  deleteEvent(payload) {
    return Repository.post(APIName.deleteEvent, payload);
  },
  registeruser(payload) {
    return Repository.post(APIName.registeruser, payload);
  },
  updateEvent(payload) {
    return Repository.post(APIName.updateEvent, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  createPost(payload) {
    return Repository.post(APIName.createPost, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPost(payload) {
    return Repository.post(APIName.getPost, payload);
  },
  updatePost(payload) {
    return Repository.post(APIName.updatePost, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  downloadUser(payload) {
    return Repository.post(APIName.downloadUser, payload);
  },
  PostLikeUser(payload) {
    return Repository.post(APIName.Postlike, payload);
  },
};
