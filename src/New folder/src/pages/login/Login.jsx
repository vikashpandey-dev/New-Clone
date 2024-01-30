import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import logo from "../../assets/img/icici-logo-white.png";
import { adminlogin } from "../../api/auth";
import Logo from "../../assets/img/icicilogo.png";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Login(props) {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [employeeid, setemployeeid] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = async (data) => {
    const payload = {
      // EMPL_ID: data.Employee,
      // password: data.password,
      UserId: data.Employee,
      Password: data.password,
    };
    try {
      let responce = await props.AdminLoginAPI(payload);
      if (responce.payload.Responsecode == 100) {
        history.push(`${import.meta.env.BASE_URL}dashboard`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-wrap w-full md:h-screen lg:h-screen">
        <div className="md:w-4/6 lg:w-4/6 w-full bg-img-login md:py-16 lg:py-20 py-12 text-white relative">
          <img
            src={Logo}
            alt="ICICI Logo"
            className="md:h-14 lg:h-16 h-10 mr-auto md:px-16 lg:px-20 px-8 lg:mt-6"
          />
          <div className="w-full mt-auto text-center absolute bottom-24 md:px-16 lg:px-20 px-8 ">
            {/* <h1 className="font-extrabold fsize62-26  w-full text-left">
              Sign In To
              <span className="text-primary"> Refer</span> Your Friend
            </h1> */}
            {/* <p className="login-subttl md:mt-4 lg:mt-4 mt-2 w-full text-left lg:font-bold lg:text-4xl md:font-bold md:text-4xl">
              Lorem ipsum dolor sit amet consectetur. Eget ut dui elit leo odio
              nisi ultrices integer.
            </p> */}
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/3 w-full md:h-full lg:h-full flex">
          <div className="lg:px-20 md:px-20 px-4 pt-10 md:py-24 lg:py-24 pb-10 w-full text-left my-auto">
            <div className="mb-10 lg:mb-20">
            <p className="login-txt ">Login</p>
            <p className="pt-2 text-grey font-medium text-lg">
              Enter username and password to Login to your account
            </p>
            </div>
            <div className="md:mt-8 lg:mt-12 mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.Employee} className="mb-6">
                  <FormLabel className="labels"> Employee ID</FormLabel>
                  <Controller
                    name="Employee"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Employee ID is required",
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      //   message: 'Invalid Employee address',
                      // }, 
                    }}
                    render={({ field }) => <Input {...field} placeholder="Enter employee ID" />}
                  />
                  <FormErrorMessage>
                    {errors.Employee && errors.Employee.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} className="mb-6">
                  <FormLabel className="labels">password</FormLabel>
                  <Controller
                    name="password"
                    type="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "password is required",
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      //   message: 'Invalid password address',
                      // },
                    }}
                    render={({ field }) => <Input {...field} type="password" placeholder="Enter password" />}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                  {/* <div className="flex justify-end mt-1">
                  <span className="text-lg text-primary font-normal cursor-pointer">Forgot Password</span>
                </div> */}
                </FormControl>
               
                <Button mt={4} colorScheme='blue' type="submit" className="w-full" bg="#053C6D" h="14">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    AdminLoginAPI: (payload) => dispatch(adminlogin(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    BillBoards: state?.billBoard?.data,
    toggletabs: state.banner.toggletabs,
    bannerdata: state.banner.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
