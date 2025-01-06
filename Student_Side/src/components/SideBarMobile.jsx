import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sideMenu from "../constants/sideMenu.json";
import { toggleMenu } from "../store/store";

export default function SideBarMobile(props) {
    const [flag, setFlag] = useState(false); // State to determine if a menu item is active
    const menu = useSelector((state) => state.menu.isOpen); // Redux state to determine if the menu is open
    const navigate = useNavigate(); // Hook to navigate to different routes
    const dispatch = useDispatch(); // Hook to dispatch actions

    useEffect(() => {
        // Set flag to true if props.active is not an empty string
        if (props.active !== "") {
            setFlag(true);
        }
    }, [props.active]); // Dependency array ensures this effect runs only when props.active changes

    // Function to apply hover effect on menu items
    const hoverEffect = (img, e) => {
        if (flag && img.includes(props.active)) {
            return;
        }
        const target = e.target.nextElementSibling;
        target.style.background = `url('./icons/${img}.png')`;
        target.style.backgroundSize = "50%";
        target.style.backgroundPosition = "center";
        target.style.backgroundRepeat = "no-repeat";
    };

    // Function to handle menu item click
    const handleClick = (element) => {
        dispatch(toggleMenu()); // Dispatch action to toggle menu state
        navigate(`/${element.focus}`, {
            state: { active: element.focus },
        }); // Navigate to the selected menu item's route
    };

    return (
        <div
            className="flex sticky top-0 transition-all mt-[60px] max-[780px]:fixed z-[99] h-screen max-[780px]:h-full flex-col max-w-[425px] py-5 px-1 items-start bg-[#004BB8]"
            style={{
                width: menu ? "0" : "100%",
                padding: menu ? "0" : "20px",
            }}
        >
            {sideMenu.map((element, id) => (
                <div
                    key={id}
                    style={{
                        display: menu ? "none" : "flex",
                    }}
                    className={`flex relative bg-${element.focus === props.active ? "white" : "transparent"
                        } items-center w-[${menu ? "87%" : "95%"
                        }] rounded-lg text-${element.focus === props.active ? "blue-600" : "white"
                        } my-1 ml-1 hover:bg-white hover:text-blue-600`}
                >
                    <div
                        className="absolute cursor-pointer top-0 w-full h-full bg-transparent"
                        onMouseOver={(e) => hoverEffect(element.focus, e)}
                        onMouseOut={(e) => hoverEffect(element.unfocus, e)}
                        onClick={() => handleClick(element)}
                    />
                    <div
                        className="px-6 py-5 rounded-lg bg-no-repeat bg-center cursor-pointer"
                        style={{
                            backgroundImage: `url('./icons/${flag && props.active === element.focus
                                ? element.focus
                                : element.unfocus
                                }.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "50%",
                            backgroundPosition: "center",
                        }}
                    />
                    <h1
                        className="ml-2 text-[15px] transition-all"
                        style={{
                            display: menu ? "none" : "block",
                        }}
                    >
                        {element.title}
                    </h1>
                </div>
            ))}
        </div>
    );
}

// Default props for the component
SideBarMobile.defaultProps = {
    active: "",
};
