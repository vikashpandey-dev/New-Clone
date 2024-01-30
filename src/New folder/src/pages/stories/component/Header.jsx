import React from "react";

import {
  Button,
  AvatarGroup,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import ModalAddStory from "./ModalAddStory";
import { BiPlus } from "react-icons/bi";
import avatar1 from "../../../assets/img/community/avatar1.svg";
import avatar2 from "../../../assets/img/community/avatar2.svg";
import avatar3 from "../../../assets/img/community/avatar3.svg";
import avatar4 from "../../../assets/img/community/avatar4.svg";
// import Multiselect from "multiselect-react-dropdown";

const Header = (props) => {
  const closeStory=async(data)=>{
    if(data.close==true){
      onCloseStory()
    }
    }
  // alert(JSON.stringify(props))
  const {
    isOpen: isOpenStory,
    onOpen: onOpenStory,
    onClose: onCloseStory,
  } = useDisclosure();                  
  return (
    <div className="p-6 bge8f4ff">
      <Modal isOpen={isOpenStory} onClose={onCloseStory} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalHeader
            color="white"
            fontWeight="500"
            py="3"
            fontSize="16px"
            backgroundColor="#053c6d"
            borderTopRadius="10px"
          >
            Add Story
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <ModalAddStory alert={closeStory} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="flex justify-between ">
        <div className="flex justify-center items-center">
          <p className="hdr-title">Stories</p>
        </div>
        <div className="flex gap-2">
          {/* <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            className="text-center"
          >
            <BsThreeDots className="mx-auto" />
          </Button> */}
          {/* <Menu>
            <MenuButton
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              as={Button}
              leftIcon={<BiPlus className="mr-1.5" />}
            >
              Add Story
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenPost}>Post</MenuItem>
              <MenuItem onClick={onOpenEvent}>Event</MenuItem>
            </MenuList>
          </Menu> */}
          <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            onClick={onOpenStory}
          >
            <BiPlus />
            Add Story
          </Button>
        </div>
      </div>
      <p className="hdr-subttl">12,230 Today’s Stories</p>
      <div className="mt-6 flex items-center">
        <AvatarGroup size="md">
          <Avatar name="Ryan Florence" src={avatar1} className="avatar-size" />
          <Avatar
            name="Segun Adebayo"
            src={avatar2}
            className="avatar-size custom-avatar z-10"
          />
          <Avatar
            name="Kent Dodds"
            src={avatar3}
            className="avatar-size custom-avatar z-20"
          />
          <Avatar
            name="Prosper Otemuyiwa"
            src={avatar4}
            className="avatar-size custom-avatar z-30"
          />
        </AvatarGroup>
        {/* <p className="comm-counttext ml-4">+ 119 People</p> */}
      </div>
    </div>
  );
};
export default Header;
