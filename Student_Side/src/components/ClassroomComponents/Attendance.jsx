
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;

const Attendance = () => {
    const [activeoption, setActiveoption] = useState(0);
    const [attendance, setAttendace] = useState(0);

    const handleoptionClick = (index) => {
        setActiveoption(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_API + "/v1/student/attendance",
                    { withCredentials: true }
                );
                setAttendace(response.data.Attendance);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-[#ffffff] h-[72vh] rounded-3xl mx-4 mt-4 overflow-y-auto flex flex-col justify-center items-center">
            <div className="my-6 w-[95%] sticky bg-white ml-4 flex flex-wrap items-center justify-between">
                <div>Overall Attendance</div>
                <div className="flex gap-5 pr-8">
                    <h1>Month</h1>
                    <h1>Week</h1>
                    <h1>Day</h1>
                </div>
            </div>

            <div className="w-[94%]  h-[2px] bg-[#D9D9D9] mb-6"></div>

            {activeoption === 0 && (
                <div className="w-[95%] m-auto flex h-full justify-evenly">
                    <div className="w-[25%] flex flex-col overflow-y-scroll bg-[#F2F6FF] h-full rounded-2xl">
                        <div className="pt-6 pb-3 px-6">All Subjects</div>
                        <div className="w-[100%] mb-3 h-[1px] bg-[#D9D9D9]"></div>
                        <div className="flex flex-col items-center">
                            <div className="flex my-3 justify-center shadow-md rounded-2xl bg-white">
                                <div className="flex flex-col">
                                    <h1 className="px-6 pt-4 font-medium text-lg">
                                        Mathematics IV
                                    </h1>
                                    <h1 className="px-6 pb-4">
                                        Attendance - 39/57
                                    </h1>
                                </div>
                                <div
                                    style={{ width: 60, height: 60 }}
                                    className="my-4 mx-4 "
                                >
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                    />
                                </div>
                            </div>

                            <div className="flex my-3 justify-center shadow-md rounded-2xl bg-white">
                                <div className="flex flex-col">
                                    <h1 className="px-6 pt-4 font-medium text-lg">
                                        Mathematics IV
                                    </h1>
                                    <h1 className="px-6 pb-4">
                                        Attendance - 39/57
                                    </h1>
                                </div>
                                <div
                                    style={{ width: 60, height: 60 }}
                                    className="my-4 mx-4 "
                                >
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] flex flex-col items-start h-full rounded-2xl">
                        <div className="flex justify-center items-center px-8 py-2 gap-11">
                            <select
                                className="bg-[#004BB8] text-white border-opacity-0 px-6 py-2 rounded-xl font-semibold"
                                name="selectedWeek"
                            >
                                <option value="week-1">Week-1</option>
                                <option value="week-2">Week-2</option>
                                <option value="week-3">Week-3</option>
                                <option value="week-4">Week-4</option>
                            </select>

                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    1
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    2
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    3
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    4
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    5
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    6
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[49px] bg-[#F2F6FF] rounded-lg">
                                <h1 className="font-semibold text-[#004BB8]">
                                    7
                                </h1>
                            </div>
                        </div>
                        <div className="flex ml-8 px-8 py-2 gap-16 bg-[#004BB8] text-white rounded-lg">
                            <h1 className="mr-7">SUBJECT</h1>
                            <h1 className="mr-4">MON</h1>
                            <h1 className="mr-4">TUE</h1>
                            <h1 className="mr-2">WED</h1>
                            <h1 className="mr-3">THUR</h1>
                            <h1 className="mr-5">FRI</h1>
                            <h1 className="mr-3">SA</h1>
                            <h1>SUN</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;

