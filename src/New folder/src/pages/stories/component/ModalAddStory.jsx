import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";
import { FiUpload } from "react-icons/fi";
import { CreateStory,GetStory } from "../../../api/Story";
import { connect } from "react-redux";
import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";
const ModalAddStory = (props) => {
  const [images, setImages] = React.useState([]);
  const [caption, setCaption] = React.useState("");
  const maxNumber = 69;
  const SaveStory = async () => {
    if (caption == "") {
      return getSuccessMessage("warning", "Please Fill All deatils");
    }
    if (images.length == 0) {
      return getSuccessMessage("warning", "Please Choose File");
    }
    try {
      const payload = {
        image: images[0].file,
        type: "image",
      };
      let responce = await props.CreateStoryAPI(payload);
      if (responce.payload.status == 200) {
        props.GetStoryAPI()
        ResetData();
        const data={
          close:true
        }
        props.alert(data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const ResetData = async () => {
    setImages([]);
    setCaption("");
  };
  const getSuccessMessage = (type, messga) => {
    Swal.fire(
      {
        icon: type,
        title: messga,
        showConfirmButton: false,
        timer: 2000,
      },
      []
    );
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  return (
    <div>
      <form action="">
        <div className="my-2">
          <FormLabel mb="1" fontWeight={600} className="text-primary">
            Image
          </FormLabel>
          <ImageUploading
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
        </div>
        {/* <div className="my-2">
        <FormLabel mb="1" fontWeight={600} className="text-primary">
            Title
          </FormLabel>
          <Input placeholder='Add Title' />
        </div> */}
        <div className="my-2">
          <FormLabel mb="1" fontWeight={600} className="text-primary">
            Caption
          </FormLabel>
          <Textarea
            placeholder="Write Somethin"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-4 w-full">
          <Button
            bg="white"
            color="cprimary.600"
            fontWeight="500"
            //   _hover={{ bg: "cprimary.600" }}
            variant="solid"
            className="w-1/2 rounded-md"
            borderColor="cprimary.600"
            border="1px"
          >
            Delete
          </Button>
          <Button
            bg="cprimary.500"
            color="white"
            fontWeight="500"
            _hover={{ bg: "cprimary.600" }}
            variant="solid"
            className="w-1/2"
            onClick={SaveStory}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetUSerAPI: (payload) => dispatch(GetAllowUser(payload)),
    UpdateUserAPI: (payload) => dispatch(updateUser(payload)),
    CreateNotificationAPI: (payload) => dispatch(CreateNotification(payload)),
    CreateStoryAPI: (payload) => dispatch(CreateStory(payload)),
    GetStoryAPI:(payload)=>dispatch(GetStory(payload)),
  };
};
const mapStateToProps = (state, props) => {
  console.log(state, "statestate");
  return {
    usersdata: state?.users?.data,
    allowuser: state?.users?.allowuser,
    Currenttabs: state.tabs.ActiveTabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddStory);
