import  Repository  from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const userRepo = {
  GetUSers(payload) {
    return Repository.post(APIName.alluser, payload);
  },
  UpdateUsers(payload) {
    return Repository.post(APIName.updateuser, payload);
  },
};
