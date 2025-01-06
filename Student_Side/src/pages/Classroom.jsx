import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SwitchClassroom from "../components/ClassroomComponents/SwitchClassroom";
import Attendance from "../components/ClassroomComponents/Attendance/Attendance";
import Assignments from "../components/ClassroomComponents/Assignments";
import ClassNotes from "../components/ClassroomComponents/Classnotes";
import Exams from "../components/ClassroomComponents/Exams";
import Syllabus from "../components/ClassroomComponents/Syllabus";
import Feedback from "../components/ClassroomComponents/Feedback";
import SideBarMobile from "../components/SideBarMobile";

export default function Classroom() {
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActive(location.state.active);
  }, []);

  const [activeItem, setActiveItem] = useState(0);

  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };

  return (
    <>
      <div className=" bg-[#ECEBFE] w-full flex">
        {/* SideBar */}
        <div className="hidden md:block">
          <SideBar active={active} />
        </div>
        <div className="block md:hidden">
          <SideBarMobile active={active} />
        </div>

        <div className="flex flex-col w-full">
          {/* Navbar */}
          <NavBar title="Classroom" />

          {/* Select Bar */}
          <div className="hidden md:block items-center justify-center  py-4 bg-[#ffffff] mt-4 mx-4 rounded-3xl">
            <div className="ml-10 rounded-2xl">
              <SwitchClassroom
                onSwitchChange={handleSwitchChange}
                activeIndex={activeItem}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex w-full ">
            {activeItem === 0 && <Attendance />}
            {activeItem === 1 && <Assignments />}
            {activeItem === 2 && <ClassNotes />}
            {activeItem === 3 && <Exams />}
            {activeItem === 4 && <Syllabus />}
            {activeItem === 5 && <Feedback />}
          </div>
        </div>
      </div>
    </>
  );
}
