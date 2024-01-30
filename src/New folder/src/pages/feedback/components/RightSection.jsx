import React from "react";
import {
  InputLeftElement,
  Input,
  InputGroup,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { BsThreeDots, BsDot } from "react-icons/bs";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import instagram from "../../../assets/img/ig.png";
import linkedin from "../../../assets/img/in.png";

function RightSection() {
  return (
    <>
      <div className="flex w-full justify-between px-4 pt-4">
        <p className="category-ttl">Users</p>
        <p className="hdr-subttl flex justify-center items-center">
          124 active user
        </p>
      </div>
      <div className="my-4 w-full flex gap-2 px-4">
        <InputGroup className="w-1/5">
          <InputLeftElement pointerEvents="none" height="10">
            <FiSearch color="inherit" height="10" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            height="10"
            className="h-full"
          />
        </InputGroup>
        <Button
          color="cprimary.500"
          // color="white"
          fontWeight="500"
          // _hover={{ bg: "cprimary.600" }}
          variant="solid"
          height="10"
          className="text-center"
        >
          <TbSortAscending className="mx-auto text-2xl" />
        </Button>
      </div>
      <div className="max-h-screen overflow-y-auto mr-2">
        <div className="w-full p-4 border-l">
          <div className="">
            {[...Array(12)].map((x, i) => (
              <div className="border px-2 py-3 my-2 flex gap-3 w-full rounded-md">
                <div className="flex">
                  <Avatar
                    size="md"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold"> Nikita Kumari</p>
                    <div className="flex gap-2">
                      <img src={linkedin} className="h-4" />
                      <img src={instagram} className="h-4" />
                    </div>
                  </div>
                  <span className="text-sm text-grey font-medium">
                    9856235660&nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                  <span className="text-sm text-primary font-medium">
                    Ajay@gmail.com
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSection;
