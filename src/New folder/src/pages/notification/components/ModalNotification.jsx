import React, { useEffect, useState } from "react";
import { FormLabel, Input, Button, Textarea } from "@chakra-ui/react";
import { CreateNotification } from "../../../api/Notification";
import Swal from "sweetalert2";
import { connect } from "react-redux";
const ModalNotification = (props) => {
  // console.log(props, "propspropsprops");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const SendNotification = async () => {
    if (message == "" || title == "") {
      return GetMessage("warning", "Please Fill All Details");
    }
    const payload = {
      message: message,
      title: title,
    };
    if (date != "") {
      Object.assign(payload, { trigerdate: date });
    }
    if (Time != "") {
      Object.assign(payload, { trigertime: Time });
    }
    if (props.EMPLI_D.length > 0) {
      let formattedString = "[" + props.EMPLI_D.join(", ") + "]";
      Object.assign(payload, { EMPL_ID: formattedString });
    }
    // console.log(payload, "payloadpayload");

    let responce = await props.CreateNotificationAPI(payload);
    const data = {
      close: true,
    };
    props.alert(data);
  };
  const [selectedTime, setSelectedTime] = useState("");
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Set the minimum time to the current time
  const currentMinTime = getCurrentTime();
  useEffect(() => {
    // Set the selectedTime state to the current time initially
    setSelectedTime(currentMinTime);
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];
  const [convertedDate, setconvertedDate] = useState("");
  const GetMessage = (type, messga) => {
    setTimeout(() => {
      Swal.fire({
        icon: type,
        title: messga,
        showConfirmButton: false,
        timer: 2000,
      });
    }, []);
  };


  return (
    <div>
      <div className="my-2">
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-2">
        <FormLabel>Message </FormLabel>
        <Textarea
          value={message}
          placeholder="Message"
          size="sm"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="grid gap-2 grid-cols-2 mt-4">
        <div>
          <FormLabel size="sm">Date </FormLabel>
          <Input
            placeholder="Select Date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            name="date"
            min={currentDate}
            value={date}
          />
        </div>
        <div>
          <FormLabel size="sm">Time </FormLabel>
          <Input
            placeholder="Add Time"
            onChange={(e) => setTime(e.target.value)}
            name="time"
            type="time"
            value={Time}
            // min={currentMinTime}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button
          bg="cprimary.500"
          color="white"
          fontWeight="500"
          _hover={{ bg: "cprimary.600" }}
          variant="solid"
          onClick={SendNotification}
        >
          Send Notification
        </Button>
      </div>
      </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    GetUSerAPI: (payload) => dispatch(GetAllowUser(payload)),
    UpdateUserAPI: (payload) => dispatch(updateUser(payload)),
    CreateNotificationAPI: (payload) => dispatch(CreateNotification(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    usersdata: state?.users?.data,
    allowuser: state?.users?.allowuser,
    Currenttabs: state.tabs.ActiveTabs,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalNotification);
//   )
// }

// export default ModalNotification
