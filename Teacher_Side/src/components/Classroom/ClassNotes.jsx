import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const subjectsData = [
  {
    "name": "DSTL",
    "code": "BCS303",
    "subjectType": "Theory"
  },
  {
    "name": "Data Structure",
    "code": "BCS301",
    "subjectType": "Theory"
  },
  {
    "name": "Mathematics",
    "code": "BAS303",
    "subjectType": "Theory"
  },
  {
    "name": "Python",
    "code": "BCC302",
    "subjectType": "Theory"
  },
  {
    "name": "Web Designing",
    "code": "BCS353",
    "subjectType": "Lab"
  },
  {
    "name": "Mini Project",
    "code": "BCC351",
    "subjectType": "Theory"
  },
  {
    "name": "COA",
    "code": "BCS302",
    "subjectType": "Theory"
  },
  {
    "name": "DS Lab",
    "code": "BCS351",
    "subjectType": "Lab"
  }
];

function ClassNotes() {
  const [data, setData] = useState([]);
  const [section, setSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await axios.get(
        'https://akgec-edu.onrender.com/v1/teacher/sections',
        {
          withCredentials: true,
        }
      );
      console.log(response.data.sections[0].section.sectionId);
      setSection(response.data.sections[0].section.sectionId);
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Error fetching sections");
    }
  };

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && selectedSubject) {
      const formData = new FormData();
      formData.append("document", file);
      try {
        await axios.post(
          `https://akgec-edu.onrender.com/v1/teacher/uploadNotes?sectionId=${section}&subject=${selectedSubject}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success("Class Notes uploaded successfully");
      } catch (error) {
        console.error("Error uploading ClassNotes:", error);
        toast.error("Error uploading class notes");
      }
    }
  };

  const handleSubjectSubmit = () => {
    setShowModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='w-full'>
      <ToastContainer />
      <div className='flex flex-wrap text-black justify-evenly items-center text-2xl font-semibold mt-5'>
        <div className='w-[15rem] flex gap-5'>File Name</div>
        <div className='w-[15rem]'>Last Modified</div>
        <div className='w-[10rem]'>File Size</div>
        <div className='flex w-[10rem] justify-evenly'>
          Update File
        </div>
      </div>
      <div className='bg-black h-[0.1rem] w-full my-6'></div>
      <div className='flex justify-center items-center text-black gap-5 font-semibold text-2xl'>
        <div>Add New File</div>
        <img src='/plusicon.svg' onClick={handleUploadClick} alt="Add New File" style={{ cursor: 'pointer' }} />
      </div>
      <div className='bg-black h-[0.1rem] w-full my-6'></div>
      <input
        type="file"
        id="fileInput"
        name="fileInput"
        accept=".jpg,.jpeg,.png,.heic"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">Select Subject</h2>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border p-2 mb-4 w-full"
            >
              <option value="">Select a subject</option>
              {subjectsData.map((subject, index) => (
                <option key={index} value={subject.code}>
                  {subject.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubjectSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassNotes;
