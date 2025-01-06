/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

import SwitchTimePeriod from "./SwitchTimePeriod";
import Day from "./Day";
import Month from "./Month";
import monthNames from "../../../constants/Month.json";

const Attendance = ({sectionId, subjectCode}) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthNumber = currentDate.getMonth();
  const monthName = monthNames[monthNumber];
  const date = currentDate.getDate();

  const [activeItem, setActiveItem] = useState(1);
  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };

  const [students, setStudents] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/v1/teacher/sectionStudents/?_id=${sectionId}`,
            { withCredentials: true }
          );
          setStudents(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (sectionId) {
        fetchStudents();
      }
    }, [sectionId]);

    useEffect(() => {
      const fetchAttendance = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_API}/v1/teacher/getAllAttendance/?sectionId=${sectionId}&subjectCode=${subjectCode}`,

              { withCredentials: true }
            );
            setStudentAttendance(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (sectionId) {
          fetchAttendance();
        }
      }, [sectionId]);
  

  return (
    <div className="w-full bg-[#ffffff] rounded-3xl mx-4 mt-4 overflow-hidden flex flex-col justify-center items-center">
      <div className="my-4 w-[95%] flex flex-col md:flex-row ml-4 items-center justify-between">
        <div className=" text-black font-semibold mb-4 md:mb-0">
          Overall Attendance
        </div>
        <div className="hidden md:block text-black">
          {date} {monthName}, {year}
        </div>
        <SwitchTimePeriod
          onSwitchChange={handleSwitchChange}
          activeIndex={activeItem}
        />
      </div>

      <div className="w-[94%] opacity-10 h-[2px] bg-[#111111] rounded"></div>

      <div className="w-[94%] pt-3 flex  items-start  rounded-2xl">
        {activeItem === 0 && <Day attendanceData={studentAttendance} studentData={students} subjectCode={subjectCode}/>}
        {activeItem === 1 && <Month attendanceData={studentAttendance} studentData={students} />}
      </div>
    </div>
  );
};

export default Attendance;
