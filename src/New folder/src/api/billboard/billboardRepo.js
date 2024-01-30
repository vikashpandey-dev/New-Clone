import  Repository  from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

let cancelToken;

export const billBoardRepo = {
  addBillboard(payload) {
    return Repository.post(APIName.addBillboard, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getBillboard(payload) {
    return Repository.post(APIName.getBillboard, payload);
  },
  updateBillboard(payload) {
    return Repository.post(APIName.updateBillboard, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
