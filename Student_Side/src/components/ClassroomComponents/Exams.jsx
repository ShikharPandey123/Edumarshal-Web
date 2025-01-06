import React, { useEffect, useState } from "react";
import ExamComponent from "./ExamComponent";
import axios from "axios";

const Exams = () => {
  const [activeOption, setActiveOption] = useState(0);
  const [examData, setExamData] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [timetable, setTimetable] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingTimetable, setLoadingTimetable] = useState(true);

  useEffect(() => {
    getExam();
    getTimetable();
  }, []);

  const getExam = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_API + "/v1/student/exam/result", {
        withCredentials: true,
      })
      .then((res) => {
        const responseData = res.data;
        console.log(responseData);
        setExamData(responseData);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const getTimetable = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_API + "/v1/student/exam/timetable", {
        withCredentials: true,
      })
      .then((res) => {
        const timetableUrl = res.data.examTimetable.examTimetableUrl;
        console.log(timetableUrl);
        setTimetable(timetableUrl);
        setLoadingTimetable(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingTimetable(false);
      });
  };

  const handleOptionClick = (index) => {
    setActiveOption(index);
  };

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const filteredExamData = selectedExam
    ? examData.filter((exam) => exam.exam === selectedExam)
    : examData;

  return (
    <div className="bg-[#ffffff] w-full rounded-3xl mx-4 mt-4 overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 bg-white mr-4 flex flex-wrap items-center gap-3 text-lg ml-6 z-10">
        {["Your Result", "Time Table"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`${
              activeOption === index ? "border-b-4" : "border-b-0"
            } flex items-center p-3 font-medium gap-2 cursor-pointer ml-8 mt-5 border-[#004BB8]`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center sticky z-10">
        <div className="w-[94%] h-[1.5px] bg-[#D9D9D9] "></div>
      </div>

      {activeOption === 0 && (
        <div className="w-full flex flex-col items-center justify-center mx-auto">
          <div className="w-full my-5 flex-col">
            <select
              id="examSelect"
              className="w-[40%] mx-10 border border-gray-300 rounded-[12px] p-2"
              value={selectedExam}
              onChange={handleExamChange}
            >
              <option value="">All</option>
              {examData.map((exam, index) => (
                <option key={index} value={exam.exam}>
                  {exam.exam}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-full grid justify-items-center grid-cols-1 xmd:grid-cols-2 xml:grid-cols-3 xl:grid-cols-3 gap-1">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse w-[90%] flex flex-col justify-center rounded-[15px] shadow-lg border border-[#c9c1f1] p-4 m-4"
                    >
                      <div className="bg-blue-200 h-8 w-2/3 mb-4 rounded"></div>
                      <div className="bg-blue-200 h-5 w-3/4 mb-2 rounded"></div>
                      <div className="bg-blue-200 h-5 w-1/2 mb-2 rounded"></div>
                      <div className="bg-blue-200 h-4 w-1/3 mb-1 rounded"></div>
                      <div className="bg-blue-200 h-4 w-5/6 mb-4 rounded"></div>
                      <div className="bg-blue-200 h-10 w-4/5 mb-5 mt-5 rounded-[10px]"></div>
                      <div className="bg-blue-200 h-10 w-4/5 mt-2 mb-5 rounded-[10px]"></div>
                    </div>
                  ))
                : filteredExamData.map((exam, index) =>
                    exam.result.map((result, resultIndex) => (
                      <div key={resultIndex}>
                        <ExamComponent
                          subject={result.subject}
                          maximumMarks={result.maximumMarks}
                          marksObtained={result.marksObtained}
                        />
                      </div>
                    ))
                  )}
            </div>
          </div>
        </div>
      )}
      {activeOption === 1 && (
        <div className="flex w-full justify-center my-3">
          {loadingTimetable ? (
            <div className="animate-pulse w-full h-full flex justify-center items-center">
              <div className="bg-blue-200 w-[80%] h-[60vh] rounded"></div>
            </div>
          ) : (
            <img src={timetable} alt="Timetable" />
          )}
        </div>
      )}
    </div>
  );
};

export default Exams;
