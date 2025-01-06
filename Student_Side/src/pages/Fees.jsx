import react, { useEffect } from "react";
import SideBar from "../components/SideBar";
import FeesNavbar from "../components/FeesComponents/FeesNavbar";
import { useState } from "react";
import FeeStructure from "../components/FeesComponents/FeeStructure";
import PayOnline from "../components/FeesComponents/PayOnline";
import PaymentHistory from "../components/FeesComponents/PaymentHistory";
import OfflinePaymentHistory from "../components/FeesComponents/OfflinePaymentHistory";
import NavBar from "../components/NavBar";
import SideBarMobile from "../components/SideBarMobile";
import { useLocation } from "react-router-dom";

export default function Fees() {
    const [activefees, setActivefees] = useState(0);
    const [active, setActive] = useState("");
    const handleoptionfees = (index) => {
        setActivefees(index);
    };
    const location = useLocation()
    useEffect(() => {
        setActive(location.state.active);
    }, []);
    return (
        <div className="h-screen bg-[#ECEBFE] w-full flex">
            <SideBar active={active} />
            <div className="flex flex-col w-full">
                <div className="block md:hidden">
                    <SideBarMobile active={active} />
                </div>
                <NavBar title="Fees" />
                <div className="bg-[#ffffff] h-full overflow-y-auto">
                    {/* Select Option for fees */}
                    <div className=" sticky top-0 w-full bg-white flex flex-wrap items-center md:gap-5 gap-1 md:text-lg text-sm  p-4  px-8 ml-0 ">
                        {[
                            "Fee Structure",
                            "Pay Online",
                            "Offline Payment History"
                        ].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleoptionfees(index)}
                                className={`${activefees === index ? "md:border-b-4 border-b-2" : "md:border-b-0"
                                    }
                     flex items-center p-1  font-medium cursor-pointer border-[#004BB8]`}
                            >
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    {/* Select Option For fees ends */}
                    {/* Fee Structure components */}
                    {activefees === 0 && <FeeStructure />}
                    {activefees === 1 && <PayOnline />}
                    {activefees === 2 && <OfflinePaymentHistory />}
                    {/* Fee Structure components Ends */}
                </div>
            </div>
        </div>
    )
}