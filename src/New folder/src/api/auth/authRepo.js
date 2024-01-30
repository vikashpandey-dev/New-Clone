import  Repository  from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const authRepo = {
  LdapLogin(payload) {
    return Repository.post(APIName.LdapLogin,payload)
  },
  adminlogin(payload) {
    return Repository.post(APIName.login,payload)
  },
  adminRegister(payload) {
    return Repository.post(APIName.register, payload);
  },
};
