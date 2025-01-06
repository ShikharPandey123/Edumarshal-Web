import { useState } from "react";

import SideBar from "../components/SideBar";
import SideBarMobile from "../components/SideBarMobile";
import NavBar from "../components/NavBar";
import ApplyForm from "../components/HostelComponents/ApplyForm";

export default function Hostel() {
  const [isLeaveContentVisible, setLeaveContentVisible] = useState(false);
  const [isYourLeaveContentVisible, setYourLeaveContentVisible] =
    useState(false); // State for "Your Leaves" content

  const handleApplyLeaveClick = () => {
    setLeaveContentVisible(!isLeaveContentVisible);
    setYourLeaveContentVisible(false); // Hide "Your Leaves" content when "Apply Leave" is clicked
  };

  const handleYourLeavesClick = () => {
    setYourLeaveContentVisible(!isYourLeaveContentVisible);
    setLeaveContentVisible(false); // Hide "Apply Leave" content when "Your Leaves" is clicked
  };

  const [active, setActive] = useState("");
  const [activefees, setActivefees] = useState(0);
  const handleoptionfees = (index) => {
    setActivefees(index);
    if (index === 0) {
      handleApplyLeaveClick();
    } else {
      handleYourLeavesClick();
    }
  };

  return (
    <>
      <div className="bg-[#ECEBFE] w-full flex">

        <SideBar active={active} />

        <div className="block md:hidden">
          <SideBarMobile active={active} />
        </div>
        <div className="flex flex-col w-full">
          <NavBar title="Hostel" />
          <div className="bg-[#ffffff] h-full overflow-y-auto">
            {/* Select Option for fees */}
            <div className="sticky top-0 w-full bg-white flex flex-wrap items-center md:gap-5 gap-1 md:text-lg text-sm p-4 px-8 ml-0">
              {["Apply Leave", "Your Leaves"].map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleoptionfees(index)}
                  className={`${activefees === index
                    ? "md:border-b-4 border-b-2"
                    : "md:border-b-0"
                    }
                     flex items-center p-1 font-medium cursor-pointer border-[#004BB8]`}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#f2f6ff] md:rounded-3xl rounded-xl overflow-y-auto">
              {!isYourLeaveContentVisible && (
                <div
                  className={`h-[50px] bg-[#004BB8] my-5 rounded-[0.5rem] items-center flex justify-between cursor-pointer sm:mx-10 mx-2`}
                >
                  <div className="text-white md:font-semibold sm:text-base text-xs px-3 md:pl-10 flex justify-between w-full">
                    <span>My Hostel/Room</span>
                    <span className="flex" onClick={handleApplyLeaveClick}>
                      Apply Leave
                      <span className="pl-2 pt-0.5 pr-6">
                        <img src="./icons/PlusSign.png" alt="Plus Sign" />
                      </span>
                    </span>
                  </div>
                </div>
              )}

              {isLeaveContentVisible && !isYourLeaveContentVisible && (
                <div className="content-below bg-white p-4 rounded shadow-md sm:mx-10 mx-2">
                  <ApplyForm />
                </div>
              )}

              {isYourLeaveContentVisible && (
                <>
                  <div
                    className={`h-[50px] bg-[#004BB8] my-5 rounded-[0.5rem] items-center flex justify-between cursor-pointer sm:mx-10 mx-2`}
                  >
                    <div className="text-white md:font-semibold sm:text-base text-xs px-3 md:pl-10 flex justify-between w-full">
                      <span>S.No.</span>
                      <span>Reason</span>
                      <span>Start Date</span>
                      <span>End Date</span>
                      <span>Download</span>
                    </div>
                  </div>
                  <div className="content-below bg-white p-4 rounded shadow-md sm:mx-10 mx-2">
                    <div className="text-sm md:text-base">
                      <div className="flex justify-between py-2">
                        <span>1</span>
                        <span>Out of station</span>
                        <span>20/09/2023</span>
                        <span>23/09/2023</span>
                        <span>Download</span>
                      </div>
                      {/* Add sample leave records or leave this section for dynamic content */}
                      <div className="flex justify-between py-2">
                        <span>2</span>
                        <span>Sick Leave</span>
                        <span>01/05/2024</span>
                        <span>05/05/2024</span>
                        <span>
                          <button className="text-blue-500">Download</button>
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>3</span>
                        <span>Family Function</span>

                        <span>15/05/2024</span>
                        <span>20/05/2024</span>
                        <span>
                          <button className="text-blue-500">Download</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
