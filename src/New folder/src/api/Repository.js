import axios from "axios";
import crypto from "../utility/crypto.js";
import * as urls from "../config/constants";
import  * as ENABLE_ENCRIPTION from "../config/ENABLE_ENCRIPTION"
const Repository = axios.create({
  baseURL: urls.AlumniBaseurl,
});
var sttrue = true;
Repository.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (config.headers["Content-Type"] == "multipart/form-data") {
      let data = new FormData();
      data.append(
        "data",
        ENABLE_ENCRIPTION.ENABLE_ENCRIPTION!=0
          ? crypto.EncryptJS(JSON.stringify(config.data))
          :JSON.stringify(config.data)
      );
      if (config.data.image) {
        data.append("image", config.data.image);
      }
      let formObj = {};
      for (var pair of data.entries()) {
        formObj[pair[0]] = pair[1];
      }
      config.data = data;
    } else if (config.data) {

      config.data = {
        data:
        ENABLE_ENCRIPTION.ENABLE_ENCRIPTION!=0
            ? crypto.EncryptJS(JSON.stringify(config.data))
            : JSON.stringify(config.data),
      };
    }

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Repository.interceptors.response.use(
  (response) => {
    if (response) {
      if (Object.keys(response.data.data).length) {
        response.data.data = crypto.decryptJS(response.data.data);
      }
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default Repository;
