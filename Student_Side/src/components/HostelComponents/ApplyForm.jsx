// import React from 'react'
// import { useRef } from 'react';
// const Labels = [
//   { name: "Start Date", smallWidth: "w-[24rem]" },
//   { name: "End Date", smallWidth: "w-[24rem]" },
//   { name: "Reason", smallWidth: "w-[30rem]" },
//   { name: "Remarks", smallWidth: "w-[16rem]" },
//   { name: "Place Visiting", smallWidth: "w-[16rem]" },

// ];
// function ApplyForm() {
//   const fileInputRef = useRef(null);
//   const handleupload = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//   }
//   }
//   const handleselect = (event) => {
//     const selectedFile = event.target.files[0];
//     console.log("Selected file:", selectedFile);
//   }
//   return (
//     <>
//     <div>

//     <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ml-10 md:justify-items-start justify-items-center">
//       {Labels.map((label, index) => (
//         <div key={index} className={`relative my-5 md:my-3 ${label.smallWidth} `}>
//           <input
//             type="date"
//             name={`input_${index}`}
//             maxLength="100"
//             placeholder={label.name}
//             required
//             className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
//           />
//           <label
//             className="bg-white font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1"
//           >
//             {label.name}
//           </label>

//         </div>

//       ))}
//     </div>
//     <div className="flex items-center ml-12 md:gap-5 gap-2 font-medium justify-start flex-wrap">
//             <div>Attachments (5MB MAX)</div>
//             <div className="bg-[#004BB8] h-[2.5rem] w-[3.5rem] flex items-center justify-center rounded-xl cursor-pointer" onClick={handleupload}><img src="./uploadarrow1.svg"/></div>
//           </div>
//     </div>
//     <input
//                 type="file"
//                 id="fileInput"
//                 name="fileInput"
//                 accept=".jpg,.jpeg,.png,.heic"
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//                 onChange={handleselect}
//             />
// </>
//   )
// }

// export default ApplyForm
import React from 'react';
import { useRef } from 'react';

const Labels = [
    { name: "Start Date", type: "date", smallWidth: "w-full, lg:w-[30rem]" },
    { name: "End Date", type: "date", smallWidth: "w-full, lg:w-[30rem]" },
    { name: "Reason", type: "text", smallWidth: "w-full" },
    { name: "Remarks", type: "text", smallWidth: "w-full" },
    { name: "Place Visiting", type: "text", smallWidth: "w-full" },
];

function ApplyForm() {
    ['/']
    const fileInputRef = useRef(null);
    const handleUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleSelect = (event) => {
        const selectedFile = event.target.files[0];
        console.log("Selected file:", selectedFile);
    };

    return (
        <>
            <div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ml-10 md:justify-items-start justify-items-center">
                    {Labels.filter(label => label.type === "date").map((label, index) => (
                        <div key={index} className={`relative my-5 md:my-3 ${label.smallWidth}`}>
                            <input
                                type={label.type}
                                name={`input_${index}`}
                                maxLength="100"
                                placeholder={label.name}
                                required
                                className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
                            />
                            <label className="bg-white font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1">
                                {label.name}
                            </label>
                        </div>
                    ))}
                </div>
                {Labels.filter(label => label.type === "text").map((label, index) => (
                    <div key={index} className="relative my-5 mx-10 ">
                        <input
                            type={label.type}
                            name={`input_${index + 2}`} // Adjust index to match the original label order
                            maxLength="100"
                            placeholder={label.name}
                            required
                            className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
                        />
                        <label className="bg-white font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1">
                            {label.name}
                        </label>
                    </div>
                ))}
                <div className="flex items-center ml-12 md:gap-5 gap-2 font-medium justify-start flex-wrap">
                    <div>Attachments (5MB MAX)</div>
                    <div className="bg-[#004BB8] h-[2.5rem] w-[3.5rem] flex items-center justify-center rounded-xl cursor-pointer" onClick={handleUpload}>
                        <img src="./uploadarrow1.svg" alt="Upload" />
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
                onChange={handleSelect}
            />
        </>
    );
}

export default ApplyForm;
