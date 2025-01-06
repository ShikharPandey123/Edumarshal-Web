/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Month = ({ attendanceData, subjectName }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Initialize with the current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [defaultSubject, setDefaultSubject] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [dayLabels, setDayLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  useEffect(() => {
    if (attendanceData.length > 0 && !subjectName) {
      setDefaultSubject(attendanceData[0].subject);
    }

    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 769);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [attendanceData, subjectName]);

  useEffect(() => {
    const generateDayLabels = () => {
      const dayLabels = isSmallDevice
        ? ["S", "M", "T", "W", "T", "F", "S"]
        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const startingIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;
      return dayLabels
        .slice(startingIndex)
        .concat(dayLabels.slice(0, startingIndex));
    };

    setDayLabels(generateDayLabels());
    setLoading(false);
  }, [isSmallDevice, firstDayOfMonth]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-pulse bg-gray-200 w-24 h-8 rounded-lg"></div>
        <div className="grid grid-cols-7 gap-2 w-full">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-8 rounded-lg"
            ></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-8 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full md:ml-6 justify-center items-center">
      {/* Month and Year picker */}
      <div className="w-full flex items-center justify-start mb-6 ">
        <div className="max-sm:w-1/4">
          <label className="mr-2 font-semibold">Month :</label>
          <select
            className="border p-1 rounded-lg border-blue-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="max-sm:w-3/4">
          <label className="mx-2 ml-7 font-semibold">Year :</label>
          <input
            type="number"
            className="max-sm:w-full border p-1 rounded-lg border-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-4 rounded-xl bg-[#F2F6FF]">
        {dayLabels.map((weekday, index) => (
          <div
            key={index}
            className="text-center p-2 rounded-lg bg-[#004BB8] text-white"
          >
            {weekday}
          </div>
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day) => {
            const subjectToShow = subjectName || defaultSubject;

            const attendanceInfo = attendanceData.find(
              (subject) => subject.subject === subjectToShow
            );

            const attendanceDay = attendanceInfo
              ? attendanceInfo.attendance.filter(
                  (attendance) =>
                    new Date(attendance.date).getDate() === day &&
                    new Date(attendance.date).getMonth() + 1 ===
                      selectedMonth &&
                    new Date(attendance.date).getFullYear() === selectedYear
                )
              : [];

            return (
              <div key={day} className="text-center">
                {/* Display date */}
                <div className="p-1 lg:p-0.5 xl:p-1 font-semibold">
                  {day === new Date().getDate() &&
                  selectedMonth === new Date().getMonth() + 1 &&
                  selectedYear === new Date().getFullYear() ? (
                    <span className="bg-[#004BB8] text-white rounded-lg px-2 md:px-4 py-2">
                      {day}
                    </span>
                  ) : (
                    <span>{day}</span>
                  )}
                </div>

                {/* Display A or P below the date */}
                <div className="p-1">
                  {attendanceDay.length > 0 ? (
                    attendanceDay.map((attendance, index) => (
                      <span
                        key={index}
                        className={`text-xs font-semibold rounded-md px-1 ${
                          attendance.attended || attendance.isAc
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {attendance.attended || attendance.isAc ? "P" : "A"}
                      </span>
                    ))
                  ) : (
                    // Display "NC" for days with no class
                    <span className="text-xs text-gray-500">NC</span>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Month;
