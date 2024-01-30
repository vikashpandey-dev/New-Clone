import React, { useEffect } from "react";
import {
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
import { connect } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import ReactPaginate from "react-paginate";

import StoryImage from "../../../../assets/img/stories/tendulkar.jpg";
import { GetStory } from "../../../../api/Story";
import { TbEdit, TbSortAscending } from "react-icons/tb";
import { RiDeleteBinLine, RiH1 } from "react-icons/ri";
import LikeIcon from "../../../../assets/img/community/like.svg";
import CommentIcon from "../../../../assets/img/community/comment.svg";
import ShareIcon from "../../../../assets/img/community/share.svg";
import avatar3 from "../../../../assets/img/community/avatar3.svg";
import post from "../../../../assets/img/community/post_photos.svg";
import Stories from "stories-react";
import "stories-react/dist/index.css";
import moment from "moment";
import Swal from "sweetalert2";
import { CreateStory, DeleteStory } from "../../../../api/Story";

const UserStories = (props) => {
  const GetStorys = async () => {
    await props.GetStoryAPI();
  };
  useEffect(() => {
    GetStorys();
  }, []);
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
  const handledelete = async (val) => {
    let result = await confirmdelete();
    if (result.isConfirmed == true) {
      const payload = {
        EMPL_ID: val.Admin_Table.ID,
      };
      await props.DeleteStoryAPI(payload);
      GetStorys();
      onClose();
    }
  };
  return (
    <div className="py-6 px-2">
      <div className="flex justify-between items-center">
        <p className="category-ttl">Today’s Stories</p>

        <div className="flex items-center gap-2">
          <Input type="date" value="" />
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
          <Button
            p="2"
            color="cprimary.500"
            fontWeight="500"
            variant="solid"
            className="text-center "
            height="10"
          >
            <TbSortAscending className="mx-auto text-2xl" />
          </Button>
        </div>
      </div>
      <div className="py-6 grid grid-cols-3 gap-4">
        {props.Story.length > 0
          ? props.Story.map((val, index) => {
              return (
                <div className="bgF3F9FF p-4 rounded-lg" key={index}>

                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <p className="ml-2 text-grey font-medium">
                        {/* {moment(val.CreatedDate).format("YYYY-MM-DD HH:mm:ss")} */}
                        12 Jun 2022, 02:00 AM
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      {/* <div className="flex items-center mr-2"></div> */}
                      {/* <TbEdit className="text-primary text-2xl mx-2 cursor-pointer" /> */}
                      <RiDeleteBinLine
                        className="text-primary mx-2 text-xl cursor-pointer"
                        onClick={() => handledelete(val)}
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
                          <Avatar
                            name="Segun Adebayo"
                            src={avatar3}
                            className="post-avatar-icon"
                          />
                          <Box>
                            {/* {val.Admin_Table?(<Heading size="sm">{val.Admin_Table.EMPL_NAME}</Heading>):(null)} */}
                          </Box>
                        </Flex>
                      </Flex>
                    </CardHeader>
                    {val.Admin_Table ? (
                      val.Admin_Table.STORY ? (
                        <Image
                          className="h-56 cursor-pointer"
                          objectFit="cover"
                          src={val.Admin_Table.STORY[0].URL}
                          alt="Chakra UI"
                        />
                      ) : null
                    ) : null}

                    <div className="flex hastags m-3">
                      {/* <p className="mr-3 hashtags-txt">#Product 1  #Product 1</p> */}
                      {/* <p className="mr-3 hashtags-txt">#Product 1</p> */}
                    </div>

                    <div className="footer-border">
                      <div className="social-section">
                        <img src={LikeIcon}></img>
                        10 Like
                      </div>
                      <span className="rvertical-divider"></span>
                      <div className="social-section">
                        <img src={CommentIcon}></img>
                        Views
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })
          : (<h1>Story not available</h1>)}
      </div>
      {/* <div className="flex justify-end gap-1 px-5">
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
      </div> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetStoryAPI: (payload) => dispatch(GetStory(payload)),
    DeleteStoryAPI: (payload) => dispatch(DeleteStory(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    Story: state?.Story?.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStories);
