import React, { useEffect, useState } from "react";
import sideMenu from "../constants/SideMenu.json";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';


export default function SideBarTeacher(props) {
    const [menu, setMenu] = useState(true);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.active != "") {
            setFlag(true);
        }
    });

    const hoverEffect = (img, e) => {
        if (flag && img.includes(props.active)) {
            return null;
        }
        e.target.nextElementSibling.style.background = `url('./icons/${img}.png')`;
        e.target.nextElementSibling.style.backgroundSize = "50%";
        e.target.nextElementSibling.style.backgroundPosition = "center";
        e.target.nextElementSibling.style.backgroundRepeat = "no-repeat";
    };

    const getClickData = (e) => {
        const link = e.target.nextElementSibling.style.background.slice(
            13,
            e.target.nextElementSibling.style.background.indexOf(".png")
        );

        e.target.nextElementSibling.style.background = `url('./icons/${link}.png')`;
        e.target.nextElementSibling.style.backgroundSize = "50%";
        e.target.nextElementSibling.style.backgroundPosition = "center";
        e.target.nextElementSibling.style.backgroundRepeat = "no-repeat";
        return link;
    };

    return (
        <div
            className="transition-all hidden md:block fixed max-[1024px]:fixed z-[99] left-0 top-0 min-h-screen max-[1024px]:h-full flex-col py-5 px-1 items-start bg-[#004BB8]"
            style={{
                width: `${menu ? "70px" : "230px"}`,
            }}
        >
            <Tooltip id="my-tooltip" />
            <img
                className="cursor-pointer p-0 w-[40px]"
                onClick={() => setMenu(!menu)}
                src={menu ? "./icons/hamburger.png" : "./icons/close.png"}
                style={{
                    padding: `${!menu ? "3px" : "12px"}`,
                    paddingTop: `${!menu ? "0px" : "9.8px"}`,
                    marginBottom: "25.9px",
                    marginLeft: "10px",
                    width: `${!menu ? "40px" : "45px"}`,
                }}
                alt="No image"
            />
            {sideMenu.map((element, id) => (
                <div
                    key={id}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={menu ? element.title : ""}
                    className={`flex relative bg-${element.focus == props.active ? "white" : "transparent"
                        } items-center w-[${menu ? "80%" : "95%"
                        }] rounded-lg text-${element.focus == props.active ? "blue-600" : "white"
                        } my-1 ml-1 hover:bg-white hover:text-blue-600`}
                >
                    <div
                        className="absolute cursor-pointer top-0 w-full h-full bg-transparent"
                        onMouseOver={(e) => hoverEffect(element.focus, e)}
                        onMouseOut={(e) => hoverEffect(element.unfocus, e)}
                        onClick={(e) => {
                            navigate(`/${getClickData(e)}`, {
                                state: { active: getClickData(e) },
                            });
                        }}
                    ></div>
                    <div
                        className={`px-6 py-5 rounded-lg bg-no-repeat bg-center cursor-pointer`}
                        // alt=""
                        // src={element.focus}
                        style={{
                            backgroundImage: `url('./icons/${flag && props.active == element.focus
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
                            display: `${!menu ? "block" : "none"}`,
                        }}
                    >
                        {element.title}
                    </h1>
                </div>
            ))
            }
        </div >
    );
}

SideBarTeacher.defaultProps = {
    active: "",
};
