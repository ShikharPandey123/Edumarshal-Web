import React, { useState } from "react";
import SideSubCard from "./SideSubCard";

export default function SideCard(props) {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState("100px");
    const openHandler = () => {
        setHeight(
            !open ? `${100 + props.array.assignment.length * 80}px` : "100px"
        );
        setOpen(!open);
        console.log(height);
        console.log(open);
    };
    return (
        <div
            className="w-[90%] mt-4 transition-all pb-4 rounded-md shadow-sm cursor-pointer shadow-black"
            style={{ height: height }}
        >
            {" "}
            <div className="flex max-[500px]:translate-x-[5%] w-[90%] m-auto mt-2 justify-between">
                <h1 className="font-semibold text-[15px]">
                    {props.array.subject}
                </h1>
                <img
                    onClick={openHandler}
                    src={`${open ? "./icons/up.png" : "./icons/down.png"}`}
                    alt=""
                    className="w-[20px] h-[20px]"
                />
            </div>
            <div className="flex max-[500px]:translate-x-[5%] justify-between items-end w-[90%] mt-3 m-auto">
                <div className="flex justify-evenly">
                    <img
                        className="w-[40px] h-[40px] mr-2"
                        src="./icons/teacherImage.png"
                        alt=""
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[12px]">{props.array.teacher}</h1>
                        <h2 className="text-[9px] text-gray-500">
                            Assitant Professor
                        </h2>
                    </div>
                </div>
                <span className="text-[9px] text-gray-600">view all</span>
            </div>
            <div>
                {props.array.assignment?.map((assignment, id) => (
                    <SideSubCard key={id} open={open} desc={assignment} />
                ))}
            </div>
        </div>
    );
}
