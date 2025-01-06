import React, { useEffect, useState } from "react";
import timeAgo from "../../constants/timeAgo";

export default function EventsCard(props) {
    const [time, setTime] = useState("");
    useEffect(() => {
        setTime(timeAgo(new Date(props.event.date)));
    }, []);
    return (
        <div className="bg-[#F2F6FF] w-full pb-2 rounded-lg mb-3">
            <div className="flex p-2 justify-between">
                <div className="flex w-[60%] justify-evenly">
                    <img
                        src="./icons/event.png"
                        alt=""
                        className="w-[30px] h-[30px]"
                    />
                    <div>
                        <h1 className="text-[13px]">{props.event.eventName}</h1>
                        <h3 className="text-[9px]">
                            Event Organizer - {props.event.hostingOrgranization}
                        </h3>
                    </div>
                </div>
                <h1 className="text-[7px]">{time}</h1>
            </div>
            <div className="w-[90%] m-auto max-[500px]:translate-x-5 mb-1">
                <h1 className="text-xs font-medium">About Event:</h1>
                <p className="text-[8px] text-gray-600">{props.event.detail}</p>
            </div>
            <div className="w-[90%] m-auto max-[500px]:translate-x-5">
                <h1 className="text-[9px] text-gray-600">
                    <span className="font-medium text-black">Event Date:</span>{" "}
                    {props.event.date}{" "}
                </h1>
            </div>
        </div>
    );
}
