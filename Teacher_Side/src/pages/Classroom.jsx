import { useState, useEffect } from "react";
import axios from "axios";

import SwitchClassroomTeacher from "../components/Classroom/SwitchClassroomTeacher";
import NavBarTeacher from "../components/NavBarTeacher";
import SideBarTeacher from "../components/SideBarTeacher";

import Attendance from "../components/Classroom/Attendance/Attendance";
import Assignments from "../components/Classroom/Assignments";
import ClassNotes from "../components/Classroom/ClassNotes";
import Exams from "../components/Classroom/Exams";
import Feedback from "../components/Classroom/Feedback";

const Classroom = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/teacher/sections`,
          {
            withCredentials: true,
          }
        );

        const sectionData = response.data.sections.map((item) => ({
          sectionId: item.section.sectionId,
          sectionName: item.section.sectionName,
          subjectName: item.subject.name,
          subjectCode: item.subject.code,
        }));

        setSections(sectionData);

        // Retrieve selected section from local storage or set it to the first section
        const savedSection = localStorage.getItem('selectedSection');
        if (savedSection) {
          const savedSectionData = sectionData.find(section => section.sectionId === savedSection);
          if (savedSectionData) {
            setSelectedSection(savedSectionData.sectionId);
            setSelectedSubject(savedSectionData.subjectCode);
          }
        } else if (sectionData.length > 0) {
          setSelectedSection(sectionData[0].sectionId);
          setSelectedSubject(sectionData[0].subjectCode);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access. Please login again.");
        } else {
          console.error("Error fetching sections:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleSwitchChange = (value) => {
    setActiveItem(value);
  };

  const handleSectionChange = (event) => {
    const newSectionId = event.target.value;
    const newSectionData = sections.find(section => section.sectionId === newSectionId);
    setSelectedSection(newSectionId);
    setSelectedSubject(newSectionData ? newSectionData.subjectCode : '');
    localStorage.setItem('selectedSection', newSectionId);
  };

  return (
    <>
      <div className="bg-[#ECEBFE] w-full flex">
        {/* SideBar */}
        <div className="hidden md:block">
          <SideBarTeacher />
        </div>
        <div className="flex flex-col w-full">
          {/* Navbar */}
          <NavBarTeacher title="Classroom" />

          {/* Select Bar */}
          <div className="hidden md:flex items-center justify-between py-4 bg-[#ffffff] mt-4 mx-4 rounded-3xl">
            <div className="ml-10 rounded-2xl">
              <SwitchClassroomTeacher
                onSwitchChange={handleSwitchChange}
                activeIndex={activeItem}
              />
            </div>

            {/* Section Dropdown */}
            <div className="mx-8">
              <select
                value={selectedSection}
                onChange={handleSectionChange}
                className="px-4 py-1 border border-black rounded-lg text-black"
              >
                <option value="" disabled>Select a section</option>
                {sections.map((section) => (
                  <option key={section.sectionId} value={section.sectionId}>
                    {section.sectionName} ({section.subjectName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex w-full">
            {activeItem === 0 && <Attendance sectionId={selectedSection} subjectCode={selectedSubject} />}
            {activeItem === 1 && <Assignments />}
            {activeItem === 2 && <ClassNotes />}
            {activeItem === 3 && <Exams />}
            {activeItem === 4 && <Feedback />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Classroom;
