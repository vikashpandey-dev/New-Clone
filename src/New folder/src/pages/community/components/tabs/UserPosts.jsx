import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";

import {
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
  Input,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Image,
  Heading,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

import Swal from "sweetalert2";
import { connect } from "react-redux";
import ImageUploading from "react-images-uploading";
import { BiPlus } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import LikeIcon from "../../../../assets/img/community/like.svg";
import CommentIcon from "../../../../assets/img/community/comment.svg";
import ShareIcon from "../../../../assets/img/community/share.svg";
import avatar3 from "../../../../assets/img/community/avatar3.svg";
import post from "../../../../assets/img/community/post_photos.svg";
import cancel from "../../../../assets/img/community/cancel_icon.svg";
import UserImg from "../../../../assets/img/community/user-img.svg";
import Downloadexcel from "../../../../utility/Excel";

import {
  getPost,
  updatePost,
  SetActiveTabs,
  DeletePost,
  PoatLikeUser
} from "../../../../api/community";
import moment from "moment";
import { debounce } from "lodash";
function UserPosts(props) {
  const [images, setImages] = React.useState([]);
  const [tags, setTags] = useState("");
  const [caption, setCaption] = useState("");
  const [id, setId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startdate, setstartdate] = useState(null);
  const [enddate,setenddate]=useState(null);
  const [offset, setOffset] = useState(0);
  const [loding,setloding]=useState(false)
  const [isOpenLike, setopenlike] = useState(false);
  const [loder, SetLoder] = useState(false);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
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
  const {
    isOpen: isOpenEvent,
    onOpen: onOpenEvent,
    onClose: onCloseEvent,
  } = useDisclosure();

  async function getPostdata() {
    const payload = {};
    setloding(true)
    await props.getPostAPI(payload);
    setloding(false)
  }
  useEffect(() => {
    const payload = {
      startdate: startdate,
      enddate:enddate,
      Role: "User",
    };
if(startdate!=null && enddate!=null){
  props.getPostAPI(payload);
}
  }, [startdate , enddate]);
  useEffect(() => {
    getPostdata();
    props.setActiveTabsApi("AdminPost");
  }, []);
  const debouncedSearch = useCallback(
    debounce((text, tabs) => {
      // Perform your search logic here, e.g., make an API call
      if (tabs == "UserPost") {
        const payload = {
          Search: text,
          Role: "User",
        };
        props.getPostAPI(payload);
      }
    }, 500),
    []
  );
  useEffect(() => {
    debouncedSearch(props.val.searchval, props.Currenttabs);
    // props.setActiveTabsApi(props.Currenttabs);
  }, [props.Currenttabs, props.val.searchval]);
  const clearfilter = async () => {
    setstartdate("");
    setenddate("")
    const payload = {
      Search: "",
      Role: "User",
    };
    await props.getPostAPI(payload);
    await props.getPostAPI(payload);
  };
  const updateValues = async (value) => {
    setTags(value.tags);
    setCaption(value.caption);
    if(value.url){
      setImages([value.url]);
    }
    setId(value.FEED_ID);
    onOpenPost();
  };
  const updatePost = async (value) => {
    let payload = {
      id: id,
      EMPL_ID: "100003",
      type: "img",
      url: images[0].file,
      caption: caption,
      Isdelete: 0,
      tags: tags,
      flag: true,
    };

    await props.updatePostAPI(payload);
    payload={Role:"User"}
    if(offset)
    Object.assign(payload,{page:offset})
    await props.getPostAPI();
    onClosePost();
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
  const deletePost = async (value) => {
    let payload = {
      FEED_ID: value,
      Isdeleated: 1,
    };
    let result = await confirmdelete();
    if (result.isConfirmed == true) {
      await props.DeletePostAPI(payload);
      payload = {
        Search: "",
        Role: "User",
      };
      if(offset)
      Object.assign(payload,{page:offset})
      await props.getPostAPI(payload);
      onClose();
    }
  };
  const handlepagechange = async (item) => {
    let page = item.selected + 1;
    const curoffset = page > 1 ? (page - 1) * 6 : 1;
    const payload = { page: curoffset, Search: "", Role: "User" };
    setOffset(curoffset);
    let responce = await props.getPostAPI(payload);
    await callapis();
  };
  var pageCount;
  if (props.Posts.length > 0) {
    pageCount = Math.ceil(props.Posts[0].TOTAL_FEED / 6);
  }
  const handleopnelike = async (val) => {
    const payload = {
      FEED_ID: val.FEED_ID,
    };
   let responce= await props.PoatLikeUserAPI(payload);
    if(responce.payload.length==0){
      return
    }
    setopenlike(true);

    setTimeout(() => {}, 2000);
  };
  const onCloseLike = () => {
    setopenlike(false);
  };
  const getfulldate=(datetime)=>{
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
    let curtime=`${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`
    
   
    return curtime
   }
   const downloadlikeuser = async () => {
    SetLoder(true)
    const payload = {
      alluser: true,
    };
    try {
      if (props.PostLike.length > 0) {
        Object.assign(payload, { FEED_ID: props.PostLike[0].FEED_ID });
      }
      var responce = await props.PoatLikeUserAPI(payload);
      // console.log(responce, "responceresponce");
      if (responce.payload.length > 0) {
        // alert("tru")
        // return
        await Downloadexcel(responce.payload,'Like_User');
        SetLoder(false)
      }
    } catch (err) {
      SetLoder(false)
      console.log(err);
    }
  };
  return (
    <div className="py-6 px-2">
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
            {props.PostLike.length > 0 ? (
              <div className="Like-by-container">
                {props.PostLike.map((val, index) => (
                  <div className="flex items-center gap-4 py-3" key={index}>
                    <div className="img">
                      {val.Photo == null ? (
                        <img
                          src={UserImg}
                          alt="user_img"
                          className="w-10 h-10"
                        />
                      ) : (
                        <img
                          src={val.Photo}
                          alt="user_img"
                          className="w-10 h-10"
                        />
                      )}
                    </div>
                    <div className="user-name leading-3">
                      <p className="text-xs font-medium">Like By</p>
                      <p className="text-sm text-black font-bold">{val.NAME}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </ModalBody>
          <button
            className="mx-5 text-normal mt-0 mr-auto mb-3 ml-auto downloaduser text-white"
            onClick={downloadlikeuser}
          >
            { `${loder?'Downloading...':'Download User'}`}
          </button>
        </ModalContent>
      </Modal>
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
            Edit Post
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {/* <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                User
              </FormLabel>
              <Input placeholder="Enter Your Name" />
            </FormControl> */}
            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Photo / allowed only jpg,svg,jpeg,gif png
              </FormLabel>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png","svg","jpeg","GIF"]}
                maxFileSize={5000000}
                onError={(errors) => {
                  if (errors.maxNumber) {
                    
                    getSuccessMessage('warning','You have exceeded the maximum number of allowed images')
                    
                  }
                  if (errors.acceptType) {
                    getSuccessMessage('warning',"Only JPG,svg,jpeg,GIF and PNG files are allowed.");
                  }
                  if (errors.maxFileSize) {
                    getSuccessMessage('warning',"File size exceeds the maximum limit of 5 MB.");
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
                Tags
              </FormLabel>
              <div className="relative">
                <Input
                  placeholder="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <div className="absolute top-2 right-2">
                  <BiPlus className="w-6 h-6" />
                </div>
              </div>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Description
              </FormLabel>
              <Textarea
                placeholder="Enter Description"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </FormControl>
          </ModalBody>

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
              className="bg-button"
              onClick={updatePost}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="flex justify-between items-center">
        <p className="category-ttl"> </p>
        <div className="flex items-center gap-3">
         <div className="flex items-center gap-2">
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
      <div className="py-6 grid grid-cols-3 gap-4">
        {props
          ? props.Posts
            ? props.Posts.length > 0
              ? props.Posts.map((x, i) => {
                  return (
                    <>
                      <div className="bgF3F9FF p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex justify-between items-center">
                            <p className="ml-2 text-grey font-medium">
                              {getfulldate(x.CreatedDate)}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center mr-2">
                              {/* <Button
                                bg="cprimary.500"
                                color="white"
                                fontWeight="500"
                                _hover={{ bg: "cprimary.600" }}
                                variant="solid"
                                onClick={()=>handleallowpost(x)}
                              >
                                Allow
                              </Button> */}
                            </div>
                            <TbEdit
                              className="text-primary text-2xl mx-2"
                              onClick={() => updateValues(x)}
                            />
                            <RiDeleteBinLine
                              className="text-primary mx-2 text-xl cursor-pointer"
                              onClick={() => deletePost(x.FEED_ID)}
                            />
                          </div>
                        </div>
                        <Card maxW="md" className="mt-3">
                          <CardHeader className="pad-12px">
                            <Flex spacing="4">
                              <Flex
                                flex="1"
                                gap="4"
                                alignItems="center"
                                flexWrap="wrap"
                              >
                                {x.profile ? (
                                  <Avatar
                                    name="Segun Adebayo"
                                    src={x.profile}
                                    className="post-avatar-icon"
                                  />
                                ) : (
                                  <Avatar
                                    name="Segun Adebayo"
                                    src={avatar3}
                                    className="post-avatar-icon"
                                  />
                                )}

                                <Box>
                                  <Heading size="sm">{x.NAME}</Heading>
                                </Box>
                              </Flex>
                            </Flex>
                          </CardHeader>
                          {x.type == "img" ? (
                            <Image
                              className="h-56"
                              objectFit="cover"
                              src={x.url || post}
                              alt="Chakra UI"
                            />
                          ) : (
                            <h1 className="flex justify-center">{x.caption}</h1>
                          )}

                          <div className="flex hastags m-3">
                            <p className="mr-3 hashtags-txt">{x.tags}</p>
                            {/* <p className="mr-3 hashtags-txt">#Product 1</p> */}
                          </div>

                          <div className="footer-border flex items-center justify-start">
                            <div className="social-section cursor-pointer"  onClick={() => handleopnelike(x)}>
                              <img src={LikeIcon}></img>
                              {x.likecount} Like
                            </div>
                            {/* <span className="rvertical-divider"></span>
                            <div className="social-section">
                              <img src={CommentIcon}></img>
                              {x.commentcount}
                            </div>
                            <span className="rvertical-divider"></span>
                            <div className="social-section">
                              <img src={ShareIcon}></img>
                              10 Share
                            </div> */}
                          </div>
                        </Card>
                      </div>
                    </>
                  );
                })
              : ""
            : ""
          : ""}
        {/* {[...Array(4)].map((x, i) => (
          <div className="bgF3F9FF p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center">
                <p className="ml-2 text-grey font-medium">
                  12 jun 2022, 02:00 AM
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center mr-2">
                  <Button
                    bg="cprimary.500"
                    color="white"
                    fontWeight="500"
                    _hover={{ bg: "cprimary.600" }}
                    variant="solid"
                  >
                    Allow
                  </Button>
                </div>
                <TbEdit
                  className="text-primary text-2xl mx-2"
                  onClick={onOpen}
                />
                <RiDeleteBinLine className="text-primary mx-2 text-xl" />
              </div>
            </div>
            <Card maxW="md" className="mt-3">
              <CardHeader className="pad-12px">
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name="Segun Adebayo"
                      src={avatar3}
                      className="post-avatar-icon"
                    />

                    <Box>
                      <Heading size="sm">Ajay Sharma</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>

              <Image
                className="h-56"
                objectFit="cover"
                src={post}
                alt="Chakra UI"
              />

              <div className="flex hastags m-3">
                <p className="mr-3 hashtags-txt">#Product 1</p>
                <p className="mr-3 hashtags-txt">#Product 1</p>
              </div>

              <div className="footer-border">
                <div className="social-section">
                  <img src={LikeIcon}></img>
                  1,205 Like
                </div>
                <span className="rvertical-divider"></span>
                <div className="social-section">
                  <img src={CommentIcon}></img>
                  12 Comments
                </div>
                <span className="rvertical-divider"></span>
                <div className="social-section">
                  <img src={ShareIcon}></img>
                  10 Share
                </div>
              </div>
            </Card>
          </div>
        ))} */}
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
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEventAPI: (payload) => dispatch(createEvent(payload)),
    // createPostAPI: (payload) => dispatch(createPost(payload)),
    getPostAPI: (payload) => dispatch(getPost(payload)),
    updatePostAPI: (payload) => dispatch(updatePost(payload)),
    setActiveTabsApi: (payload) => dispatch(SetActiveTabs(payload)),
    DeletePostAPI: (payload) => dispatch(DeletePost(payload)),
    PoatLikeUserAPI: (payload) => dispatch(PoatLikeUser(payload)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    Posts: state?.Post?.data,
    Currenttabs: state.tabs.ActiveTabs,
    PostLike: state.Post.PostLike,

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
