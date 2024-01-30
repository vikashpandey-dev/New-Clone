import Repository from "../Repository";
import APIName from "../endPoints";
import axios from "axios";

export const StoryRepo = {
  CreateStory(payload) {
    return Repository.post(APIName.InsertStory, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  GetStory(payload) {
    return Repository.post(APIName.GetStory)
  },
  DeleteStory(payload) {
    return Repository.post(APIName.DeleteStory,payload)
  },
};
