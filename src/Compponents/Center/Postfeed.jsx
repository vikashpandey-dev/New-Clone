import React from "react";
import { feedData } from "./feed";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";
import { BiRepost } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
function Postfeed() {
  return (
    <div className="w-full border-[1px] border-gray-700">
      {feedData.map((val, i) => {
        return (
          <>
            <div className="flex justify-center  md:px-2 py-3 hover:bg-gray-100 hover:bg-opacity-95 border-x-0 border-b-[1px]  border-gray-700 ">
              <div className="w-[10%] rounded-full items-center">
                <img
                  className=" w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
                  src={val.userImage}
                  alt=""
                />
              </div>
              <div className="w-[90%] md:px-2">
                <div className="flex w-full justify-center items-center  ">
                  <div className="flex w-full gap-2">
                    <div className="flex md:gap-1 justify-center items-center">
                      <p className=" textrgbe cursor-pointer md:font-bold text-sm md:text-medium">
                        <span>{val.name}</span>
                      </p>
                      <svg
                        viewBox="0 0 22 22"
                        role="img"
                        class="w-5 h-5 iconcolor r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-1plcrui r-lrvibr r-1cvl2hr r-f9ja8p r-og9te1 r-9cviqr"
                      >
                        <g>
                          <path
                            d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246"
                            fill="rgba(29, 155, 240, 1.00)"
                          ></path>
                        </g>
                      </svg>

                      <p className="textcolor text-sm md:text-normal">@narendramodi</p>
                      <p className="textcolor md:font-medium text-sx md:text-normal">
                        {val.postTime}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <BiDotsHorizontalRounded />
                  </div>
                </div>
                <div className=" ">
                  <h1 className="font-normal textcolor">{val.title}</h1>
                  <div className="py-3 h-[500px] w-full ">
                    <img
                      src={val.postImage}
                      className="rounded-2xl h-full w-full object-cover "
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between items-center my-2 textcolor  ">
                    <div className="flex justify-between items-center md:gap-1 cursor-pointer ">
                      <FaRegComment className="font-medium w-10 h-10 rounded-full px-3 py-3  " />
                      <h1 className="">{val.comment}</h1>
                    </div>
                    <div className="flex justify-between items-center md:gap-1 ">
                      <BiRepost className="font-medium text-normal md:text-2xl" />
                      <h1>{val.retweet}</h1>
                    </div>
                    <div className="flex justify-between items-center md:gap-1 ">
                      <CiHeart className="font-medium text-normal md:text-2xl" />
                      <h1>{val.likes}</h1>
                    </div>
                    <div className="flex justify-between items-center md:gap-1   ">
                      <GrFormView className="font-medium text-normal md:text-2xl" />
                      <h1>{val.view}</h1>
                    </div>
                    <div className="flex justify-between items-center md:gap-1 ">
                      <div className="font-medium text-xl">
                        <CiBookmark className="font-medium text-xl" />
                      </div>
                      <div className="">
                        <LuDownload className="font-bold text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Postfeed;
