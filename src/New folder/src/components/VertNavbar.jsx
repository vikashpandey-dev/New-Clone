import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@chakra-ui/react";
import Ilogo from "../assets/img/ilogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { FiAirplay } from "react-icons/fi";
import { BsFillGridFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import GDashboardIcon from "../assets/img/Navbar/g-dash.png";
import BDashboardIcon from "../assets/img/Navbar/b-dash.png";
import GBillboardIcon from "../assets/img/Navbar/g-billb.png";
import BBillboardIcon from "../assets/img/Navbar/b-billb.png";
import { Tooltip, Box } from "@chakra-ui/react";
import GFeedbackIcon from "../assets/img/Navbar/g-feed.png";
import BFeedbackIcon from "../assets/img/Navbar/b-feed.png";
import GCommunityIcon from "../assets/img/Navbar/g-comm.png";
import BCommunityIcon from "../assets/img/Navbar/b-comm.png";
import Stories from "../assets/img/Navbar/stories.png";
import StoriesFill from "../assets/img/Navbar/storiesfill.png";
import { connect } from "react-redux";

import { setPage } from "../store/auth";
import { useHistory } from "react-router-dom";
function Navbar() {
  const activePage = useSelector((state) => state.auth.IsPage);
  const dispatch = useDispatch();
  const history = useHistory();
  const Logout = async () => {
    // let res = await dispatch(
    //   userFireBase({
    //     TMID: TIDRID.TID,
    //     FireBaseWebToken: "",
    //   })
    // );
    // debugger;
    // await dispatch("RESSET_STORE");
    localStorage.removeItem("token");

    // await dispatch({ type: "RESSET_STORE" });
    // history.push(`${import.meta.env.BASE_URL}login`);
    window.location.href = `${import.meta.env.BASE_URL}login`;
  };
  const DisableNavbar = (id) => {
    if (id === "dashboard") {
      dispatch(setPage(0));
    }
    if (id === "billboard") {
      dispatch(setPage(1));
    }
    if (id === "feedback") {
      dispatch(setPage(2));
    }
    if (id === "community") {
      dispatch(setPage(3));
    }
    if (id === "cardmanage") {
      dispatch(setPage(4));
    }
    if (id === "stories") {
      dispatch(setPage(4));
    }
  };
  return (
    <div className="w-full h-full text-center p-4 flex flex-col justify-between content-center">
      <div className="top-section w-full">
        {/* <Tooltip label='Auto start' placement='auto-start'> */}
        <Link to={`${import.meta.env.BASE_URL}dashboard`}>
          <img
            src={Ilogo}
            alt="ICICI Logo"
            className="h-14 mb-16 mx-auto py-2 "
          />
        </Link>
        {/* </Tooltip> */}
        {/* <p>{window.location.href}</p> */}
        <div className="grid grid-rows-4 gap-6">
          <Tooltip
            label={
              <Box className="font-normal p-1 text-gray-600">
                <strong> </strong>Dashboard <br />
              </Box>
            }
            bg="#d3eaf7"
            placement="left-start"
          >
            <Link to={`${import.meta.env.BASE_URL}dashboard`}>
              <img
                src={activePage == 0 ? BDashboardIcon : GDashboardIcon}
                alt="ICICI Logo"
                className="nb-icon py-2 sebgsss sebgsss"
                onClick={() => DisableNavbar("dashboard")}
              />
            </Link>
          </Tooltip>
          <Tooltip
            label={
              <Box className="font-normal p-1 text-gray-600">
                <strong> </strong>Banner <br />
              </Box>
            }
            bg="#d3eaf7"
            placement="left-start"
          >
            <Link to={`${import.meta.env.BASE_URL}billboard`}>
              <img
                src={activePage == 1 ? BBillboardIcon : GBillboardIcon}
                alt="ICICI Logo"
                className=" py-2 nb-icon sebgsss"
                onClick={() => DisableNavbar("billboard")}
              />
            </Link>
          </Tooltip>

          {/* <Link to={`${import.meta.env.BASE_URL}feedback`}>
            <img
              src={activePage == 2 ? BFeedbackIcon : GFeedbackIcon}
              alt="ICICI Logo"
              className=" py-2 nb-icon"
              onClick={() => DisableNavbar("feedback")}
            />
          </Link> */}
          <Tooltip
            label={
              <Box className="font-normal p-1 text-gray-600">
                <strong> </strong>Community <br />
              </Box>
            }
            bg="#d3eaf7"
            placement="left-start"
          >
            <Link to={`${import.meta.env.BASE_URL}community`}>
              <img
                src={activePage == 3 ? BCommunityIcon : GCommunityIcon}
                alt="ICICI Logo"
                className=" py-2 nb-icon"
                onClick={() => DisableNavbar("community")}
              />
            </Link>
          </Tooltip>

          {/* <Link to={`${import.meta.env.BASE_URL}stories`}>
            <img
              src={activePage == 4 ? StoriesFill : Stories}
              alt="ICICI Logo"
              className=" py-2 nb-icon"
              onClick={() => DisableNavbar("stories")}
            />
          </Link> */}
            <Link to={`${import.meta.env.BASE_URL}ManageNotification`}>
            <img
              src={activePage == 4 ? StoriesFill : Stories}
              alt="ICICI Logo"
              className=" py-2 nb-icon"
              onClick={() => DisableNavbar("stories")}
            />
          </Link>
          {/* <Link to={`${import.meta.env.BASE_URL}notification`}>
            <img
              src={activePage == 4 ? NotificationFilled : NotificationLine}
              alt="ICICI Logo"
              className=" py-2 nb-icon"
              style={{color: "#E2E8F0"}}
              onClick={() => DisableNavbar("notification")}
            />
          </Link> */}
        </div>
      </div>

      <div className="w-full text-center text-lg">
        <Tooltip
          label={
            <Box className="font-normal p-1 text-gray-600">
              <strong> </strong>Logout <br />
            </Box>
          }
          bg="#d3eaf7"
          placement="left-start"
        >
          <Button px="2" size="md" bg="white" onClick={Logout}>
            <TbLogout className="text-2xl font-bold text-grey mx-auto" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state, props) => {
  let token = localStorage.getItem("token");
  if (!token) {
    const baseUrl = window.location.protocol + "//" + window.location.host;
    window.location.href = baseUrl + "/" + "AlumniAdmin/login";
  }
  return {
    AdminData: state.auth.data[0],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
