import  Repository  from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const bannerRepo = {
  addBanner(payload) {
    return Repository.post(APIName.addBanner, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getBanner(payload) {
    return Repository.post(APIName.getBanner, payload);
  },
  DeleteBanner(payload) {
    return Repository.post(APIName.delete, payload);
  },
  updateBanner(payload) {
    // for(const pair of payload.entries()){
    //   console.log(pair[0],+ " " + pair[1],"sdksdlkjskldjslkdjklkj")
    // }
    return Repository.post(APIName.updateBanner, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
