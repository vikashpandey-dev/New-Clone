const BillboardAPI = {
  getBillboard: "get",
  addBillboard: "create",
  updateBillboard: "update",
};

const EventAPI = {
  getEvent: "GET_eventpost",
  createEvent: "insert_eventpost",
  deleteEvent: "DELETE_eventpost",
  updateEvent: "update_eventpost",
  registeruser:"getregisteruser",
  downloadUser:"downloaduser"
};

const PostAPI = {
  getPost: "getAdmin_Feed",
  createPost: "insert_FEED",
  // deleteEvent: "DELETE_eventpost",
  updatePost: "Update_Feed",
  Postlike:"Postlike"
};
const BannerAPI = {
  getBanner: "banner/get",
  updateBanner: "banner/update",
  // deleteEvent: "DELETE_eventpost",
  addBanner: "banner/create",
  delete: "banner/delete",
};
const Users = {
  alluser: "allusers",
  updateuser: "updateuser",
};
const Notification={
  CreateNotification:"notification/create",
  AllNotification:"notification/AllNotification",
uploadexcel:"notification/uploadexcel"

};
const InsertStory={
  InsertStory:"insertstory",
  GetStory:"get_ADMIN_HOME_story",
  DeleteStory:"DeleteStory"
};
const adminauthAPI = {
  login: "adminauth/login",
  LdapLogin: "LDAPLOGIN",
  register: "adminauth/register",
};
const APIName = {
  ...BillboardAPI,
  ...EventAPI,
  ...PostAPI,
  ...BannerAPI,
  ...Users,
  ...adminauthAPI,
  ...Notification,
  ...InsertStory
};

export default APIName;
