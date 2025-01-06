import React from 'react'
import SwitchPlacement from '../components/PlacementComponents/SwitchPlacement'
import SideBar from '../components/SideBar';
import SideBarMobile from '../components/SideBarMobile';
import ProfileSection from '../components/ProfileComponents/ProfileSection';
import PdpAttendance from '../components/PlacementComponents/PdpAttendance';
import Internship from '../components/PlacementComponents/Internship';
import PlacementEvent from '../components/PlacementComponents/PlacementEvent';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useState } from 'react';

function Placement() {
  const [active, setActive] = useState("");
  //   const location = useLocation();
  //   useEffect(() => {
  //     setActive(location.state.active);
  //   }, []);
  const [activeItem, setActiveItem] = useState(1);
  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };
  const location = useLocation()
  useEffect(() => {
    setActive(location.state.active);
  }, []);
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
          <NavBar title="Placement" />
          <div className=" bg-[#ffffff] mt-4 mx-4 flex flex-wrap items-center rounded-3xl">
            <div className="ml-10">
              <SwitchPlacement
                onSwitchChange={handleSwitchChange}
                activeIndex={activeItem}
              />
            </div>
          </div>
          {activeItem === 0 && <PlacementEvent />}
          {activeItem === 1 && <Internship />}
          {activeItem === 2 && <PdpAttendance />}
        </div>
      </div>
    </>
  )
}

export default Placement