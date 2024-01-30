import axios from "axios";
import csencrypt from "../config/csencrypt";
const baseDomain = "https://youthforindia-api.aiab.in/";
// const baseDomain = process.env.VUE_APP_BASE_URL_COR_API
const baseURL = `${baseDomain}`;
const Repository = axios.create({
  baseURL,
  headers: { "community-name": "SBI" },
});

Repository.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.headers["Content-Type"] == "multipart/form-data") {
      let FormData = require("form-data");

      let data = new FormData();
      data.append(
        "data",
        process.env.enable_encription != 1
          ? csencrypt.Encript(JSON.stringify(config.data.data))
          : JSON.stringify(config.data.data)
      );
      if (config.data["coverImage"]) {
        data.append("coverImage", config.data.coverImage);
      }
      let formObj = {};
      for (var pair of data.entries()) {
        formObj[pair[0]] = pair[1];
      }
      config.data = data;
    } else if (config.data) {
      config.data = {
        data:
          process.env.enable_encription != 1
            ? csencrypt.Encript(JSON.stringify(config.data))
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
        response.data.data = csencrypt.Decrypt(response.data.data);
      }
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default Repository;
