import { combineReducers } from "redux";
import auth from "./auth";
import billBoard from "./billBoard";
import Event from "./community/event";
import Post from "./community/post";
import banner from "./banner"
import users from "./users"
import tabs from "./community/tabs";
import Story from "./Story";
import Notification from "./Notification";
const appReducer = combineReducers({
  auth,
  billBoard,
  Event,
  Post,
  banner,
  users,
  auth,
  tabs,
  Story,
  Notification
});

const rootReducer = (state, action) => {
  if (action.type === "RESSET_STORE") {
    state = {};
    sessionStorage.removeItem("token");
    localStorage.clear();
  }
  return appReducer(state, action);
};

export default rootReducer;
