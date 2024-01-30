import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { getBillboard } from "../../../api/billBoard";
import { getBanner, handletabs } from "../../../api/banner";
import { getEvent } from "../../../api/community";
import { getPost } from "../../../api/community";
import { GetUSers } from "../../../api/users";
import moment from "moment";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Card1 from "../../../assets/icons/Card1.png";
import Card2 from "../../../assets/icons/Card2.png";
import Card3 from "../../../assets/icons/Card3.png";
import Card4 from "../../../assets/icons/Card4.png";
import Card5 from "../../../assets/icons/Card5.png";
import { handletoggletabse } from "../../../api/banner";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loder/Loder";
import { setPage } from "../../../store/auth";
function Header(props) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [billboard, setbillboard] = useState(true);
  const [banner, setbanner] = useState(false);
  const [loder, setloder] = useState(false);
  const history = useHistory();
  const GetDashBoard = async () => {
    try {
      const payload = {
        Search: "",
      };
      setloder(true)
      await props.getBillboardAPI(payload);
      await props.GetbannerAPI(payload);
      await props.getEventAPI(payload);
      await props.getPostAPI(payload);
      await props.GetUSerAPI(payload);
      setloder(false)
    } catch (err) {
      setloder(false)
      console.log(err);
    }
  };

  useEffect(() => {
    GetDashBoard();
  }, []);
  const redirectotpage = (page, tabs) => {
    if (tabs == "banner") {
      dispatch(setPage(1))
      const payload = {
        tabs: 1,
      };
      props.handletabsAPI(payload);
    }
    if (tabs == "billboard") {
      dispatch(setPage(1))
      const payload = {
        tabs: 0,
      };
      props.handletabsAPI(payload);
    }
    if (tabs == "post") {
      dispatch(setPage(3))
      const payload = {
        tabs: 0,
      };
      props.handletabsAPI(payload);
    }
    if (tabs == "event") {
      dispatch(setPage(3))
      const payload = {
        tabs: 3,
      };
      props.handletabsAPI(payload);
    }
    if (tabs == "users") {
      dispatch(setPage(3))
      const payload = {
        tabs: 2,
      };
      props.handletabsAPI(payload);
    }
    let pages = `${import.meta.env.BASE_URL}${page}`;
    // setActiveTab(1)
    props.handletoggletabseAPI({
      toggletabs: true,
    });
    setbanner(true);
    setbillboard(false);
    history.push(pages);
  };

  return (
    <>
    {loder?<Loader/>:(
        <div className="p-6 bge8f4ff w-full">
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <p className="hdr-title">Dashboard</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mt-4">
          <Card>
            <CardBody>
              <div
                className="flex gap-4 items-center rounded-xl cursor-pointer"
                onClick={() => redirectotpage("community", "post")}
              >
                <div>
                  <img src={Card1} alt="" />
                </div>
                <div className="text">
                  <p className="hdr-subttl">Total Post</p>
                  {props.Posts.length > 0 ? (
                    <h3 className="font-bold text-2xl">
                      {props.Posts[0].TOTAL_FEED}
                    </h3>
                  ) : (
                    <h3 className="font-bold text-2xl">0</h3>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                className="flex gap-4 items-center rounded-xl cursor-pointer"
                onClick={() => redirectotpage("community", "event")}
              >
                <div>
                  <img src={Card2} alt="" />
                </div>
                <div className="text">
                  <p className="hdr-subttl">Total Events</p>
                  {props.Events.length > 0 ? (
                    <h3 className="font-bold text-2xl">
                      {props.Events[0].TOTAL_COUNT}
                    </h3>
                  ) : (
                    <h3 className="font-bold text-2xl">0</h3>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                className="flex gap-4 items-center rounded-xl cursor-pointer"
                onClick={() => redirectotpage("community", "users")}
              >
                <div>
                  <img src={Card3} alt="" />
                </div>
                <div className="text">
                  <p className="hdr-subttl">Total User</p>
                  {props.usersdata.length > 0 ? (
                    <h3 className="font-bold text-2xl">
                      {` ${props.usersdata[0].registerUser} (${props.usersdata[0].TOTAL_USER})`}
                    </h3>
                  ) : (
                    <h3 className="font-bold text-2xl">0</h3>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                className="flex gap-4 items-center rounded-xl cursor-pointer"
                onClick={() => redirectotpage("billboard", "billboard")}
              >
                <div>
                  <img src={Card4} alt="" />
                </div>
                <div className="text">
                  <p className="hdr-subttl">Total Billboard</p>
                  {props ? (
                    props.BillBoards.length ? (
                      <h3 className="font-bold text-2xl">
                        {props.BillBoards[0].TOTAL_COUNT}
                      </h3>
                    ) : (
                      <h3 className="font-bold text-2xl">0</h3>
                    )
                  ) : (
                    <h3 className="font-bold text-2xl">0</h3>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                className="flex gap-4 items-center rounded-xl cursor-pointer"
                onClick={() => redirectotpage("billboard", "banner")}
              >
                <div>
                  <img src={Card5} alt="" />
                </div>
                <div className="text">
                  <p className="hdr-subttl">Total Homebanner</p>
                  {props ? (
                    props.bannerdata.length > 0 ? (
                      <h3 className="font-bold text-2xl">
                        {props.bannerdata[0].TOTAL_COUNT}
                      </h3>
                    ) : (
                      <h3 className="font-bold text-2xl">0</h3>
                    )
                  ) : (
                    <h3 className="font-bold text-2xl">0</h3>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    )}
    </>
  
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getBillboardAPI: (payload) => dispatch(getBillboard(payload)),
    GetbannerAPI: (payload) => dispatch(getBanner(payload)),
    getEventAPI: (payload) => dispatch(getEvent(payload)),
    getPostAPI: (payload) => dispatch(getPost(payload)),
    GetUSerAPI: (payload) => dispatch(GetUSers(payload)),
    handletoggletabseAPI: (payload) => dispatch(handletoggletabse(payload)),
    handletabsAPI: (payload) => dispatch(handletabs(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    BillBoards: state?.billBoard?.data,
    bannerdata: state.banner.data,
    Posts: state?.Post?.data,
    Events: state?.Event?.data,
    usersdata: state?.users?.data,
    settabs: state?.banner?.settabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
