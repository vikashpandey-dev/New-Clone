import React, { useState, useEffect } from "react";
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
  Text,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  CircularProgress,
  Image,
  Heading,
  Radio,
  Stack,
  Spinner,
  RadioGroup,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import Swal from "sweetalert2";
import { TbEdit } from "react-icons/tb";
import ImageUploading from "react-images-uploading";
import { RiDeleteBinLine } from "react-icons/ri";
import ReactPaginate from 'react-paginate';
import {
  getPost,
  updatePost,
  SetActiveTabs,
  DeletePost,
} from "../../../api/community";
import moment from "moment";
import { BiPlus } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { connect } from "react-redux";
const MainSection = (props) => {
  const [images, setImages] = React.useState([]);
  const [tags, setTags] = useState("");
  const [caption, setCaption] = useState("");
  const [id, setId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datefilter, setDatefilter] = useState(null);
  const [trending, setTrending] = useState("");
  // Add Auto scroll
  const [records, setRecords] = useState([]);
  const [offset, setOffset] = useState();
  const [loading, setLoading] = useState(false);
  const [callapi, setcallapi] = useState(true);
  const [loder, setloder] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(true);

  // end
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
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
  const deletePost = async (value) => {
    let payload = {
      FEED_ID: value.FEED_ID,
      Isdeleated: "1",
    };

    let result = await confirmdelete();
    if (result.isConfirmed == true) {
      await props.DeletePostAPI(payload);
      payload = {
        Search: "",
        Role: "",
      };
      if(offset)
      Object.assign(payload,{page:offset})
      await props.getPostAPI(payload);
      onClose();
    }
  };
  const updatePost = async (value) => {
    let payload = {
      FEED_ID: id,
      EMPL_ID: "100003",
      type: "img",
      image: images[0].file,
      caption: caption,
      Isdelete: 0,
      tags: tags,
    };

    if (trending == "Yes") Object.assign(payload, { setTrending: 1 });
    if (trending == "No") Object.assign(payload, { setTrending: 0 });
    await props.updatePostAPI(payload);
    payload = {
      Role: "Admin",
    };
    if(offset)
    Object.assign(payload,{page:offset})
    await props.getPostAPI(payload);
    onClosePost();
  };
  const updateValues = async (value) => {
    setTags(value.tags);
    setCaption(value.caption);
    if(value.url){
      setImages([value.url]);

    }
    setId(value.FEED_ID);
    if (value.trending == 1) {
      setTrending("Yes");
    }
    if (value.trending == 0) {
      setTrending("No");
    }
    onOpenPost();
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

  // Fetch records function
  // Function to fetch more records
  const fetchMoreRecords = async () => {
    try {
      if (callapi) {
        setLoading(true);
        setloder(true);
        const curoffset = offset > 1 ? (offset - 1) * 4 : offset;
        const payload = { page: curoffset };
        let responce = await props.getPostAPI(payload);
        setRecords([...records, ...responce.payload.data.data.data]);
        if (responce.payload.data.data.data.length > 0) {
          setOffset(offset + 1);
          setTimeout(() => {
            setloder(false);
            setLoading(false);
          }, 500);
        }
        if (responce.payload.data.data.data.length == 0) {
          setloder(false);
          setcallapi(false);
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetching
  // useEffect(() => {
  //   setLoading(false);
  //   setcallapi(true);
  //   fetchMoreRecords();
  // }, []);

  // Function to handle scroll
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
  //     !loading
  //   ) {
  //     fetchMoreRecords();
  //   }
  // };

  // Attach scroll event listener
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [loading]);
const handlepagechange=async(item)=>{
  let page=item.selected+1
const curoffset = page > 1 ? (page - 1) * 6 : 1;
const payload = { page: curoffset };
setOffset(curoffset)
let responce = await props.getPostAPI(payload);
// await callapis()
}
var pageCount;
  if(props.Posts.length>0){
     pageCount = Math.ceil(props.Posts[0].TOTAL_FEED / 6);

  }
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
  return (
    <>
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
                Photo
              </FormLabel>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png"]}
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
                Comments
              </FormLabel>
              <Textarea
                placeholder="Enter Description"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Is trending
              </FormLabel>
              <RadioGroup value={trending}>
                <Stack direction="row">
                  <Radio
                    value="Yes"
                    onChange={(e) => setTrending(e.target.value)}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="No"
                    onChange={(e) => setTrending(e.target.value)}
                  >
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
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
              onClick={updatePost}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {loder == true ? (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          background="rgba(255, 255, 255, 0.2)"
          zIndex="9999"
        >
          <div className="instagram-loader">
            <div className="loader"></div>
          </div>
        </Box>
      ) : null}

      <div className="bg-white px-6 pt-6 pb-3">
        <div className="flex justify-between items-center">
          <p className="hdr-title">Trending Posts</p>
          <p className="text-primary">View All</p>
        </div>
        <div className="py-6 grid grid-cols-3 gap-4">
          {props.Posts.length > 0 ? (
            props.Posts.map((val, i) => {
              return (
                <>
                  <div className="bgF3F9FF p-4 rounded-lg" key={i}>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-between items-center">
                        <p className="ml-2 text-grey font-medium">
                          
                          {getfulldate(val.CreatedDate)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <TbEdit
                          className="text-primary text-2xl mx-2 cursor-pointer"
                          onClick={() => updateValues(val)}
                        />
                        <RiDeleteBinLine
                          className="text-primary mx-2 text-xl cursor-pointer"
                          onClick={() => deletePost(val)}
                        />
                      </div>
                    </div>
                    {val.type == "text" ? (
                      <div className="mt-4">
                        <h1 className="w-full h-54 rounded-md flex justify-center">
                          {val.caption}
                        </h1>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <img
                          src={val.url}
                          alt="Banner"
                          className="w-full h-54 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </>
              );
            })
          ) : (
            <h1>No Post</h1>
          )}
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostAPI: (payload) => dispatch(updatePost(payload)),
    DeletePostAPI: (payload) => dispatch(DeletePost(payload)),
    getPostAPI: (payload) => dispatch(getPost(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    Posts: state?.Post?.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
