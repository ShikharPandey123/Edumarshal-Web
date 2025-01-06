import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import SwitchTimePeriod from "./Components/SwitchTimePeriod";
import Day from "./Components/Day";
import Week from "./Components/Week";
import Month from "./Components/Month";
import monthNames from "../../../constants/Month.json";

const Attendance = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthNumber = currentDate.getMonth();
  const monthName = monthNames[monthNumber];
  const date = currentDate.getDate();

  const [activeItem, setActiveItem] = useState(1);
  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };

  const [attendance, setAttendance] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(
    attendance.length > 0 ? attendance[0].subject : null
  );

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_API + "/v1/student/attendance",
          { withCredentials: true }
        );
        setAttendance(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full bg-[#ffffff] rounded-3xl mx-4 mt-4 overflow-hidden flex flex-col justify-center items-center">
        <div className="my-4 w-[95%] flex flex-col md:flex-row ml-4 items-center justify-between">
          <div className="text-black font-semibold mb-4 md:mb-0">
            Overall Attendance
          </div>
          <div className="hidden md:block">
            {date} {monthName}, {year}
          </div>
          <SwitchTimePeriod
            onSwitchChange={handleSwitchChange}
            activeIndex={activeItem}
          />
        </div>

        <div className="w-[94%] opacity-10 h-[2px] bg-[#111111] rounded"></div>

        <div className="w-[95%] md:h-[80vh] flex flex-col-reverse md:flex-row">
          <div className="md:w-1/4 mt-4 flex flex-col overflow-y-scroll bg-[#F2F6FF] h-[95%] rounded-2xl">
            <div className="pt-6 pb-3 px-6">All Subjects</div>
            <div className="w-[100%] mb-3 h-[1px] bg-[#D9D9D9]"></div>
            <div className="flex flex-col items-center">
              {loading ? ( // Show skeleton loading if data is loading
                <SkeletonLoading />
              ) : (
                attendance.map((subject) => {
                  const attendancePercentage = Math.round(
                    (subject.totalPresent / subject.totalClasses) * 100
                  );

                  return (
                    <Tooltip
                      key={0}
                      title={`Choose subject for monthly attendance`}
                      arrow
                    >
                      <div
                        key={subject.subject}
                        className={`w-5/6 flex my-3 justify-around shadow-md rounded-2xl bg-white cursor-pointer ${
                          selectedSubject === subject.subject
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => handleSubjectClick(subject.subject)}
                      >
                        <div className="flex flex-col">
                          <h1 className="pt-4 font-medium text-lg md:text-xs lg:text-lg">
                            {subject.subject}
                          </h1>

                          <h1 className="pb-4 md:text-xs lg:text-lg">
                            Attendance - {subject.totalPresent}/
                            {subject.totalClasses}
                          </h1>
                        </div>
                        <div className="my-4">
                          <CircularProgress
                            size="md"
                            determinate
                            value={attendancePercentage}
                          >
                            {attendancePercentage}
                          </CircularProgress>
                        </div>
                      </div>
                    </Tooltip>
                  );
                })
              )}
            </div>
          </div>
          <div className="md:w-3/4 pt-6 flex items-start rounded-2xl">
            {activeItem === 0 && <Day attendanceData={attendance} />}
            {activeItem === 1 && <Week attendanceData={attendance} />}
            {activeItem === 2 && (
              <Month
                attendanceData={attendance}
                subjectName={selectedSubject}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SkeletonLoading = () => {
  return (
    <>
      <div className="w-5/6 flex my-3 justify-around rounded-xl bg-blue-100 ">
        <div className="w-full flex flex-col animate-pulse">
          <div className="w-2/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
          <div className="w-3/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
        </div>
        <div className="w-1/5 h-2/5 m-3 bg-blue-200 rounded-full"></div>
      </div>

      <div className="w-5/6 flex my-3 justify-around rounded-xl bg-blue-100 ">
        <div className="w-full flex flex-col animate-pulse">
          <div className="w-2/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
          <div className="w-3/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
        </div>
        <div className="w-1/5 h-2/5 m-3 bg-blue-200 rounded-full"></div>
      </div>

      <div className="w-5/6 flex my-3 justify-around rounded-xl bg-blue-100 ">
        <div className="w-full flex flex-col animate-pulse">
          <div className="w-2/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
          <div className="w-3/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
        </div>
        <div className="w-1/5 h-2/5 m-3 bg-blue-200 rounded-full"></div>
      </div>

      <div className="w-5/6 flex my-3 justify-around rounded-xl bg-blue-100 ">
        <div className="w-full flex flex-col animate-pulse">
          <div className="w-2/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
          <div className="w-3/4 rounded-lg p-4 m-2 bg-blue-200 "></div>
        </div>
        <div className="w-1/5 h-2/5 m-3 bg-blue-200 rounded-full"></div>
      </div>
    </>
  );
};

export default Attendance;
