import Repository from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const NotificationRepo = {
  CreateNotification(payload) {
    return Repository.post(APIName.CreateNotification, payload, {
    });
  },
  AllNotification(payload) {
    return Repository.post(APIName.AllNotification, payload, {
    });
  },
  uploadexcel(payload) {
    return Repository.post(APIName.uploadexcel, payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
