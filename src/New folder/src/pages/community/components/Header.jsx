import React, { useState, useEffect } from "react";
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
  Input,
  Textarea,
  AvatarGroup,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  Stack,
  FormErrorMessage,
  RadioGroup,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { BiPlus } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import ImageUploading from "react-images-uploading";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import avatar1 from "../../../assets/img/community/avatar1.svg";
import avatar2 from "../../../assets/img/community/avatar2.svg";
import avatar3 from "../../../assets/img/community/avatar3.svg";
import avatar4 from "../../../assets/img/community/avatar4.svg";
// import Multiselect from "multiselect-react-dropdown";
import { connect } from "react-redux";
import {
  createEvent,
  createPost,
  getPost,
  getEvent,
} from "../../../api/community";
import { useForm, Controller } from "react-hook-form";
function Community(props) {
  const [TopicName, setTopicName] = useState("");
  const [date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [Duration, setDuration] = useState("");
  const [Description, setDescription] = useState("");
  const [MeetingLink, setMeetingLink] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState("");
  const [caption, setCaption] = useState("");
  const [trending, setTrending] = useState("");

  // async function getPostdata() {
  //   await props.getPostAPI();
  // }
  // useEffect(() => {
  //   getPostdata();
  // }, []);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex, e) => {
    setImages(imageList);
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
  } = useDisclosure();
  const {
    isOpen: isOpenEvent,
    onOpen: onOpenEvent,
    onClose: onCloseEvent,
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
  const createEvent = async (e) => {
    if (images.length == 0)
      return await getSuccessMessage("error", "Please Choose file");
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

    const Response = await props.createEventAPI(payload);
    payload = {
      Search: "",
    };
    await props.getEventAPI(payload);
    reset();
    resetvalue();
    onCloseEvent();
  };
  const onSubmit = async (value) => {
    if (images.length == 0)
      return await getSuccessMessage("error", "Please Choose file");

    let payload = {
      EMPL_ID: "100003",
      type: "img",
      image: images[0].file,
      caption: caption,
      Isdelete: 0,
      tags: tags,
      published: "1",
    };
    if (trending == "1") Object.assign(payload, { trending: "1" });
    if (trending == "0") Object.assign(payload, { trending: "0" });

    await props.createPostAPI(payload);
    payload = {
      Search: "",
    };
    reset();
    resetvalue();
    await props.getPostAPI(payload);
    onClosePost();
  };

  const resetvalue = async () => {
    setTopicName("");
    setImages([]);
    setTags("");
    setCaption("");
    setImages([]);
    setTags("");
    setTime("");
    setDate("");
    setDescription("");
    setMeetingLink("");
    setDuration("");
  };

  const [options, setOptions] = useState([
    "#Product 1",
    "#Product 2",
    "#Product 3",
  ]);
  return (
    <div className="p-6 bge8f4ff">
      <Modal isOpen={isOpenPost} onClose={onClosePost} isCentered>
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
            Create Post
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {/* <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                User
              </FormLabel>
              <Input placeholder="Enter Your Name" />
            </FormControl> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={4}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Upload image / (allowed only jpg,svg,jpeg,gif,png)
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
                            onClick={(e) => onImageUpload(e.preventDefault())}
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
                            src={image.data_url}
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

              <FormControl mt={4} isInvalid={errors.tags}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Tags
                </FormLabel>
                <div className="relative">
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "tags  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter tags"
                        {...field}
                        value={tags}
                        onChange={(e) => {
                          setTags(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.tags && errors.tags.message}
                  </FormErrorMessage>
                  <div className="absolute top-2 right-2">
                    <BiPlus className="w-6 h-6" />
                  </div>
                </div>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.caption}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Description
                </FormLabel>
                <Controller
                  name="caption"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "caption  is required",
                  }}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Enter caption"
                      {...field}
                      value={caption}
                      onChange={(e) => {
                        setCaption(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.caption && errors.caption.message}
                </FormErrorMessage>
                {/* <Textarea
                  placeholder="Enter Comments"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                /> */}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Is trending
                </FormLabel>
                <RadioGroup value={trending}>
                  <Stack direction="row">
                    <Radio
                      value="1"
                      onChange={(e) => setTrending(e.target.value)}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="0"
                      onChange={(e) => setTrending(e.target.value)}
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <ModalFooter className="grid grid-cols-2 gap-4">
                <Button
                  onClick={onClosePost}
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
                  type="submit"
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEvent} onClose={onCloseEvent} isCentered>
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
          <ModalBody py={6}>
            <form onSubmit={handleSubmit(createEvent)}>
              <FormControl mt={4} isInvalid={errors.topicname}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Topic Name
                </FormLabel>
                <Controller
                  name="topicname"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "TopicName  is required",
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter Topic Name"
                      {...field}
                      value={TopicName}
                      onChange={(e) => {
                        setTopicName(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.topicname && errors.topicname.message}
                </FormErrorMessage>
                {/* <Input
                placeholder="Enter Topic Name"
                onChange={(e) => setTopicName(e.target.value)}
                name="topic"
                value={TopicName}
              /> */}
              </FormControl>

              <div className="flex gap-2 w-full">
                <div className="date w-1/2">
                  <FormControl mt={4} isInvalid={errors.date}>
                    <FormLabel mb="1" fontWeight={600} className="text-primary">
                      Date
                    </FormLabel>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "date  is required",
                      }}
                      render={({ field }) => (
                        <Input
                          type="date"
                          placeholder="Enter Topic Name"
                          {...field}
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                    <FormErrorMessage>
                      {errors.date && errors.date.message}
                    </FormErrorMessage>
                  </FormControl>
                </div>

                <div className="time w-1/2">
                  <FormControl mt={4} isInvalid={errors.time}>
                    <FormLabel mb="1" fontWeight={600} className="text-primary">
                      Time
                    </FormLabel>
                    <Controller
                      name="time"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "time  is required",
                      }}
                      render={({ field }) => (
                        <Input
                          type="time"
                          name="time"
                          placeholder="Add Time"
                          {...field}
                          value={Time}
                          onChange={(e) => {
                            setTime(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                    <FormErrorMessage>
                      {errors.time && errors.time.message}
                    </FormErrorMessage>
                  </FormControl>
                </div>
              </div>
              <FormControl mt={4} isInvalid={errors.Duration}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Duration
                </FormLabel>
                <Controller
                  name="Duration"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Duration  is required",
                  }}
                  render={({ field }) => (
                    <Input
                      type="time"
                      name="time"
                      placeholder="00:00 hrs"
                      className="bg-gray-100"
                      {...field}
                      value={Duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.Duration && errors.Duration.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Upload Imagee / allowed only jpg,svg,jpeg,gif png
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
                            onClick={(e) => onImageUpload(e.preventDefault())}
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
                            src={image.data_url}
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
              <FormControl mt={4} isInvalid={errors.Description}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Agenda/Description
                </FormLabel>
                <Controller
                  name="Description"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Description  is required",
                  }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter Your Agenda In Detail"
                      className="bg-gray-100"
                      {...field}
                      value={Description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.Description && errors.Description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.MeetingLink}>
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Meeting Link
                </FormLabel>
                <Controller
                  name="MeetingLink"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "MeetingLink  is required",
                  }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Add Meeting Link"
                      className="bg-gray-100"
                      {...field}
                      value={MeetingLink}
                      onChange={(e) => {
                        setMeetingLink(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.MeetingLink && errors.MeetingLink.message}
                </FormErrorMessage>
              </FormControl>

              <ModalFooter className="grid grid-cols-2 gap-4">
                <Button
                  onClick={onCloseEvent}
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
                  type="submit"
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="flex justify-between ">
        <div className="flex justify-center items-center">
          <p className="hdr-title">Community</p>
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
          <Menu>
            <MenuButton
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              as={Button}
              leftIcon={<BiPlus className="mr-1.5" />}
            >
              Add
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenPost}>Post</MenuItem>
              <MenuItem onClick={onOpenEvent}>Event</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      {/* <p className="hdr-subttl">12,230 Today’s Post</p> */}
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEventAPI: (payload) => dispatch(createEvent(payload)),
    createPostAPI: (payload) => dispatch(createPost(payload)),
    getPostAPI: (payload) => dispatch(getPost(payload)),
    getEventAPI: (payload) => dispatch(getEvent(payload)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    Posts: state?.Post?.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);
