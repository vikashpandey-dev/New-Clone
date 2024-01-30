import React, { useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { connect } from "react-redux";
import ImageUploading from "react-images-uploading";
import { FiUpload } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { getBillboard } from "../../../api/billBoard";
import { addBillboard } from "../../../api/billBoard";
import { getBanner, addBanner } from "../../../api/banner";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
function Header(props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [images, setImage] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [textcolor, setTextcolor] = React.useState("blue");
  const [buttontext, setButtontext] = React.useState("");
  const [buttonurl, setButtonurl] = React.useState("");
  const [buttoncolor, setButtoncolor] = React.useState("Green");

  // add banner variable

  const [bimages, setbImage] = React.useState([]);
  const [bdescription, setbDescription] = React.useState("");
  const [btitle, setbTitle] = React.useState("");
  const [btextcolor, setbTextcolor] = React.useState("blue");
  const [bbuttontext, setbButtontext] = React.useState("");
  const [bbuttonurl, setbButtonurl] = React.useState("");
  const [bbuttoncolor, setbButtoncolor] = React.useState("Green");
  const [buttonbg, setbuttonbg] = React.useState("Green");
  const [Homebannerurl, setbHomebannerurl] = React.useState("");
  const [HBduscription, setHBduscription] = React.useState("");
const [openbanner,setopenbanner]=useState(false)
  const maxNumber = 1;
  const onChange = (imageList) => {
    console.log(imageList);
    setImage(imageList);
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const {
  
  } = useDisclosure();
const onOpenHomeBanner=async()=>{
  
  if(props.bannerdata.length==2){
  return  await getSuccessMessage("error", "Can't upload more than 2 banner");
  }
  setopenbanner(true)
}
const onCloseHomeBanner =()=>{
  setopenbanner(false)
}
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
  const AddBillboard = async (value) => {
    if (images.length == 0)
    return await getSuccessMessage("error", "Please Choose file");
    let payload = {
      title: title,
      description: description,
      textcolor: textcolor,
      buttontext: buttontext,
      buttonurl: buttonurl,
      image: images[0].file,
      buttoncolor: buttoncolor,
    };

    await props.addBillboardAPI(payload);
    await props.getBillboardAPI({
      isdeleated: "0",
    });
    reset()
    await resetvalue()
    onClose();
  };

  const onSubmit=()=>{

  }
  // add homne banner

  const GetBanner = async () => {
    await props.GetbannerAPI();
  };

  const AddBanner = async (val) => {

    if (images.length == 0)
    return await getSuccessMessage("error", "Please Choose file");
    const payload = {
      description: bdescription,
      title: title,
      textcolor: btextcolor,
      buttontext: bbuttontext,
      buttonurl: bbuttonurl,
      type:"image",
      image: images[0].file,
      buttonbg:buttonbg,
      buttoncolor: bbuttoncolor,
      url: Homebannerurl,
    };
    let responce = await props.addBannerApi(payload);
    reset();
   await resetvalue()
    setopenbanner(false)
    await GetBanner()
  };
const resetvalue=()=>{
  setbuttonbg("")
   setImage([])
   setDescription("")
 setTitle("")
  setTextcolor("")
setButtontext("")
 setButtonurl("")
 setButtoncolor("") 


 setbImage([])
setbDescription("") 
 setbTitle("")
  setbTextcolor("")
  setbButtontext("")
setbButtonurl("")
setbButtoncolor("")
 setbHomebannerurl("") 
 setHBduscription("") 
}
  return (
    <div className="p-6 bge8f4ff">
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
          >
            Add Billboard
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
          <form onSubmit={handleSubmit(AddBillboard)}>
            <FormControl className="mb-2">
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Upload image / allowed only jpg,svg,jpeg,gif png
              </FormLabel>
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png","svg","jpeg"]}
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
                          onClick={(e)=>onImageUpload(e.preventDefault())}
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
              <FormControl mt={4} isInvalid={errors.title}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Title
                </FormLabel>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "title  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter Title"
                        {...field}
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter Title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                /> */}
              </div>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.Description}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Description
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
                        placeholder="Enter Description"
                        {...field}
                        value={description}
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
                {/* <Textarea
                  placeholder="Enter Description"
                  name="desc"
                  onChangeCapture={(e) => setDescription(e.target.value)}
                /> */}
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.billboardurl}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Url
                </FormLabel>
                <Controller
                    name="billboardurl"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Billboard Url  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter Billboard Url"
                        {...field}
                        value={buttonurl}
                        onChange={(e) => {
                          setButtonurl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.billboardurl && errors.billboardurl.message}
                  </FormErrorMessage>
                {/* <Input placeholder="Enter URL" onChange={(e)=>setButtonurl(e.target.value)}  /> */}
              </div>
              </FormControl>
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Title
                </FormLabel>
                <Input placeholder="Enter Billboard Title"  onChange={(e)=>setBbuttontitle(e.target.value)}/>
              </div> */}
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Description
                </FormLabel>
                <Textarea placeholder="Billboard Description" onChange={(e)=>setBdescription(e.target.value)} />
              </div> */}
                <FormControl mt={4} isInvalid={errors.billboardcolor}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Button Color
                </FormLabel>
                <Controller
                    name="billboardcolor"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Billboard Button Color is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="color"
                        placeholder="Enter Billboard Button Color"
                        {...field}
                        value={buttoncolor}
                        onChange={(e) => {
                          setButtoncolor(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.billboardcolor && errors.billboardcolor.message}
                  </FormErrorMessage>
                {/* <Input placeholder="Enter URL" type="color" onChange={(e)=>setButtoncolor(e.target.value)} /> */}
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.billboardbgcolor}>
  <div mt={4} class="checkout">
    <FormLabel mb="1" fontWeight={600} className="text-primary">
      Billboard Button Background Color
    </FormLabel>
    <Controller
      name="billboardbgcolor"
      control={control}
      defaultValue=""
      rules={{
        ...(isValidationEnabled && {
          required: "Billboard Button Background Color is required",
        }),
      }}
      render={({ field }) => (
        <Input
          type="color"
          placeholder="Enter Billboard Background Button Color"
          {...field}
          value={buttonbg}
          onChange={(e) => {
            setbuttonbg(e.target.value);
            field.onChange(e);
          }}
        />
      )}
    />
    <FormErrorMessage>
      {errors.billboardbgcolor && errors.billboardbgcolor.message}
    </FormErrorMessage>
  </div>
</FormControl>

              <FormControl mt={4} isInvalid={errors.billboardbuttontext}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Button Text
                </FormLabel>
                <Controller
                    name="billboardbuttontext"
                    control={control}
                    defaultValue=""
                    // rules={{
                    //   required: "Billboard Button Text is required",
                    // }}
                    render={({ field }) => (
                      <Input
                      type="text"
                        placeholder="Billboard Button Text"
                        {...field}
                        value={buttontext}
                        onChange={(e) => {
                          setButtontext(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.billboardbuttontext && errors.billboardbuttontext.message}
                  </FormErrorMessage>
                {/* <Input placeholder="Enter URL" onChange={(e)=>setButtontext(e.target.value)} /> */}
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.billboardtextcolor}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Billboard Text Color
                </FormLabel>
                <Controller
                    name="billboardtextcolor"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Billboard Text Color is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="color"
                        placeholder="Billboard Text Color"
                        {...field}
                        value={textcolor}
                        onChange={(e) => {
                          setTextcolor(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.billboardtextcolor && errors.billboardtextcolor.message}
                  </FormErrorMessage>
                {/* <Input placeholder="Enter URL" type="color" onChange={(e)=>setTextcolor(e.target.value)} /> */}
              </div>
              </FormControl>
              <ModalFooter className="grid grid-cols-2 gap-4">
            <Button
              onClick={onClose}
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
            Add Banner
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
          <form onSubmit={handleSubmit(AddBanner)}>
            <FormControl className="mb-2">
              <FormLabel mb="1" fontWeight={600} className="text-primary">
                Upload image / allowed only jpg,svg,jpeg,gif png
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
                          onClick={(e)=>onImageUpload(e.preventDefault())}
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
              <FormControl mt={4} isInvalid={errors.title}>
              <div mt={4} class="checkout">
                <FormLabel
                  mb="1"
                  fontWeight={600}
                  className="text-primary"
                 
                >
                  Title 
                </FormLabel>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "title  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter Title"
                        {...field}
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                /> */}
              </div>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.Description}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Description
                </FormLabel>
                <Controller
                    name="Description"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Description  is required",
                    }}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Enter Description"
                        {...field}
                        value={bdescription}
                        onChange={(e) => {
                          setbDescription(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.Description && errors.Description.message}
                  </FormErrorMessage>
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.URL}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Url
                </FormLabel>
                <Controller
                    name="URL"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "URL  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter URL"
                        {...field}
                        value={bbuttonurl}
                        onChange={(e) => {
                          setbButtonurl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.URL && errors.URL.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter URL"
                  onChange={(e) => setbButtonurl(e.target.value)}
                /> */}
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.bannertitle}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Title
                </FormLabel>
                <Controller
                    name="bannertitle"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Home Banner Title  is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter Home Banner Title"
                        {...field}
                        value={Homebannerurl}
                        onChange={(e) => {
                          setbHomebannerurl(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bannertitle && errors.bannertitle.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter Billboard Title"
                  onChange={(e) => setbHomebannerurl(e.target.value)}
                /> */}
              </div>
              </FormControl>
              {/* <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Description
                </FormLabel>
                <Textarea
                  placeholder="Enter   Home Banner Description"
                  onChange={(e) => setHBduscription(e.target.value)}
                />
              </div> */}
              <FormControl mt={4} isInvalid={errors.bannerbuttoncolor}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Button Color
                </FormLabel>
                <Controller
                    name="bannerbuttoncolor"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Home Banner Button Color  is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="color"
                        placeholder="Enter Home Banner Button Color"
                        {...field}
                        value={bbuttoncolor}
                        onChange={(e) => {
                          setbButtoncolor(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bannerbuttoncolor && errors.bannerbuttoncolor.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter URL"
                  type="color"
                  onChange={(e) => setbButtoncolor(e.target.value)}
                /> */}
              </div>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.bannerbuttonbgcolor}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Button background Color
                </FormLabel>
                <Controller
                    name="bannerbuttonbgcolor"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Home Banner Button Background Color  is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="color"
                        placeholder="Enter Home Banner  BackgroundButton Color"
                        {...field}
                        value={buttonbg}
                        onChange={(e) => {
                          setbuttonbg(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bannerbuttonbgcolor && errors.bannerbuttonbgcolor.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter URL"
                  type="color"
                  onChange={(e) => setbButtoncolor(e.target.value)}
                /> */}
              </div>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.bannerbuttontext}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Button Text
                </FormLabel>
                                <Controller
                    name="bannerbuttontext"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Home Banner Button Text  is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="text"
                        placeholder="Enter Home Banner Button Text"
                        {...field}
                        value={bbuttontext}
                        onChange={(e) => {
                          setbButtontext(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bannerbuttontext && errors.bannerbuttontext.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter URL"
                  onChange={(e) => setbButtontext(e.target.value)}
                /> */}
              </div>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.bannerttextcolor}>
              <div mt={4} class="checkout">
                <FormLabel mb="1" fontWeight={600} className="text-primary">
                  Home Banner Text Color
                </FormLabel>
                <Controller
                    name="bannerttextcolor"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Home Banner Text Color  is required",
                    }}
                    render={({ field }) => (
                      <Input
                      type="color"
                        placeholder="Enter Home Banner Text Color"
                        {...field}
                        value={btextcolor}
                        onChange={(e) => {
                          setbTextcolor(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.bannerttextcolor && errors.bannerttextcolor.message}
                  </FormErrorMessage>
                {/* <Input
                  placeholder="Enter URL"
                  type="color"
                  onChange={(e) => setbTextcolor(e.target.value)}
                /> */}
              </div>
            </FormControl>
            {/* <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button> */}
                   <ModalFooter className="grid grid-cols-2 gap-4">
            <Button

              onClick={onClose}
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
      {props.toggletabs ? (
        <div className="flex justify-between ">
          <div>
            <p className="hdr-title">Home Banner</p>
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

            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              onClick={onOpenHomeBanner}
            >
              <BiPlus className="mr-1.5" />
              Add HomeBanner
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between ">
          <div>
            <p className="hdr-title">Bill Board</p>
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
            <Button
              bg="cprimary.500"
              color="white"
              fontWeight="500"
              _hover={{ bg: "cprimary.600" }}
              variant="solid"
              onClick={onOpen}
            >
              <BiPlus className="mr-1.5" />
              Add Billboard
            </Button>
          </div>
        </div>
      )}

      {/* <p className="hdr-subttl">10 Banner</p> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBillboardAPI: (payload) => dispatch(getBillboard(payload)),
    addBillboardAPI: (payload) => dispatch(addBillboard(payload)),
    addBannerApi: (payload) => dispatch(addBanner(payload)),
    GetbannerAPI: (payload) => dispatch(getBanner()),
  };
};

const mapStateToProps = (state, props) => {
  return {
    userData: state.auth.userDetails,
    toggletabs: state.banner.toggletabs,
    bannerdata: state.banner.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
