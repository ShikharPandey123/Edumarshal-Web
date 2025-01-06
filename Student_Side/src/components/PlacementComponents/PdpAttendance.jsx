import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkeletonLoading = () => {
  return (
    <>
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="border-2 h-[5vh] md:w-[28rem] w-[18rem] md:ml-12 ml-2 border-gray-300 rounded-2xl flex items-center my-2 animate-pulse"
        >
          <div className="flex md:ml-10 gap-10 w-full justify-between">
            <div className="font-semibold px-2 bg-gray-200 rounded-md h-4 w-1/3"></div>
            <div className="ml-7 bg-gray-200 rounded-md h-4 w-1/6"></div>
          </div>
        </div>
      ))}
    </>
  );
};

function PdpAttendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/v1/student/pdpattendance`,
          { withCredentials: true }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="h-[3rem] bg-[#004BB8] my-5 rounded-[0.5rem] items-center md:justify-between justify-center md:px-12 px-6 flex cursor-pointer sm:mx-10 ml-2 text-lg text-[#FFFFFF]">
        <pre>Attendance Details</pre>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start">
        {loading ? (
          <SkeletonLoading />
        ) : (
          data?.attendance.map((item, index) => (
            <div
              className="border-2 h-[5vh] md:w-[28rem] w-[18rem] md:ml-12 ml-2 border-black rounded-2xl flex items-center my-2"
              key={index}
            >
              <div className="flex md:ml-10 gap-10">
                <div className="font-semibold px-2">{item.date}</div>
                <div
                  className="ml-7"
                  style={{ color: item.attended ? 'green' : 'red' }}
                >
                  {item.attended ? 'P' : 'A'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PdpAttendance;
