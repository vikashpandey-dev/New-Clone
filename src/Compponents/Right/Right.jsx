import React from "react";
import Whatshapping from "./Whatshapping"
import Whofloows from "./Whofloows";
function Right() {
  return (
    <div className=" my-2  sticky top-0 w-full px-10">
      <div className="w-full">
        <input
          type="text"
          placeholder="Seaarch"
          className="backgroundright  px-4 py-3 rounded-full w-full"
        />
      </div>
      <div className="premium w-full my-3 px-4 py-3 backgroundright rounded-2xl">
        <h1 className="font-bold text-2xl text-black">Subscribe to Premium</h1>
        <p className="text-gray-600 my-2 text-medium font-normal">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button className=" bg-black rounded-3xl text-white px-7 font-bold  py-2">Subscribe</button>
      </div>
      <div className="w-full  my-3  py-3 backgroundright rounded-2xl">
        <Whatshapping/>
      </div>
      <div className="w-full  my-3   backgroundright rounded-2xl">
      <Whofloows/>
      </div>
    </div>
  );
}

export default Right;
