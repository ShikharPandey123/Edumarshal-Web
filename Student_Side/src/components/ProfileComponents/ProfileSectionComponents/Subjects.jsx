import { TextField } from "@mui/material";
import React from "react";

export default function Subjects(props) {
    return (
        <div className="w-[95%] pb-10 m-auto max-[768px]:items-center flex max-[768px]:flex-col h-fit justify-evenly">
            <div className="w-[25%] max-[768px]:w-[90%] max-[768px]:mb-5 max-[1148px]:w-[35%] pb-6 items-center rounded-xl flex flex-col bg-[#F2F6FF] h-full">
                <img
                    src={props.profilePhoto}
                    className="w-[80%] max-[768px]:w-[200px] mt-6"
                    alt=""
                />
                {props.personalData != null &&
                    props.personalData.map(([key, value], id) =>
                        id > 5 ? null : (
                            <TextField
                                style={{
                                    margin: `${id == 0
                                            ? "30px 5px 10px 5px"
                                            : "10px 5px"
                                        }`,
                                    width: "88%",
                                }}
                                key={id}
                                id="outlined-disabled"
                                variant="outlined"
                                disabled
                                label={key
                                    .replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                    )
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()}
                                defaultValue={value}
                            />
                        )
                    )}
            </div>
            <div className="w-[70%] max-[1148px]:w-[60%] max-[768px]:w-[90%] py-5 rounded-xl flex flex-wrap justify-evenly bg-[#F2F6FF] h-full">
                <div className="w-[93%] mb-5 rounded-md text-white py-2 px-5 bg-blue-600">
                    Subjects
                </div>
                {props.subjects != null &&
                    props.subjects.map((subject, id) => (
                        <div
                            className="w-[93%] mb-5 rounded-md text-gray-400 py-2 px-5 outline outline-1 outline-black"
                            key={id}
                        >
                            {subject.name}
                        </div>
                    ))}
            </div>
        </div>
    );
}
