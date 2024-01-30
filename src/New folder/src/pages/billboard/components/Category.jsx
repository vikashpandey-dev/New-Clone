import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputLeftElement,
  Input,
  InputGroup,
  InputRightAddon,
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
  Select,
  useTabs,
  ChakraProvider,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import ImageUploading from "react-images-uploading";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import moment from "moment";
// import { BiPlus } from "react-icons/bi";
// import { BsThreeDots } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
import { BsFillArrowRightCircleFill, BsDot } from "react-icons/bs";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Banner from "../../../assets/img/banner.png";
// import { useEffect, useState } from "react";
import {
  getBillboard,
  updateBillboard,
  deleteBillboard,
} from "../../../api/billBoard";
import {
  getBanner,
  updateBanner,
  deleteBanner,
  handletabs,
} from "../../../api/banner";
import { handletoggletabse } from "../../../api/banner";
import Swal from "sweetalert2";
function Category(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [textcolor, setTextcolor] = useState("red");
  const [buttontext, setButtontext] = useState("");
  const [buttonurl, setButtonurl] = useState("url");
  const [buttoncolor, setButtoncolor] = useState("Green");
  const [search, setSearch] = useState("");
  const [billboard, setbillboard] = useState(true);
  const [banner, setbanner] = useState(false);
  const [bannerdate, setBannerdate] = useState(null);
  const [billboarddate, setbillboarddate] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const payload = {
      Datefilter: bannerdate,
    };
    props.GetbannerAPI(payload);
  }, [bannerdate]);

  useEffect(() => {
    const payload = {
      Datefilter: billboarddate,
    };
    props.getBillboardAPI(payload);
  }, [billboarddate]);
  async function getBillboardata() {
    await props.getBillboardAPI({
      isdeleated: "0",
    });
  }
  const GetBanner = async () => {
    await props.GetbannerAPI();
  };
  useEffect(() => {
    getBillboardata();
    GetBanner();
  }, []);

  useEffect(() => {
    if (billboard == true) {
      const payload = {
        Search: search,
      };
      props.getBillboardAPI(payload);
    }
    if (banner == true) {
      const payload = {
        Search: search,
      };
      props.GetbannerAPI(payload);
    }
  }, [search]);

  const maxNumber = 1;
  const onChange = (imageList) => {
    setImages(imageList);
  };

  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const { isOpen: isOpenHomeBanner } = useDisclosure();
  const [BTitle, setBTitle] = useState("");
  const [BTextcolor, setBTextcolor] = useState("");
  const [BButtontext, setBButtontext] = useState("");
  const [BButtonurl, setBButtonurl] = useState("");
  const [BDescription, setBDescription] = useState("");
  const [BButtoncolor, setBButtoncolor] = useState("");
  const [openbanner, setopenbanner] = useState(false);
  const [openbillboard, setopenbillboard] = useState(false);
  const [billboardindex, setbillboardindex] = useState(false);
  const [buttonbg, setbuttonbg] = useState("Green");
  const onCloseHomeBanner = () => {
    setopenbanner(false);
  };
  const onOpenHomeBanner = async (value) => {
    setBTitle(value.title);
    setBTextcolor(value.textcolor);
    setBButtontext(value.buttontext);
    setBButtonurl(value.buttonurl);
    setBDescription(value.description);
    setBButtoncolor(value.buttoncolor);
    setbuttonbg(value.buttonbg);
    // setEvent_ID(value.Event_ID);
    // setIsEdit(false);
    setId(value.id);
    setImages([value.files]);
    setopenbanner(true);
  };
  const UpdateBanner = async () => {
    const payload = {
      description: BDescription,
      title: BTitle,
      textcolor: BTextcolor,
      butontext: BButtontext,
      bbuttonurl: BButtonurl,
      type: "image",
      bbuttoncolor: BButtoncolor,
      buttonbg: buttonbg,
      image: images[0].file || images,
      url: BButtonurl,
      id: id,
    };

    let update = await props.UpdateBannerAPI(payload);
    if (update.payload.status == 200) {
      setopenbanner(false);
    }
    await props.GetbannerAPI();
  };
  const updateValues = async (value, index) => {
    setTitle(value.title.trim());
    setTextcolor(value.textcolor.trim());
    setButtontext(value.buttontext.trim());
    setButtonurl(value.buttonurl.trim());
    setDescription(value.description.trim());
    setButtoncolor(value.buttoncolor.trim());
    if (index == 1) {
      setbillboardindex(true);
    }

    if (value.buttonbg) {
      setbuttonbg(value.buttonbg.trim());
    }

    // setEvent_ID(value.Event_ID);
    // setIsEdit(false);
    setId(value.id);
    setImages([value.image]);
    setopenbillboard(true);
  };

  const delBillboard = async (value) => {
    let payload = {
      id: value,
      isdeleated: 1,
      flag: false,
    };
    let result = await confirmdelete();
    if (result.isConfirmed == true) {
      await props.DeleteBillboardAPI(payload);
      await props.getBillboardAPI();
      onClose();
    }
  };
  const updateBillboard = async () => {
    let payload = {
      title: title,
      description: description,
      textcolor: textcolor,
      buttontext: buttontext,
      buttonurl: buttonurl,
      image: images[0].file || images,
      buttoncolor: buttoncolor,
      buttonbg: buttonbg,
      id: id,
      isdeleated: "0",
    };
    await props.updateBillboardAPI(payload);
    setbillboardindex(false);
    await props.getBillboardAPI({
      isdeleated: "0",
    });
    setopenbillboard(false);
  };
  const falsehomebanner = () => {
    setActiveTab(0);
    setbanner(false);
    setbillboard(true);
    setSearch("");
    props.handletoggletabseAPI({
      toggletabs: false,
    });
  };
  const changeheddertab = () => {
    setActiveTab(1);
    setSearch("");
    props.handletoggletabseAPI({
      toggletabs: true,
    });
    setbanner(true);
    setbillboard(false);
  };
  const referecebillboard = async () => {
    setbillboarddate("");
    await props.getBillboardAPI({
      isdeleated: "0",
    });
  };
  const resethomebaner = async () => {
    setBannerdate("");
    await GetBanner();
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
  const handledelete = async (val) => {
    let result = await confirmdelete();
    const payload = {
      id: val.id,
    };
    if (result.isConfirmed == true) {
      try {
        let responce = await props.DeleteBannerAPI(payload);
        if (responce.payload == true) {
          await getSuccessMessage("success", "Banner Deleated");
          await props.GetbannerAPI();
        }
      } catch (err) {}
    }
  };
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    setTabIndex(props.settabs);
  }, [props.settabs]);
  const handleTabsChange = (index) => {
    const payload = {
      tabs: index,
    };
    props.handletabsAPI(payload);
    setTabIndex(index);
  };
  const onclosebillboard = () => {
    setopenbillboard(false);
    setbillboardindex(false);
  };
  // const handleopnebillboard=()=>{
  //   setopenbillboard(true)
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
    <div className="mt-4 tabs-top-border">
      <Modal isOpen={openbillboard} onClose={onclosebillboard} isCentered>
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
            Update Billboard
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <FormControl>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Upload image / allowed only jpg,svg,jpeg,gif png
              </FormLabel>
              <ImageUploading
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
              {/* </FormControl> */}
              {/* <FormControl mt={4}> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Title
                </FormLabel>
                <Input
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  value={title}
                />
              </div>
              {/* </FormControl> */}

              {/* <FormControl mt={4}> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Description
                </FormLabel>
                <Textarea
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                  name="desc"
                  value={description}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Url
                </FormLabel>
                <Input
                  placeholder="Enter URL"
                  value={buttonurl}
                  onChange={(e) => setButtonurl(e.target.value)}
                  disabled={billboardindex}
                />
              </div>
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Title
                </FormLabel>
                <Input placeholder="Enter Billboard Title" />
              </div> */}
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Description
                </FormLabel>
                <Textarea placeholder="Enter URL" />
              </div> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Button Color
                </FormLabel>
                <Input
                  placeholder="Enter URL"
                  type="color"
                  value={buttoncolor}
                  onChange={(e) => setButtoncolor(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard button background Color
                </FormLabel>
                <Input
                  placeholder="Billboard button background Color"
                  type="color"
                  value={buttonbg}
                  onChange={(e) => setbuttonbg(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Button Text
                </FormLabel>
                <Input
                  placeholder="Billboard Button Text"
                  value={buttontext}
                  onChange={(e) => setButtontext(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Text Color
                </FormLabel>
                <Input
                  placeholder=" Billboard Text Color"
                  type="color"
                  value={textcolor}
                  onChange={(e) => setTextcolor(e.target.value)}
                />
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter className="grid grid-cols-2 gap-4">
            <Button
              onClick={(()=>setopenbillboard(false))}
              variant={"outline"}
              w="100%"
              color="cprimary.500"
            >
              Delete
            </Button>

            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              w="100%"
              onClick={updateBillboard}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* //update banner details */}
      <Modal isOpen={openbanner} onClose={onCloseHomeBanner} isCentered>
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
            UPDATE HOMEBANNER
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <FormControl>
              {/* </FormControl> */}
              {/* <FormControl mt={4}> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Title
                </FormLabel>
                <Input
                  placeholder="Enter Title"
                  value={BTitle}
                  onChange={(e) => setBTitle(e.target.value)}
                />
              </div>
              {/* </FormControl> */}

              {/* <FormControl mt={4}> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Description
                </FormLabel>
                <Textarea
                  placeholder="Enter Description"
                  value={BDescription}
                  onChange={(e) => setBDescription(e.target.value)}
                />
              </div>
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Position
                </FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div> */}
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Type
                </FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div> */}
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Text Color
                </FormLabel>
                <Input
                  placeholder="Button Text"
                  type="color"
                  value={BTextcolor}
                  onChange={(e) => setBTextcolor(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Button Text
                </FormLabel>
                <Input
                  placeholder=" Button Text"
                  value={BButtontext}
                  onChange={(e) => setBButtontext(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Button Url
                </FormLabel>
                <Input
                  placeholder="Button url"
                  value={BButtonurl}
                  onChange={(e) => setBButtonurl(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Button Color
                </FormLabel>
                <Input
                  placeholder="Button Color"
                  type="color"
                  value={BButtoncolor}
                  onChange={(e) => setBButtoncolor(e.target.value)}
                />
              </div>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Button background Color
                </FormLabel>
                <Input
                  placeholder="Button background Color"
                  type="color"
                  value={buttonbg}
                  onChange={(e) => setbuttonbg(e.target.value)}
                />
              </div>
              <FormLabel
                mb="1"
                fontWeight={600}
                className="text-primary checkout"
              >
                Upload image / allowed only jpg,svg,jpeg,gif png
              </FormLabel>
              <ImageUploading
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
          </ModalBody>

          <ModalFooter className="grid grid-cols-2 gap-4">
            <Button
              onClick={(()=>setopenbanner(false))}
              variant={"outline"}
              w="100%"
              color="cprimary.500"
            >
              Delete
            </Button>

            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              w="100%"
              onClick={UpdateBanner}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ChakraProvider>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList
            border="2"
            justifyContent="space-between"
            className="items-center py-2 px-2"
            width="100%"
          >
            <div className="flex">
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={falsehomebanner}
              >
                Bill Board
              </Tab>
              <Tab
                _selected={{ color: "cprimary.500", fontWeight: "600" }}
                onClick={changeheddertab}
              >
                Home Banner
              </Tab>
              {/* <Tab _selected={{ color: "cprimary.500", fontWeight: "600" }}>
              Category 3
            </Tab>
            <Tab _selected={{ color: "cprimary.500", fontWeight: "600" }}>
              Category 4
            </Tab> */}
            </div>
            <div className="pr-4">
              {" "}
              <InputGroup>
                <InputLeftElement pointerEvents="none" height="10">
                  <FiSearch color="inherit" height="10" />
                </InputLeftElement>
                <Input
                  type="text"
                  value={search}
                  placeholder="Search, Title, Description"
                  height="10"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightAddon
                  children={<BsFillArrowRightCircleFill />}
                  height="10"
                  bg="white"
                />
              </InputGroup>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="py-6 px-2">
                <div className="flex justify-between items-center">
                  <p className="category-ttl">Bill Board</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={billboarddate}
                      onChange={(e) => setbillboarddate(e.target.value)}
                    />

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
                      <FiRefreshCw
                        className="mx-auto text-2xl"
                        onClick={referecebillboard}
                      />
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
                <div className="py-6 grid grid-cols-2 gap-4">
                  {props ? (
                    props.BillBoards ? (
                      props.BillBoards.length > 0 ? (
                        props.BillBoards.map((x, index) => {
                          return (
                            <>
                              <div
                                className="bgF3F9FF p-4 rounded-lg"
                                key={index}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex justify-between items-center">
                                    <p className="h-8 w-8 bg-lightblue flex rounded-full">
                                      <span className="text-primary text-base font-semibold m-auto">
                                        {index + 1}
                                      </span>
                                    </p>
                                    <p className="ml-2 text-grey font-medium">
                                      {getfulldate(x.date)}
                                    </p>
                                    {/* <p className="ml-2 text-grey font-medium">
                                    {x.title.slice(0,30)}...
                                  </p> */}
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center mr-2">
                                      <BsDot className="text-green text-3xl" />
                                      <p className="text-primary text-sm font-bold">
                                        Active
                                      </p>

                                      {/* <p className="text-primary text-sm font-bold ml-2">
                                    {x.buttontext}
                                    </p> */}
                                    </div>
                                    <TbEdit
                                      className="text-primary text-2xl mx-2 cursor-pointer"
                                      onClick={() => updateValues(x, index + 1)}
                                    />
                                    <RiDeleteBinLine
                                      className="text-primary mx-2 text-xl cursor-pointer"
                                      onClick={() => delBillboard(x.id)}
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 relative">
                                  <img
                                    src={x ? x.image : Banner}
                                    alt="Banner"
                                    className="w-full h-54 rounded-md"
                                  />
                                  <div className="absolute setposition text-white">
                                    <p style={{
                                     color:x.textcolor.trim()
                                    }} className=" text-grey font-medium">
                                      {x.title}
                                    </p>
                                    <Button
                                    style={{
                                      background:x.buttonbg.trim()
                                    }}
                                    className="mt-4 cursor-auto"
                                      color={` ${x.buttoncolor.trim()}`}
                                      fontWeight="500"
                                      _hover={{ bg: "cprimary.600" }}
                                      variant="solid"
                                    >
                                      <a href="www.google.com"></a>
                                      {x.buttontext.trim()}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <div>No Banners To Show</div>
                      )
                    ) : (
                      <div>No Banners To Show</div>
                    )
                  ) : (
                    <div>No Banners To Show</div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="py-6 px-2">
                <div className="flex justify-between items-center">
                  <p className="category-ttl">Home Banner</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={bannerdate}
                      onChange={(e) => setBannerdate(e.target.value)}
                    />
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
                      <FiRefreshCw
                        className="mx-auto text-2xl"
                        onClick={resethomebaner}
                      />
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
                <div className="py-6 grid grid-cols-2 gap-4">
                  {props ? (
                    props.bannerdata.length > 0 ? (
                      props.bannerdata.map((val, index) => {
                        return (
                          <>
                            <div
                              className="bgF3F9FF p-4 rounded-lg"
                              key={index}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex justify-between items-center">
                                  <p className="h-8 w-8 bg-lightblue flex rounded-full">
                                    <span className="text-primary text-base font-semibold m-auto">
                                      {index + 1}
                                    </span>
                                  </p>
                                  <p className="ml-2 text-grey font-medium">
                                    {getfulldate(val.createdAt)}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center mr-2">
                                    <BsDot className="text-green text-xl" />
                                    <p className="text-primary text-sm font-medium">
                                      Active
                                    </p>

                                    {/* <p className="text-primary text-sm font-medium ml-2">
                                  {val.buttontext}
                                  </p> */}
                                  </div>
                                  <TbEdit
                                    className="text-primary text-2xl mx-2 cursor-pointer"
                                    onClick={() => onOpenHomeBanner(val)}
                                  />
                                  <RiDeleteBinLine
                                    className="text-primary mx-2 text-xl cursor-pointer"
                                    onClick={() => handledelete(val)}
                                  />
                                </div>
                              </div>

                              <div className="mt-4 relative">
                             {   console.log(val,"valllxxxxxx")}
                                <img
                                  src={val.files}
                                  alt="Banner"
                                  className="w-full h-54 rounded-md"
                                />
                                {index!=1?( <div  className="absolute setposition text-white">
                                  <p style={{
                                     color:val.textcolor.trim()
                                    }}>{val.title}</p>
                                  <Button
                                    style={{
                                      background:val.buttonbg.trim()
                                    }}
                                    className="mt-4 cursor-auto"
                                      color={` ${val.buttoncolor.trim()}`}
                                      fontWeight="500"
                                      _hover={{ bg: "cprimary.600" }}
                                      variant="solid"
                                    >
                                      {val.buttontext.trim()}
                                    </Button>
                                </div>):(null)}
                               
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div>No Banner</div>
                    )
                  ) : (
                    <div>Banner Not Available</div>
                  )}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBillboardAPI: (payload) => dispatch(getBillboard(payload)),
    updateBillboardAPI: (payload) => dispatch(updateBillboard(payload)),
    handletoggletabseAPI: (payload) => dispatch(handletoggletabse(payload)),
    GetbannerAPI: (payload) => dispatch(getBanner(payload)),
    DeleteBannerAPI: (payload) => dispatch(deleteBanner(payload)),
    UpdateBannerAPI: (payload) => dispatch(updateBanner(payload)),
    DeleteBillboardAPI: (payload) => dispatch(deleteBillboard(payload)),
    handletabsAPI: (payload) => dispatch(handletabs(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    BillBoards: state?.billBoard?.data,
    toggletabs: state.banner.toggletabs,
    bannerdata: state.banner.data,
    Events: state?.Event?.data,
    settabs: state?.banner?.settabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
