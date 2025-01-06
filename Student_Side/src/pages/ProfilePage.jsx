import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useRef } from "react";
import SwitchProfile from "../components/ProfileComponents/SwitchProfile";
import DocumentSection from "../components/ProfileComponents/DocumentSection";
import ProfileSection from "../components/ProfileComponents/ProfileSection";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBarMobile from "../components/SideBarMobile";
export default function ProfilePage() {
  const [active, setActive] = useState("");
  const location = useLocation();
  useEffect(() => {
    setActive(location.state.active);
  }, []);
  const [activeItem, setActiveItem] = useState(1);
  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };

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
          <NavBar title="Profile" />
          <div className=" bg-[#ffffff] mt-4 mx-4 flex flex-wrap items-center rounded-3xl">
            <div className="ml-10">
              <SwitchProfile
                onSwitchChange={handleSwitchChange}
                activeIndex={activeItem}
              />
            </div>
          </div>
          {activeItem === 1 && <DocumentSection />}
          {activeItem === 0 && <ProfileSection />}
        </div>
      </div>
    </>
  );
}
