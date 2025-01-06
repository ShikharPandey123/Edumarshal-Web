import React, { useEffect, useState } from "react";
import sideMenu from "../constants/sideMenu.json";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import Cookies from 'js-cookie';

export default function SideBar({ active }) {
    const [menu, setMenu] = useState(true);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    // UseEffect to set the flag based on the active prop
    useEffect(() => {
        if (active !== "") {
            setFlag(true);
        }
    }, [active]); // Adding dependency to run only when active prop changes

    // Function to handle hover effect on icons
    const hoverEffect = (img, e) => {
        if (flag && img.includes(active)) {
            return;
        }
        const target = e.target.nextElementSibling;
        target.style.background = `url('./icons/${img}.png')`;
        target.style.backgroundSize = "50%";
        target.style.backgroundPosition = "center";
        target.style.backgroundRepeat = "no-repeat";
    };

    // Function to handle click and get the background data
    const getClickData = (e) => {
        const link = e.target.nextElementSibling.style.background.slice(
            13,
            e.target.nextElementSibling.style.background.indexOf(".png")
        );

        const target = e.target.nextElementSibling;
        target.style.background = `url('./icons/${link}.png')`;
        target.style.backgroundSize = "50%";
        target.style.backgroundPosition = "center";
        target.style.backgroundRepeat = "no-repeat";
        return link;
    };

    return (
        <div
            className="transition-all hidden md:block sticky max-md:fixed z-[99] left-0 top-0 h-screen max-md:h-full flex-col py-5 px-1 items-start bg-[#004BB8]"
            style={{
                width: menu ? "70px" : "230px",
            }}
        >
            <Tooltip id="my-tooltip" />
            <img
                className="cursor-pointer p-0 w-[40px]"
                onClick={() => setMenu(!menu)}
                src={menu ? "./icons/hamburger.png" : "./icons/close.png"}
                style={{
                    padding: !menu ? "3px" : "12px",
                    paddingTop: !menu ? "0px" : "9.8px",
                    marginBottom: "25.9px",
                    marginLeft: "10px",
                    width: !menu ? "40px" : "45px",
                }}
                alt="Menu Toggle"
            />
            {sideMenu.map((element, id) => (
                <div
                    key={id}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={menu ? (element.title === "Fees" ? "Fees Section" : element.title) : ""}
                    className={`flex relative bg-${element.focus === active ? "white" : "transparent"
                        } items-center w-[${menu ? "80%" : "95%"}] rounded-lg text-${element.focus === active ? "blue-600" : "white"
                        } my-1 ml-1 hover:bg-white hover:text-blue-600 ${id === 9 ? "mt-[26vh]" : ""}`}
                >
                    <div
                        className="absolute cursor-pointer top-0 w-full h-full bg-transparent"
                        onMouseOver={(e) => hoverEffect(element.focus, e)}
                        onMouseOut={(e) => hoverEffect(element.unfocus, e)}
                        onClick={(e) => {
                            if (id !== 9) {
                                const link = getClickData(e);
                                navigate(`/${link}`, {
                                    state: { active: link },
                                });
                            } else {
                                Cookies.remove('accessToken');
                                alert("Removed access token");
                            }
                        }}
                    />
                    <div
                        className="px-6 py-5 rounded-lg bg-no-repeat bg-center cursor-pointer"
                        style={{
                            backgroundImage: `url('./icons/${flag && active === element.focus
                                ? element.focus
                                : element.unfocus}.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "50%",
                            backgroundPosition: "center",
                        }}
                    />
                    <h1
                        className="ml-2 text-[15px] transition-all"
                        style={{
                            display: !menu ? "block" : "none",
                        }}
                    >
                        {element.title}
                    </h1>
                </div>
            ))}
        </div>
    );
}

// Default props for SideBar component
SideBar.defaultProps = {
    active: "",
};
