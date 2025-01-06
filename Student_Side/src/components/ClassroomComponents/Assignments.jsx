import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import axios from "axios";
const Assignments = () => {
  const [activeoption, setActiveoption] = useState(0);
  const handleoptionClick = (index) => {
    setActiveoption(index);
  };
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getAssignment();
  }, []);
  const getAssignment = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_API + "/v1/student/assignment", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const responseData = res.data.assignment;
        console.log(responseData);
        setData(responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="bg-[#ffffff] w-full flex items-center justify-center rounded-3xl mx-4 mt-4 overflow-y-auto ">
      <div className="w-[98%] flex justify-center items-center">
        <div className="w-full grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {data.length > 0
            ? data.map((item) => (
                <AssignmentCard
                  key={item.id}
                  sub={item.subject.name}
                  description={item.description}
                  deadline={item.deadline}
                  status="Pending"
                  question={item.assignment}
                />
              ))
            : Array.from({ length: 6 }).map((_, index) => (
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
              ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
