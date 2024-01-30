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
import _ from "lodash";
import { FiSearch } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import ModalAddStory from "../stories/component/ModalAddStory";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { GetUSers, GetAllowUser, updateUser } from "../../api/users";
import {
  AllNotification,
  DownloadAllNotification,
} from "../../api/Notification";
import Swal from "sweetalert2";
// import ModalNotification from "./components/ModalNotification";
import moment from "moment";
import utility from "../../utility";
const ManageNotification = (props) => {
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
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [status, setstatus] = useState(null);

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
      setSelectedCheckboxes(
        props.AllNotification.map((option) => option.EMPL_ID)
      );
    }
    setSelectAll(!selectAll);
  };
  var pageCount;
  if (props.AllNotification.length > 0) {
    pageCount = Math.ceil(props.AllNotification[0].totalcount / 20);
  }
  const handlepagechange = async (item) => {
    let page = item.selected + 1;
    const curoffset = page > 1 ? (page - 1) * 20 : 0;
    setOffset(curoffset);
    await GetNotification();
  };
  const clearfilter = async () => {
    setOffset(0);
    setSearch("");
    setstatus("");
    await GetNotification();
  };
  const GetNotification = async () => {
    console.log(status);
    const payload = {};
    if (offset) {
      Object.assign(payload, { offset: offset });
    }
    if (search) {
      Object.assign(payload, { search: search });
    }
    if (status) {
      Object.assign(payload, { status: status });
    }
    await props.AllNotificationAPI(payload);
  };
  useEffect(() => {
    GetNotification();
  }, [search]);
  useEffect(() => {
    GetNotification();
  }, []);

  const handloeselect = (event) => {
    // setstatus(null)
    setstatus(event.target.value);
    // GetNotification();
  };
  useEffect(() => {
    GetNotification();
  }, [status]);
  const getmydate = (mydate) => {
    const parsedDate = moment(mydate);
    // Format the date as "dddd MMMM Do YYYY h:mm a"
    const newFormattedDate = parsedDate.format("dddd MMMM Do YYYY h:mm a");
    return newFormattedDate;
  };
  const DownloadselectUser = () => {
    if (selectedCheckboxes.length == 0)
      return getSuccessMessage("warning", "Please Select User First");

    const getRecordsByIds = (ids, data) => {
      const filteredData = data.filter((item) => ids.includes(item.EMPL_ID));
      return filteredData.map(
        ({ EMPL_ID, title, message, createdAt, status }) => ({
          EMPL_ID,
          title,
          message,
          createdAt,
          status,
        })
      );
    };

    // Get records using the ID array and data array
    const result = getRecordsByIds(selectedCheckboxes, props.AllNotification);
    utility.Downloadexcel(result, "NotificationUser");
  };
  const getSuccessMessage = (type, messga) => {
    Swal.fire({
      icon: type,
      title: messga,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const DownloadallUser = async () => {
    const payload = { alldetail: true };
    let data = await props.DownloadAllNotificationAPI(payload);
    if (data.payload.length > 0) {
      await utility.Downloadexcel(data.payload, "NotificationUser");
    }
  };
  useEffect(() => {});

  return (
    <div className="p-8">
      {/* <div className="flex justify-between items-center">
        <h1 className="category-ttl">Manage Notification</h1>
        <div className="flex gap-2">
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
      </div> */}
      <div className="flex items-center gap-8 justify-between w-full mt-4">
        <div className=" gap-4 w-1/4">
          {/* <label htmlFor="statusDropdown">Select Status</label> */}
          <Select placeholder="Select Status" onChange={handloeselect}>
            <option value="Success">Success</option>
            <option value="Not Triggered">Not Triggered</option>
            <option value="Fail">Fail</option>
          </Select>
        </div>
        <div className="flex justify-end w-1/2 gap-2">
          <div className="flex ">
            <button
              className=" mr-2 text-normal  downloaduser text-white"
              onClick={DownloadselectUser}
            >
              Download User
            </button>
            <button
              className=" text-normal  downloaduser text-white"
              onClick={DownloadallUser}
            >
              Download All User
            </button>
          </div>
          <div className="w-2/5">
            <InputGroup>
              <InputLeftElement pointerEvents="none" height="10">
                <FiSearch color="inherit" height="6" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search, Name, Id, title, message"
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
        {/* <TableContainer
          border={"1px"}
          borderColor={"#CBD5E0"}
          borderRadius={"md"}
        > */}
        <table>
          <thead className="tablehead">
            <tr>
              <th className="w-1/12 text-left py-3 px-3">
                <input
                  onChange={handleSelectAllChange}
                  className="cursor-pointer"
                  type="checkbox"
                />
              </th>
              <th className="w-1/12 text-left py-3 px-2">Employee ID</th>
              <th className="w-2/12 text-left py-3 px-2">Name</th>
              <th className="w-1/12 text-left py-3 px-2">Title</th>
              <th className="w-2/12 text-left py-3 px-2">Message</th>
              <th className="w-2/12 text-left py-3 px-2">Status</th>
              <th className="w-3/12 text-left py-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {props.AllNotification.length > 0
              ? props.AllNotification.map((val) => {
                  return (
                    <>
                      <tr>
                        <td className="tableborder py-4 px-3">
                          <input
                            className="cursor-pointer "
                            checked={selectedCheckboxes.includes(val.EMPL_ID)}
                            onChange={() => handlecheckbox(val.EMPL_ID)}
                            type="checkbox"
                          />
                        </td>
                        <td className="tableborder py-4 px-3">{val.EMPL_ID}</td>
                        <td className="tableborder py-4 px-3">{val.Name}</td>
                        <td className="tableborder py-4 px-3">{val.title}</td>
                        <td className="tableborder py-4 px-3">{val.message}</td>
                        <td className="tableborder py-4 px-3">{val.status}</td>
                        <td className="tableborder py-4 px-3">
                          {getmydate(val.createdAt)}
                        </td>
                      </tr>
                    </>
                  );
                })
              : null}
          </tbody>
        </table>
        {/* </TableContainer> */}
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
    AllNotificationAPI: (payload) => dispatch(AllNotification(payload)),
    DownloadAllNotificationAPI: (payload) =>
      dispatch(DownloadAllNotification(payload)),

    GetUSerAPI: (payload) => dispatch(GetUSers(payload)),
    UpdateUserAPI: (payload) => dispatch(updateUser(payload)),
    CreateNotificationAPI: (payload) => dispatch(CreateNotification(payload)),
    CreateStoryAPI: (payload) => dispatch(CreateStory(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    usersdata: state?.users?.data,
    allowuser: state?.users?.allowuser,
    Currenttabs: state.tabs.ActiveTabs,
    AllNotification: state.Notification.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNotification);
