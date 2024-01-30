import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  InputLeftElement,
  Input,
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useTabs,
  TableContainer,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import no_events from "../../../../assets/img/events/no_events.svg";
import { FiRefreshCw } from "react-icons/fi";
import ReactPaginate from "react-paginate";
// import {  } from "react-csv/components/Download";
import { v4 as uuidv4 } from "uuid";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import Banner from "../../../../assets/img/banner2.png";
import { BsThreeDots, BsDot } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { SetActiveTabs, downloadUser } from "../../../../api/community";
import Loder from "../../../Loder/Loder";
import Swal from "sweetalert2";
// import XLSX from 'xlsx';
// import downloadexcel from "./Downloadexcel"
// import Downloadexcel from "../../../../utility";
import { saveAs } from "file-saver";
import {
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent,
  registeruser,
} from "../../../../api/community";
import { useHistory } from "react-router-dom";
// import { createEvent } from "../../../../api/community";
import { debounce } from "lodash";
// import { downloaduser } from "../../../../store/community/post";
import Utils from "../../../../utility";

function EventsTab(props) {
  const [TopicName, setTopicName] = useState("");
  const [date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [Event_ID, setEvent_ID] = useState("");
  const [Duration, setDuration] = useState("");
  const [Description, setDescription] = useState("");
  const [MeetingLink, setMeetingLink] = useState("");
  const [images, setImages] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [loder, setloder] = useState(false);
  const [eventid, setecentid] = useState(null);
  const [search, setSearch] = useState("");
  const {
    isOpen: isOpenOne,
    onOpen: onOpenOne,
    onClose: onCloseOne,
  } = useDisclosure();
  const {
    isOpen: isOpenUserModal,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();
  const getSuccessMessage = (type, messga) => {
    setTimeout(() => {
      Swal.fire({
        icon: type,
        title: messga,
        showConfirmButton: false,
        timer: 2000,
      });
    }, []);
  };
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [offset, setOffset] = useState(1);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  async function getEventdata() {
    const payload = {
      Search: "",
      startdate: startdate || "",
      enddate: enddate || "",
    };

    // if(startdate!=null) Object.assign(payload,{startdate:startdate})
    await props.getEventAPI(payload);
    //  if(data.payload.data.status=="403"){
    //   history.push('/login');
    //  }
  }
  useEffect(() => {
    getEventdata();
  }, []);
  useEffect(() => {
    if (startdate != null && enddate != null) {
      getEventdata();
    }
  }, [startdate, enddate]);

  const Searchusers = async () => {
    const payload = {
      eventid: eventid,
      Search: search || "",
    };

    await props.registeruserAPI(payload);
  };

  useEffect(() => {
    Searchusers();
  }, [search]);

  const debouncedSearch = useCallback(
    debounce((text, tabs) => {
      // Perform your search logic here, e.g., make an API call
      const payload = {
        Search: text,
      };
      if (tabs === "Event") {
        props.getEventAPI(payload);
      }
    }, 500),
    []
  );
  useEffect(() => {
    debouncedSearch(props.val.searchval, props.Currenttabs);
    // props.setActiveTabsApi(props.Currenttabs)
  }, [props.Currenttabs, props.val.searchval]);

  const addEvent = async (value) => {
    let payload = {
      EMPL_ID: "360076",
      TopicName: TopicName,
      Date: date,
      Time: Time,
      Duration: Duration,
      image: images[0].file,
      Description: Description,
      MeetingLink: MeetingLink,
    };
    await props.createEventAPI(payload);
    payload = {
      Search: "",
    };
    await props.getEventAPI(payload);
    setImages([]);
    onClose();
  };
  const confirmdelete = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  };
  const deleteEvent = async (value) => {
    let result = await confirmdelete();
    if (result.isConfirmed == true) {
      let payload = {
        Event_ID: value,
      };
      await props.delEventAPI(payload);
      payload = {
        Search: "",
      };
      await props.getEventAPI(payload);
      onClose();
    }
  };
  const clearfilter = async () => {
    setstartdate("");
    setenddate("");
    await getEventdata();
  };
  const updateValues = async (value) => {
    setTopicName(value.TopicName);
    setDate(value.Date);
    setTime(value.Time);
    setDuration(value.Duration);
    setDescription(value.Description);
    setMeetingLink(value.MeetingLink);
    setEvent_ID(value.Event_ID);
    setIsEdit(false);
    setImages([value.UploadBanner]);
    onOpenOne();
  };

  const updateEvent = async () => {
    let payload = {
      Event_ID: Event_ID,
      EMPL_ID: "360076",
      TopicName: TopicName,
      Date: date,
      Time: Time,
      Duration: Duration,
      image: images[0].file || images,
      Description: Description,
      MeetingLink: MeetingLink,
    };

    await props.updateEventAPI(payload);
    payload = {
      Search: "",
    };
    await props.getEventAPI(payload);
    getSuccessMessage("success", "Event Updated");
    Rest();
    setIsOpen(false);
  };
  const Rest = async (value) => {
    setTopicName("");
    setDate("");
    setTime("");
    setDuration("");
    setDescription("");
    setMeetingLink("");
    setImages([]);
    onCloseOne();
    // onClose();
  };
  const handlepagechange = async (item) => {
    let page = item.selected + 1;
    const curoffset = page > 1 ? (page - 1) * 6 : 1;
    const payload = { page: curoffset, Search: "", Role: "User" };
    setOffset(curoffset);
    let responce = await props.getEventAPI(payload);
    await callapis();
  };
  const openregisteruser = async (val) => {
    if (props.registeruser.length > 0) {
      setecentid(val.Event_ID);

      setIsOpen(true);
    }

    const payload = {
      eventid: val.Event_ID,
    };
    // if(Search)
    await props.registeruserAPI(payload);
  };
  var pageCount;
  if (props.Events.length > 0) {
    pageCount = Math.ceil(props.Events[0].TOTAL_COUNT / 6);
  }
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const downloadsusers = async (val) => {
    const currdate = new Date();
    let fulltime = `${currdate.toLocaleDateString()} ${currdate.getHours()}:${currdate.getMinutes()}`;

    setloder(true);
    const payload = {
      event_id: val.Event_ID,
    };
    let responce = await props.downloadUserAPI(payload);
    if (responce.payload.data.data.Responsecode == 100) {
    
      await Utils.Downloadexcel(responce.payload.data.data.data,`Registers_User Event (${val.TopicName})${fulltime}`)

    }
  };
  // function saveAsExcel(buffer, filename) {
  //   const EXCEL_TYPE =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const EXCEL_EXTENSION = ".xlsx";
  //   const data = new Blob([buffer], { type: EXCEL_TYPE });
  //   saveAs(data, filename + EXCEL_EXTENSION);
  // }
  // if(loder){
  //   return <Loder/>
  // }
  const getfulldate = (datetime) => {
    const timestamp = datetime;
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are 0-indexed, so we add 1.
    const day = dateObject.getDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const milliseconds = dateObject.getUTCMilliseconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    let curtime = `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
    return curtime;
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color="white"
            fontWeight="500"
            py="3"
            fontSize="16px"
            backgroundColor="#053c6d"
            borderTopRadius="10px"
          >
            Registered Users
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <InputGroup className="pb-2">
              <InputLeftElement pointerEvents="none" height="10">
                <FiSearch color="inherit" height="10" />
              </InputLeftElement>
              <Input
                type="text"
                value={search}
                placeholder="Search"
                height="10"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <TableContainer className="container-remove">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Employee ID</Th>
                    <Th>Name</Th>
                    <Th>Contact</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {props.registeruser.length > 0
                    ? props.registeruser.map((val, index) => {
                        return (
                          <>
                            <Tr key={index}>
                              <Td>{val.empId}</Td>
                              <Td>{val.EMPL_NAME}</Td>
                              <Td>{val.MobileNo}</Td>
                            </Tr>
                          </>
                        );
                      })
                    : null}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenOne} onClose={onCloseOne} isCentered>
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
            Create Event
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pt={4} pb={2}>
            <FormControl>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Topic Name
              </FormLabel>
              <Input
                placeholder="Enter Topic Name"
                onChange={(e) => setTopicName(e.target.value)}
                name="topic"
                value={TopicName}
              />
            </FormControl>
            <div className="grid gap-2 grid-cols-2 mt-4">
              <FormControl>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Date
                </FormLabel>
                <Input
                  placeholder="Select Date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                  value={date}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Time
                </FormLabel>
                <Input
                  placeholder="Add Time"
                  onChange={(e) => setTime(e.target.value)}
                  name="time"
                  type="time"
                  value={Time}
                />
              </FormControl>
              <FormControl mt={4} className="bg-custom">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Duration
                </FormLabel>
                <Input
                  placeholder="00:00 hrs"
                  className="bg-gray-100"
                  onChange={(e) => setDuration(e.target.value)}
                  name="duration"
                  value={Duration}
                />
              </FormControl>
            </div>
            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Upload banner image
              </FormLabel>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "svg", "jpeg", "GIF"]}
                maxFileSize={5000000}
                onError={(errors) => {
                  if (errors.maxNumber) {
                    getSuccessMessage(
                      "warning",
                      "You have exceeded the maximum number of allowed images"
                    );
                  }
                  if (errors.acceptType) {
                    getSuccessMessage(
                      "warning",
                      "Only JPG,svg,jpeg,GIF and PNG files are allowed."
                    );
                  }
                  if (errors.maxFileSize) {
                    getSuccessMessage(
                      "warning",
                      "File size exceeds the maximum limit of 5 MB."
                    );
                  }
                }}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    {images ? (
                      images.length > 0 ? (
                        images[0].data_url ? (
                          ""
                        ) : (
                          ""
                        )
                      ) : (
                        <button
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                          className="h-32 w-full border-dashed border-2 border-primary rounded-md flex "
                        >
                          <div className="m-auto flex flex-wrap">
                            <div className="bg-primary flex rounded-full p-2 mx-auto">
                              <FiUpload className="text-white" />
                            </div>
                            <p className="text-primary font-semibold w-full text-sm pt-1">
                              Upload here
                            </p>
                          </div>
                        </button>
                      )
                    ) : (
                      ""
                    )}
                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="w-full relative h-32 border rounded-md"
                      >
                        <img
                          src={image.data_url || image}
                          alt="UploadeImage"
                          className="w-full h-full rounded-md "
                        />
                        {/* <div className="image-item__btn-wrapper grid grid-cols-2 gap-2"> */}
                        {/* <button
                            onClick={() => onImageUpdate(index)}
                            className="text-center"
                          >
                            Update
                          </button> */}
                        <button
                          onClick={() => onImageRemove(index)}
                          className="text-center absolute top-0 right-0 bg-white"
                        >
                          <GrFormClose className="text-primary text-2xl" />
                        </button>
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Agenda / Description
              </FormLabel>
              <Textarea
                placeholder="Enter Your Agenda In Detail"
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                value={Description}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Meeting Link
              </FormLabel>
              <Input
                placeholder="Add Meeting Link"
                onChange={(e) => setMeetingLink(e.target.value)}
                name="link"
                value={MeetingLink}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className="grid grid-cols-2 gap-4">
            <Button
              onClick={onCloseOne}
              variant={"outline"}
              w="100%"
              color="cprimary.500"
            >
              Delete
            </Button>

            {isEdit ? (
              <Button
                bg="cprimary.500"
                color="white"
                fontWeight="500"
                _hover={{ bg: "cprimary.600" }}
                variant="solid"
                w="100%"
                onClick={addEvent}
                className="bg-button"
              >
                Create
              </Button>
            ) : (
              <Button
                bg="cprimary.500"
                color="white"
                fontWeight="500"
                _hover={{ bg: "cprimary.600" }}
                variant="solid"
                w="100%"
                onClick={updateEvent}
                className="bg-button"
              >
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <div className="py-6 px-2">
        <p class="category-ttl">Today’s Events</p>
        <div className="py-6 px-2 flex justify-center flex-col">
          <img src={no_events} className="h-56" />
          <div className="flex justify-center">
            <Button
              className="mt-6"
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              onClick={Rest}
            >
              Create Event
            </Button>
          </div>
        </div>
      </div> */}

      <div className="py-6 px-2">
        <div className="flex justify-between items-center">
          <p className="category-ttl"> </p>
          {/* <p className="category-ttl">Today’s Events</p> */}

          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <label htmlFor="">From</label>
              <Input
                type="date"
                value={startdate}
                onChange={(e) => setstartdate(e.target.value)}
                max={enddate}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="">To</label>
              <Input
                type="date"
                value={enddate}
                onChange={(e) => setenddate(e.target.value)}
                min={startdate}
              />
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
            {/* <Button
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
            </Button> */}
          </div>
        </div>
        <div className="py-6 grid grid-cols-2 gap-4">
          {props ? (
            props.Events ? (
              props.Events.length > 0 ? (
                props.Events.map((x, i) => {
                  return (
                    <>
                      <div className="bgF3F9FF p-4 rounded-lg" key={uuidv4()}>
                        <div className="flex justify-between items-center">
                          <div className="flex justify-between items-center">
                            <p className="ml-2 text-grey font-medium">
                              {console.log(x, "dddd")}
                              {getfulldate(x.CreatedDate)}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <Button
                              bg="cprimary.500"
                              color="white"
                              fontWeight="500"
                              _hover={{ bg: "cprimary.600" }}
                              variant="solid"
                              onClick={() => openregisteruser(x)}
                              className="bg-button mr-2"
                            >
                              Registered users
                              <span className="ml-2">({x.registeruser})</span>
                            </Button>
                            {x.registeruser > 0 ? (
                              <Button
                                bg="cprimary.500"
                                color="white"
                                fontWeight="500"
                                _hover={{ bg: "cprimary.600" }}
                                variant="solid"
                                onClick={() => downloadsusers(x)}
                                className="bg-button "
                              >
                                Download user list
                                {/* <span className="ml-2">{x.registeruser}</span> */}
                              </Button>
                            ) : null}

                            <TbEdit
                              className="text-primary text-2xl mx-2 cursor-pointer"
                              onClick={() => {
                                updateValues(x);
                              }}
                            />
                            <RiDeleteBinLine
                              className="text-primary mx-2 text-xl cursor-pointer"
                              onClick={() => {
                                deleteEvent(x.Event_ID);
                              }}
                            />
                          </div>
                        </div>
                        <div className="mt-4 rounded-xl bg-white border">
                          <p className="font-semibold text-base py-2 px-4">
                            {x.TopicName}
                          </p>
                          <img
                            src={x ? x.UploadBanner : Banner}
                            alt="Events"
                            className="w-full h-54 border"
                          />
                          <p className="text-xs font-medium py-2 px-4 text-grey">
                            {x.Description}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div>No Events To Show</div>
              )
            ) : (
              <div>No Events To Show</div>
            )
          ) : (
            <div>No Events To Show</div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-1 px-5">
        <ReactPaginate
          previousLabel={"<"}
          className="flex justify-end"
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={6}
          pageRangeDisplayed={6}
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
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventAPI: (payload) => dispatch(getEvent(payload)),
    createEventAPI: (payload) => dispatch(createEvent(payload)),
    delEventAPI: (payload) => dispatch(deleteEvent(payload)),
    updateEventAPI: (payload) => dispatch(updateEvent(payload)),
    setActiveTabsApi: (payload) => dispatch(SetActiveTabs(payload)),
    registeruserAPI: (payload) => dispatch(registeruser(payload)),
    downloadUserAPI: (payload) => dispatch(downloadUser(payload)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    Events: state?.Event?.data,
    Currenttabs: state.tabs.ActiveTabs,
    registeruser: state.Event.registeruser,
    EventUsers: state.Event.EventUsers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsTab);
