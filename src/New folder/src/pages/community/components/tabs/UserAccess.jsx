import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { GetUSers,GetAllowUser, updateUser } from "../../../../api/users";
import { FiRefreshCw } from "react-icons/fi";

import { TbSortAscending } from "react-icons/tb";
import GiveAccessModal from "../GiveAccessModal";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
const UserAccess = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const GetUsers = async () => {
    const payload = {
      allowpost: "true",
    };
    await props.GetUSerAPI(payload);
  };
  useEffect(() => {
    GetUsers();
  }, []);
  const debouncedSearch = useCallback(
    debounce((text, tabs) => {
      // Perform your search logic here, e.g., make an API call
      if (tabs == "Useraccess") {
        const payload = {
          Search: text,
          allowpost: "true",
        };
        props.GetUSerAPI(payload);
      }
    }, 500),
    []
  );
  useEffect(() => {
    debouncedSearch(props.val.searchval, props.Currenttabs);
    // props.setActiveTabsApi(props.Currenttabs);
  }, [props.Currenttabs, props.val.searchval]);
  const [EMPL_ID, setEMPLID] = useState([]);
  const GiveAccess = async () => {
    if (EMPL_ID.length == 0) {
      return alert("Please sellect users first");
    }
    const payload = {
      allowPost:"true",
      EMPL_ID: EMPL_ID,
    };
    await props.UpdateUserAPI(payload);
    await GetUsers();
    onClose()
  };
  const cancleAccess = async () => {
    const payload = {
      allowPost: "false",
      EMPL_ID: EMPL_ID,
    };
    await props.UpdateUserAPI(payload);
    onClose()
    await GetUsers();
  };
  const cancleSingleuser = async (val) => {
    // await cancleAccess()
    let arrid = [];
    arrid.push(val.UserID);
    const payload = {
      allowPost: "false",
      EMPL_ID:arrid,
    };
    await props.UpdateUserAPI(payload);
    await GetUsers();
  };
  const accesssingleuser = async (val) => {
    let arrid = [];
    arrid.push(val.EMPL_ID);
    const payload = {
      allowPost: "true",
      EMPL_ID: arrid,
    };
    await props.UpdateUserAPI(payload);
    await GetUsers();
  };
  function GetUSerID(userid) {
    setEMPLID(userid);
  }

  const handlePageClick = (data) => {
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalHeader
            color="white"
            fontWeight="500"
            py="3"
            fontSize="16px"
            backgroundColor="#053c6d"
            borderTopRadius="10px"
            className="bg-button"
          >
            Give Access
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <GiveAccessModal passuserid={GetUSerID} />
          </ModalBody>
          <ModalFooter className="grid grid-cols-2 gap-4">
            {/* <Button variant="outline" w="100%" color="cprimary.800">
              Cancel
            </Button> */}
            <Button className="outline-button" w="100%" variant="outline"  >
              Cancel
            </Button>

            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              w="100%"
              onClick={GiveAccess}
              className="bg-button"
            >
              Give Access
            </Button>
            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              w="100%"
              className="bg-button"
              onClick={cancleAccess}
            >
              cancel Access
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="user-access-container p-4">
        <div className="flex justify-between">
          <h3 className="flex justify-center items-center hdr-title">
            Accessed User
          </h3>
          <div className="flex gap-2">
            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              className="text-center bg-button"
              onClick={onOpen}
            >
              Give Access
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
                    <FiRefreshCw className="mx-auto text-2xl" />
                  </Button>
            {/* <Button
              p="2"
              color="cprimary.500"
              fontWeight="500"
              variant="solid"
              className="text-center "
              height="10"
            >
              <TbSortAscending className="mx-auto text-2xl" />
            </Button> */}
          </div>
        </div>
        {/* <p className="hdr-subttl">{props.allowuser.length} Users</p> */}
        <div className="w-full mt-4">
          <div className="grid grid-cols-3 gap-4 auto-scroll">
            {props ? (
              props.allowuser.length > 0 ? (
                props.allowuser.map((val) => {
                  return (
                    <>
                    {val.UserID?(<div className="border px-2 py-5 rounded-md card-shadoww relative">
                        {
                          val.allowPost?(    val.allowPost.trim() == "true" ? (
                          <p
                            className="text-xs text-red-600 font-semibold absolute right-3 top-2 cursor-pointer"
                            onClick={() => cancleSingleuser(val)}
                          >
                            Remove access
                          </p>
                        ) : null):(null)
                        }
                        <div className="flex gap-3">
                          <div className="flex justify-center items-center pl-2">
                            <Avatar
                              size="lg"
                              name="Dan Abrahmov"
                              src="https://bit.ly/dan-abramov"
                            />
                          </div>
                      
                          <div className="w-full my-auto">
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-lg font-semibold">
                              {val.FirstName}   {val.LastName}
                              </p>
                            </div>
                            <span className="text-md text-grey font-medium">
                              {val.MobileNo}&nbsp;&nbsp;|&nbsp;&nbsp;
                            </span>
                            <span className="text-md text-primary font-medium">
                              {val.EMail1 || val.EMail2 }
                            </span>
                          </div>
                        </div>
                      </div>):(null)}
                 
                    </>
                  );
                })
              ) : (
                <div className="">Users Not Available</div>
              )
            ) : (
              <div className="">Users Not Available</div>
            )}
          </div>
          {/* <ReactPaginate
            previousLabel={"previous"}
            className="flex justify-end"
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          /> */}
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    GetUSerAPI: (payload) => dispatch(GetAllowUser(payload)),
    UpdateUserAPI: (payload) => dispatch(updateUser(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    usersdata: state?.users?.data,
    allowuser: state?.users?.allowuser,
    Currenttabs: state.tabs.ActiveTabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccess);
