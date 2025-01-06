import { useState } from "react";
import SideBar from "../components/SideBar";
import SideBarMobile from "../components/SideBarMobile";
import NavBar from "../components/NavBar";

function CustomerCare() {
  const [active, setActive] = useState("");

  return (
    <>
      <div className="h-screen bg-[#ECEBFE] w-full flex">
        <div className="hidden md:block">
          <SideBar active={active} />
        </div>
        <div className="flex flex-col w-full">
          <div className="block md:hidden">
            <SideBarMobile active={active} />
          </div>
          <NavBar title="Customer Care" />
          <div className="h-screen bg-[#ffffff] mt-4 mx-4 flex rounded-3xl">
            <div className="w-[90%] m-10 flex flex-col justify-start">
              <h1 className="text-xl font-semibold mb-8">Hey Edumarshal,</h1>
              <input
                className="w-full h-18 p-4 rounded-md mb-4 bg-[#ECEBFE]"
                type="text"
                placeholder="Enter your reason"
              />
              <textarea
                className="w-full h-36 p-4 rounded-md mb-4 bg-[#ECEBFE]"
                placeholder="Explain it in a maximum of 100-120 words"
              />
              <button className="bg-[#004BB8] p-2 rounded-lg text-white" type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerCare;
