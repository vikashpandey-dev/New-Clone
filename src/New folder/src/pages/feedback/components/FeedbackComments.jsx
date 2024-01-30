import React from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
function FeedbackComments() {
  return (
    <>
      <div className="flex justify-between items-center bg-white px-6 pt-6 pb-3">
        <p className="category-ttl">Feedback</p>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputLeftElement pointerEvents="none" height="10">
              <FiSearch color="inherit" height="6" />
            </InputLeftElement>
            <Input type="text" placeholder="Search" height="10" />
          </InputGroup>
          <Input type="date" height="10" placeholder="Today" />
          <Button
                    p="2"
                    color="cprimary.500"
                    // color="white"
                    fontWeight="500"
                    // _hover={{ bg: "cprimary.600" }}
                    variant="solid"
                    className="text-center "
                    height="10"
                  >
                    <FiRefreshCw className="mx-auto text-2xl" />
                  </Button>
          <Button
            p="2"
            color="cprimary.500"
            // color="white"
            fontWeight="500"
            // _hover={{ bg: "cprimary.600" }}
            variant="solid"
            className="text-center "
            height="10"
          >
            <TbSortAscending className="mx-auto text-2xl" />
          </Button>
        </div>
      </div>
      <div className="max-h-screen overflow-y-auto mr-2">
      <div className="px-5 pt-3">
        <div className="mt-4">
          {[...Array(5)].map((x, i) => (
            <div className="border rounded-lg px-4 py-3 my-3">
              <div className="flex gap-3 pb-3 w-full rounded-md">
                <div className="flex">
                  <Avatar
                    size="md"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">Ajay Sharma</p>
                    <div className="flex gap-2">
                      <HiOutlineMail className="text-grey text-2xl" />
                    </div>
                  </div>
                  <span className="text-sm text-grey font-medium">
                    12 jun 2022, 02:00 AM
                  </span>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-grey font-medium text-sm">
                  “Lorem ipsum dolor sit amet consectetur. Mauris leo ipsum nunc
                  id elit purus eget fusce. Nulla aenean at rhoncus sed risus.
                  Commodo amet vel commodo aliquet eget. Nisl consectetur est
                  quam felis natoque. Amet suscipit amet odio “at. Enim non ut
                  ligula in elementum convallis. Neque massa in erat tristique
                  volutpat.“
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default FeedbackComments;
