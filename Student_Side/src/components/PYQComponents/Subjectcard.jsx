import React, { useRef } from 'react'

function Subjectcard({name}) {
    // const fileInputRef = useRef(null);
    // const downloadFile = () => {
    //     if (uploadedFile) {
    //         const fileUrl = URL.createObjectURL(uploadedFile);
    //         const a = document.createElement('a');
    //         a.href = fileUrl;
    //         a.download = uploadedFile.name;
    //         a.click();
    //     }
  return (
    <div className="m-8 max-[500px]:pl-5 flex flex-col justify-center w-[18rem] rounded-[15px] overflow-hidden shadow-lg border border-[#7F7F7F]">
            <div className="flex w-2/3 font-bold text-2xl text-[#004BB8] ml-7 my-4">
                {name}
            </div>
            <div className="ml-7 mt-2 mb-0 font-semibold text-base text-[#1A1A1A]">
                Year - 2024
            </div>
            <div className="ml-7 my-3 font-medium text-base text-[#333333]">
                Paper Type : PUT
            </div>
            <div className="ml-7 font-medium text-sm text-[#4D4D4D]">
                Description :
            </div>
            <div className="ml-7 my-1 font-medium text-sm text-[#4D4D4D] overflow-hidden max-w-[15rem] whitespace-nowrap overflow-ellipsis">
                Btech as 3 sem mathematics 4 kas302~2024
            </div>
            <button
                className="bg-[#004BB8] w-4/5 rounded-[10px] font-medium text-sm text-white p-2 mt-5 ml-7 mb-5"
            >
                Download
            </button>
          
        </div>
  )
}
export default Subjectcard
