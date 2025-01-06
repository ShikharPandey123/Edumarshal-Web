import React, { useState } from 'react';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';

function Assignments() {
  const [activeOption, setActiveOption] = useState(0);
  const [formData, setFormData] = useState({
    deadline: '',
    topic: '',
    description: '',
  });
  const [attachedFile, setAttachedFile] = useState(null);
  const sectionId = '65c5376010a2efe56771f3ab'; // Example constant section ID

  const handleOptionClick = (index) => {
    setActiveOption(index);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttachedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const combinedDescription = `Topic: ${formData.topic}\nDescription: ${formData.description}`;

    const uploadData = new FormData();
    uploadData.append('deadline', formData.deadline);
    uploadData.append('description', combinedDescription);
    uploadData.append('file', attachedFile);
    uploadData.append('sectionId', sectionId);
    uploadData.append('subject', 'DSTL');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/teacher/uploadAssignment`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('Assignment uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      deadline: '',
      topic: '',
      description: '',
    });
    setAttachedFile(null);
  };

  return (
    <div className="bg-[#ffffff] w-full rounded-3xl text-black mx-4 mt-4 overflow-y-auto">
      <div className="sticky top-0 bg-white mr-4 flex items-start flex-wrap text-black gap-3 text-lg ml-6 z-10">
        {["Assignments", "Add Assignment"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`${
              activeOption === index ? "border-b-4" : "border-b-0"
            } flex p-3 font-medium gap-2 cursor-pointer ml-8 mt-5 border-[#004BB8]`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div>
        {activeOption === 0 ? (
          <AssignmentCard />
        ) : (
          <div className="p-8">
            <div className='bg-[#004BB8] rounded-md py-1 px-3 mb-10'>
              <h2 className="text-xl text-white font-semibold">Add Assignment</h2>
            </div>
            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
              <div className="relative my-5 md:my-3 w-2/4">
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className={`border-2 w-full py-2 px-3 pr-8 border-black focus:outline-none rounded-xl ${formData.deadline ? 'text-black' : 'text-gray-400'}`}
                />
                <label className="bg-white text-black font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1">
                  Deadline
                </label>
              </div>
              <div className="relative my-5 md:my-3 w-full">
                <input
                  type="text"
                  name="topic"
                  maxLength="100"
                  placeholder="Add Topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
                />
                <label className="bg-white font-sofia-sans text-black font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1">
                  Add Topic Name
                </label>
              </div>
              <div className="relative my-5 md:my-3 w-full">
                <textarea
                  name="description"
                  maxLength="500"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
                ></textarea>
                <label className="bg-white text-black font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-[4rem] px-1">
                  Description
                </label>
              </div>
              <div className="relative my-6 md:my-3 w-full">
                <input
                  type="file"
                  name="attachment"
                  onChange={handleFileChange}
                  required
                  className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
                />
                <label className="bg-[#ffffff] text-black font-sofia-sans font-medium md:text-xs text-[0.5rem] absolute left-3 top-3/5 bottom-10 px-1">
                  Attach File
                </label>
              </div>
              {attachedFile && (
                <div className="my-4">
                  <p className="text-md text-black font-medium">Attached File:</p>
                  <p className="text-sm text-gray-700">{attachedFile.name}</p>
                  {attachedFile.type.startsWith('image/') && (
                    <img
                      src={URL.createObjectURL(attachedFile)}
                      alt="Preview"
                      className="mt-2 max-w-xs"
                    />
                  )}
                </div>
              )}
              <div className="flex items-center justify-start">
                <button
                  type="submit"
                  className="bg-[#004BB8] hover:bg-blue-700 text-white font-medium py-2 mr-5 px-8 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Save               
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-[#F75757] hover:bg-[#fb645c] text-white font-medium py-2 px-8 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
