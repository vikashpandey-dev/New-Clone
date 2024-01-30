import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBell,
  faEnvelope,
  faList,
  faGem,
  faUser,
  faEllipsisH,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Left = () => {
  const icons = [
    { name: "Home", icon: faHome },
    { name: "Explore", icon: faCompass },
    { name: "Notification", icon: faBell },
    { name: "Message", icon: faEnvelope },
    { name: "Grocs ", icon: faList },
    { name: "Premium", icon: faGem },
    { name: "Profile", icon: faUser },
    { name: "More", icon: faEllipsisH },
    // Add similar objects for other icons
  ];

  return (
    <>
   <div className="sticky top-0 w-full">
   <div className="flex items-center  cursor-pointer p-2 w-full    rounded-md  ">
        <div className="w-2/6 flex justify-end ">
          {" "}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6 h-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-18jsvk2 r-16y2uox r-8kz0gk"
            stroke="white"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </div>
        <div className="w-2/6">
          <span className="text-2xl "></span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        {icons.map((iconObject, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 cursor-pointer p-2 w-1/2 lefthover hover:rounded-full lefttext rounded-md  "
          >
            <div className=" w-full md:w-2/6 flex justify-end px-2 md:px-6">
              {" "}
              <FontAwesomeIcon icon={iconObject.icon} className="text-2xl" />
            </div>
            <div className="md:w-2/6 hidden md:block">
              
              <span className={index==0?'text-2xl font-bold':'text-2xl '}>{iconObject.name}</span>
            </div>
          </div>
        ))}
      </div>
   </div>
    </>
  );
};

export default Left;
