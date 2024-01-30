import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import UserImg from "../../../../assets/img/community/user-img.svg";
function LikePopover(props) {
  const [isOpenLike, setopenlike] = useState(false);
  console.log(props,"propsprops")
  useEffect(()=>{
    if(props.toggle==true){
      setopenlike(true)
    }
  })
  const onCloseLike = () => {
    // const setpopup=false
 (()=>{
  props.closetoggle("setpopup")
 } )
    // setopenlike(false);
  };
  return (
    <>
      <Modal isOpen={isOpenLike} onClose={onCloseLike} isCentered>
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
            Likes
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={3}>
            <div className="Like-by-container">
              {[...Array(15)].map((item, index) => (
                <div className="flex items-center gap-4 py-3">
                  <div className="img">
                    <img src={UserImg} alt="user_img" className="w-10 h-10" />
                  </div>
                  <div className="user-name leading-3">
                    <p className="text-xs font-medium">Like By</p>
                    <p className="text-sm text-black font-bold">Ajay Sharma</p>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LikePopover;
