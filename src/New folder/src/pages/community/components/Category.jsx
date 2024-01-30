import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputLeftElement,
  Input,
  InputGroup,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Image,
  CardFooter,
  Heading,
  ChakraProvider,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import UserAccess from "../../community/components/tabs/UserAccess.jsx";
import { connect } from "react-redux";
import Photos from "../../community/components/tabs/Photos.jsx";
import Events from "../../community/components/tabs/Events.jsx";
import UserPosts from "./tabs/UserPosts.jsx";
import { getPost, updatePost, SetActiveTabs } from "../../../api/community";
import { handletabs } from "../../../api/banner";
function Category(props) {
  const [activetab, setActivetab] = useState("AdminPost");
  const [search, setSearch] = useState("");
  const [value, setValue] = useState({});
  const [searchvalue, setsearchvalue] = useState("");
  useEffect(() => {
    setActivetab(activetab);
    props.setActiveTabsApi(activetab);
  }, [activetab]);

  useEffect(() => {
    if (props.Currenttabs == "UserPost") {
      const payload = {
        Role: "User",
      };
      props.getPostAPI(payload);
    }
    if (props.Currenttabs == "AdminPost") {
      const payload = {
        Role: "Admin",
      };
      props.getPostAPI(payload);
    }
  }, [props.Currenttabs]);
  useEffect(() => {}, [props.Currenttabs]);
  const handleclikctwicw = (tabs) => {
    setActivetab("");
    setActivetab(tabs);
  };
  const handleclick = (tabs) => {
    handleclikctwicw(tabs);
    setSearch("");
  };
  useEffect(() => {
    setValue({
      searchval: search,
    });
  }, [search]);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    setTabIndex(props.settabs);
  }, [props.settabs]);
  const handleTabsChange = (index) => {
    const payload = {
      tabs: index,
    };
    props.handletabsAPI(payload);
    setTabIndex(index);
  };
  useEffect(()=>{
if(props.settabs==0){
  setsearchvalue("Search Description,Tags,Name")
}
if(props.settabs==1){
  setsearchvalue("Search Description,Tags,Name")
}
if(props.settabs==2){
  setsearchvalue("Search Id,Name,Email,MobileNo")
}
if(props.settabs==3){
  setsearchvalue("Search TopicName,Description")
}
  },[props.settabs])
  return (
    <div className="mt-4 tabs-top-border">
      <ChakraProvider>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList
            border="2"
            justifyContent="space-between"
            className="items-center py-2 px-2"
            width="100%"
          >
            <div className="flex">
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={() => handleclick("AdminPost")}
              >
                Admin Posts
              </Tab>
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={() => handleclick("UserPost")}
              >
                User Posts
              </Tab>
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={() => handleclick("Useraccess")}
              >
                User Access
              </Tab>
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={() => handleclick("Event")}
              >
                Events
              </Tab>
            </div>
            <div className="pr-4 w22">
              {" "}
              <InputGroup>
                <InputLeftElement pointerEvents="none" height="10">
                  <FiSearch color="inherit" height="10" />
                </InputLeftElement>
                <Input
                className="w-auto"
                  type="text"
                  value={search}
                  placeholder={searchvalue}
                  height="10"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Photos val={value} />
              {/* <p>Admin Posts</p> */}
            </TabPanel>
            <TabPanel>
              {/* <p>User Posts</p> */}
              <UserPosts val={value} />
            </TabPanel>
            <TabPanel>
              <UserAccess val={value} />
            </TabPanel>
            <TabPanel>
              <Events val={value} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    createEventAPI: (payload) => dispatch(createEvent(payload)),
    // createPostAPI: (payload) => dispatch(createPost(payload)),
    getPostAPI: (payload) => dispatch(getPost(payload)),
    updatePostAPI: (payload) => dispatch(updatePost(payload)),
    setActiveTabsApi: (payload) => dispatch(SetActiveTabs(payload)),
    handletabsAPI: (payload) => dispatch(handletabs(payload)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    Posts: state?.Post?.data,
    Currenttabs: state.tabs.ActiveTabs,
    settabs: state?.banner?.settabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
