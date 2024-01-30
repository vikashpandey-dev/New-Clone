import React, { useEffect, useCallback, useState } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import ModalAddStory from "../stories/component/ModalAddStory";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { GetUSers, GetAllowUser, updateUser } from "../../api/users";
import Swal from "sweetalert2";
import utility from "../../utility";
import ModalNotification from "./components/ModalNotification";
import { uploadexcel } from "../../api/Notification";
const Notification = (props) => {
  const {
    isOpen: isOpenNotification,
    onOpen: onOpenNotification,
    onClose: onCloseNotification,
  } = useDisclosure();
  const {
    isOpen: isOpenStory,
    onOpen: onOpenStory,
    onClose: onCloseStory,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [excel, setexcel] = useState(null);
  const GetUsers = async () => {
    const payload = {};
    if (search) {
      Object.assign(payload, { Search: search });
    }
    if (offset) {
      Object.assign(payload, { setoffset: offset });
    }
    await props.GetUSerAPI(payload);
  };
  const closepopup = async (data) => {
    if (data.close == true) {
      setSelectedCheckboxes([]);
      onCloseNotification();
    }
    const [emplid, setemplid] = useState([]);
  };
  useEffect(() => {
    GetUsers();
  }, []);
  function mydebouncefun(call, d) {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        call();
      }, d);
    };
  }
  const debouncedGetUsers = mydebouncefun(GetUsers, 2000);
  useEffect(() => {
    debouncedGetUsers(); 
    return () => {
      clearTimeout(debouncedGetUsers);
    };
  }, [search]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handlecheckbox = (checkedValue) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(checkedValue)) {
        return prevSelected.filter((value) => value !== checkedValue);
      } else {
        return [...prevSelected, checkedValue];
      }
    });
  };
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(props.allowuser.map((option) => option.UserID));
    }
    setSelectAll(!selectAll);
  };
  var pageCount;
  if (props.allowuser.length > 0) {
    pageCount = Math.ceil(props.allowuser[0].TOTAL_USER / 20);
  }
  const handlepagechange = async (item) => {
    let page = item.selected + 1;
    const curoffset = page > 1 ? (page - 1) * 20 : 1;
    setOffset(curoffset);
    await GetUsers();
  };
  const clearfilter = async () => {
    setOffset(0);
    setSearch("");
    await GetUsers();
  };
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const uploadexcelfile = async () => {
    if (excel == null) {
      return getmessage("Please Choose File", "warning");
    }
    const payload = {
      image: excel,
    };
    let responce = await props.uploadexcelAPI(payload);
  };
  const chooseexcel = (e) => {
    setexcel(e.target.files[0]);
  };
  const getmessage = (message, type) => {
    Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const downloadsample = () => {
    const sample = [
      {
        id: "360076",
        title: "test title",
        message: "test message",
        trigerdate: "2302-12-19",
        trigertime: "20:10",
      },
    ];
    utility.Downloadexcel(sample, "notificationsample");
  };
  return (
    <div className="p-8">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Select Excel</FormLabel>
              <Input
                ref={initialRef}
                onChange={chooseexcel}
                accept=".xlsx"
                type="file"
                placeholder="First name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className="modelf">
            <Button colorScheme="blue" onClick={downloadsample}>
              Download Sample
            </Button>
            <div>
              <Button colorScheme="blue" mr={3} onClick={uploadexcelfile}>
                Upload
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenNotification}
        onClose={onCloseNotification}
        isCentered
      >
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
            Notification
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <ModalNotification
              EMPLI_D={selectedCheckboxes}
              alert={closepopup}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="flex justify-between items-center">
        <h1 className="category-ttl">Manage Notification</h1>
        <div className="flex gap-2">
          <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            onClick={onOpen}
          >
            Upload Excel
          </Button>
          <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            onClick={onOpenNotification}
          >
            Send Notification
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-8 justify-between w-full mt-4">
        <div className="flex gap-4 w-1/2">
          <Select placeholder="Select Location">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div className="flex justify-end w-1/2 gap-2">
          <div className="w-2/5">
            <InputGroup>
              <InputLeftElement pointerEvents="none" height="10">
                <FiSearch color="inherit" height="6" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search, Name, Email, Id"
                height="10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
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
            <FiRefreshCw className="mx-auto text-2xl" onClick={clearfilter} />
          </Button>
        </div>
      </div>
      {/* <div className="mt-6 w-1/2">
        <form>
          <div className="my-2">
            <FormLabel>Enter Your ID</FormLabel>
            <Input type="text" />
          </div>
          <div className="my-2">
            <FormLabel>Enter Your Name</FormLabel>
            <Input type="text" />
          </div>
          <div className="my-2">
            <FormLabel>Enter Your Email</FormLabel>
            <Input type="email" />
          </div>
        </form>
      </div> */}
      <div className="mt-6 table-holder">
        <TableContainer
          border={"1px"}
          borderColor={"#CBD5E0"}
          borderRadius={"md"}
        >
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>
                  <input
                    onChange={handleSelectAllChange}
                    className="cursor-pointer"
                    type="checkbox"
                  />
                </Th>
                <Th>Employee ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.allowuser.length > 0
                ? props.allowuser.map((val) => {
                    return (
                      <>
                        <Tr>
                          <Td>
                            <input
                              className="cursor-pointer"
                              checked={selectedCheckboxes.includes(val.UserID)}
                              onChange={() => handlecheckbox(val.UserID)}
                              type="checkbox"
                            />
                          </Td>
                          <Td>{val.UserID}</Td>
                          <Td>{`${val.FirstName}' ' ${val.LastName} `}</Td>
                          <Td>{val.EMail1 || val.EMail2}</Td>
                          <Td>{val.MobileNo}</Td>
                        </Tr>
                      </>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex mt-4 justify-end gap-1 px-5">
        <ReactPaginate
          previousLabel={"<"}
          className="flex justify-end"
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlepagechange}
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
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetUSerAPI: (payload) => dispatch(GetAllowUser(payload)),
    UpdateUserAPI: (payload) => dispatch(updateUser(payload)),
    CreateNotificationAPI: (payload) => dispatch(CreateNotification(payload)),
    CreateStoryAPI: (payload) => dispatch(CreateStory(payload)),
    uploadexcelAPI: (payload) => dispatch(uploadexcel(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    usersdata: state?.users?.data,
    allowuser: state?.users?.allowuser,
    Currenttabs: state.tabs.ActiveTabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
