import { useState } from "react";
import PropTypes from "prop-types";
import DateCarousel from "./DateCarousel";

const Day = ({ studentData, attendanceData, subjectCode }) => {
  const { students = [] } = studentData;
  const [lectures, setLectures] = useState([{ id: 1, name: "Lecture 1" }]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState({});

  const addLecture = () => {
    if (lectures.length < 3) {
      const newLecture = {
        id: lectures.length + 1,
        name: `Lecture ${lectures.length + 1}`,
      };
      setLectures([...lectures, newLecture]);
    }
  };

  const handleLectureClick = (lectureId) => {
    setSelectedLecture(lectureId);
    console.log(
      `Clicked on ${lectures.find((lecture) => lecture.id === lectureId).name}`
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAttendanceClick = (username, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [username]: status,
    }));

    const student = students.find((s) => s.username === username);
    if (!student || !selectedDate || selectedLecture === null) {
      console.error('Missing required data for marking attendance');
      return;
    }

    const attended = status === 'P';
    const isAc = status === 'AC';

    setTimeout(() => {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate());
      const formattedDate = nextDay.toISOString().split('T')[0];
      postAttendance(student.universityRollNumber, subjectCode, formattedDate, selectedLecture, attended, isAc);
    }, 1);
  };

  const postAttendance = (roll, subjectCode, date, lectureNo, attended, isAc) => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/v1/teacher/markAttendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        roll,
        subjectCode,
        date,
        lectureNo,
        attended,
        isAc
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to mark attendance');
      }
      console.log('Attendance marked successfully');
    })
    .catch(error => {
      console.error('Error marking attendance:', error);
    });
  };

  const getStudentAttendanceStatus = (studentRollNumber) => {
    if (!selectedDate || selectedLecture === null) return null;
    const dateKey = selectedDate.toISOString().split('T')[0];
    const attendanceRecords = attendanceData[dateKey] || [];
    const record = attendanceRecords.find(
      record => record.student.universityRollNumber === studentRollNumber && record.lectureNo === selectedLecture
    );
    if (record) {
      if (record.attended) return 'P';
      if (record.isAc) return 'AC';
      return 'A';
    }
    return null;
  };

  return (
    <div className="w-full text-black">
      <div className="w-full my-3 flex items-center justify-start">
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className={`border-2 border-black rounded px-2 py-1 mx-1 cursor-pointer ${
              selectedLecture === lecture.id ? 'bg-[#004BB8] text-white border-blue-700' : 'bg-white'
            }`}
            onClick={() => handleLectureClick(lecture.id)}
          >
            {lecture.name}
          </div>
        ))}
        {lectures.length < 3 && (
          <button
            onClick={addLecture}
            className="border-2 border-black rounded px-2 py-1 mx-1"
          >
            +
          </button>
        )}
      </div>
      <DateCarousel onDateSelect={handleDateSelect} />
      <div className="shadow-md rounded p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 grid grid-cols-4 justify-items-center bg-CTA text-white p-3 rounded-lg font-bold">
            <div>Student Number</div>
            <div>Name</div>
            <div>Roll Number</div>
            <div>Attendance</div>
          </div>
          {students.map((student) => (
            <div
              key={student.username}
              className="col-span-3 bg-bg-color p-3 rounded-lg grid grid-cols-4 justify-items-center pt-2"
            >
              <div>{student.studentNumber}</div>
              <div>{student.name}</div>
              <div>{student.universityRollNumber}</div>
              <div className="flex justify-around gap-6">
                {["A", "P", "AC"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleAttendanceClick(student.username, status)}
                    className={`px-2 py-1 rounded font-semibold ${
                      attendance[student.username] === status ||
                      (attendance[student.username] === undefined && getStudentAttendanceStatus(student.universityRollNumber) === status)
                        ? "bg-[#004BB8] text-white "
                        : "bg-white "
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Day.propTypes = {
  studentData: PropTypes.shape({
    sectionName: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        studentNumber: PropTypes.string.isRequired,
        universityRollNumber: PropTypes.string.isRequired,
      })
    ).isRequired,
    semester: PropTypes.number.isRequired,
    batch: PropTypes.string.isRequired,
  }).isRequired,
  attendanceData: PropTypes.object.isRequired,
  subjectCode: PropTypes.string.isRequired,
};

export default Day;
