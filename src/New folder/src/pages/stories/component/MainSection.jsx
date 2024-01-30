import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputLeftElement,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import UserStories from "./tabs/UserStories";

const MainSection = () => {
  return (
    <div className="mt-4 tabs-top-border">
      <Tabs>
        <TabList
          border="2"
          justifyContent="space-between"
          className="items-center py-2 px-2"
          width="100%"
        >
          <div className="flex">
            <Tab _selected={{ color: "cprimary.500", fontWeight: "600" }}>User Stories</Tab>
            <Tab _selected={{ color: "cprimary.500", fontWeight: "600" }}>My Stories</Tab>
          </div>
          <div className="pr-4">
            {" "}
            <InputGroup>
              <InputLeftElement pointerEvents="none" height="10">
                <FiSearch color="inherit" height="10" />
              </InputLeftElement>
              <Input
                type="text"
                value=""
                placeholder="Search"
                height="10"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel>one</TabPanel>
          <TabPanel>
            <UserStories />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MainSection;
