import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
function Centernavbar() {
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
const clikcactive2=()=>{
  setActive(false)
  setActive2(true)
}
const clickactive=()=>{
  setActive(true)
  setActive2(false) 
}
  return (
    <div className="w-full h-14 r-6026j sticky top-0">
      <div className="flex w-full h-full">
        <div onClick={clickactive}  className={active?'flex flex-col justify-center items-center first w-[45%] hoverbg relative textrgbe font-medium':'flex flex-col justify-center items-center first w-[45%] hoverbg relative navbarcolor font-medium'}>
          <span>For You</span>
          {active ? (
            <div className="h-1 w-16 navbarborder absolute bottom-0 rounded-2xl"></div>

          ) : null}
        </div>
        <div onClick={clikcactive2} className={active2?'flex flex-col justify-center items-center first w-[45%] hoverbg relative textrgbe font-medium':'flex flex-col justify-center items-center first w-[45%] hoverbg relative navbarcolor font-medium'}>
          <span>Followig</span>
          {active2?(
            <div className="h-1 w-16 navbarborder absolute bottom-0 rounded-2xl"></div>
          ):(null)}
          
        </div>
        <div className=" flex  items-center justify-center third w-[10%] ">
          <CiSettings className="w-10 h-10 px-2 py-2 hoverbg rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Centernavbar;
