import React from "react";
import { Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
function Header() {
  return (
    <div className="p-6 bge8f4ff w-full header-height">
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          <p className="hdr-title">Feedback</p>
        </div>
        <div className="flex gap-2">
          {/* <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            className="text-center h-11 w-11"
          >
            <BsThreeDots className="mx-auto" />
          </Button> */}
        </div>
      </div>
      <p className="hdr-subttl">12,2562 feedback received</p>
    </div>
  );
}

export default Header;
