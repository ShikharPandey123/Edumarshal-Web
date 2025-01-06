import React from 'react'
import { useRef } from 'react';
const Labels = [
  { name: "Company Name", smallWidth: "w-[16rem]" },
  { name: "Project Title", smallWidth: "w-[16rem]" },
  { name: "Faculty Mentor", smallWidth: "w-[16rem]" },
  { name: "Internship Mentor Name", smallWidth: "w-[16rem]" },
  { name: "Internship Mentor Designation", smallWidth: "w-[16rem]" },
  { name: "Internship Mentor Mobile Number",  smallWidth: "w-[16rem]" },
  { name: "Internship Mentor Email ID",  smallWidth: "w-[16rem]" },
  { name: "Area of Specialization",  smallWidth: "w-[16rem]" },
  { name: "Location of Internships",  smallWidth: "w-[16rem]" },
  { name: "Start Date",  smallWidth: "w-[16rem]" },
  { name: "End Date",  smallWidth: "w-[16rem]" },
];
function Internship() {
  const fileInputRef = useRef(null);
  const handleupload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
  }
  }
  const handleselect = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  }
  return (
    <>
    <div>
    <div className="h-[3rem] bg-[#004BB8] mb-5 md:my-5 rounded-[0.5rem] items-center md:justify-between justify-center  md:px-12 px-6 flex cursor-pointer sm:mx-10 ml-2 text-lg text-[#FFFFFF]">
      <pre>Internship Details</pre>
    </div>
    <div className='bg-white w-[96%] h-full  rounded-[2rem] pt-7 ml-2 md:ml-5'>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:ml-10 md:justify-items-start justify-items-center">
      {Labels.map((label, index) => (
        <div key={index} className={`relative my-5 md:my-3 ${label.smallWidth} `}>
          <input
            type="text"
            name={`input_${index}`}
            maxLength="100"
            placeholder={label.name}
            required
            className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
          />
          <label
            className="bg-white font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1"
          >
            {label.name}
          </label>
        </div>
      ))}
    </div>
    <div className="flex items-center h-auto ml-12 md:gap-5 gap-2 font-medium justify-start flex-wrap">
            <div>Attachments (5MB MAX)</div>
            <div className="bg-[#004BB8] h-[2.5rem] w-[3.5rem] flex items-center justify-center rounded-xl cursor-pointer" onClick={handleupload}><img src="./uploadarrow1.svg"/></div>
          </div>
    </div>
    </div>
  
    <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept=".jpg,.jpeg,.png,.heic"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleselect}
            />
</>
  )
}

export default Internship