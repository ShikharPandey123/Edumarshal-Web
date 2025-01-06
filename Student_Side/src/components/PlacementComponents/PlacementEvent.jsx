import React from "react";
import { useRef } from "react";
const Labels = [
  { name: "Website", smallWidth: "w-[16rem]" },
  { name: "Appointment Date", smallWidth: "w-[16rem]" },
  { name: "Location", smallWidth: "w-[16rem]" },
  { name: "Placement Date", smallWidth: "w-[16rem]" },
  { name: "Specialisation", smallWidth: "w-[16rem]" },
  { name: "Action",  smallWidth: "w-[16rem]" },
  { name: "Location",  smallWidth: "w-[16rem]" },
  { name: "Last Date",  smallWidth: "w-[16rem]" },
  { name: "Notice Details",  smallWidth: "w-[16rem]" },
];
export default function PlacementEvent() {
  return (
    <div>
      <div className="h-[3rem] bg-[#004BB8] mb-5 md:my-5 rounded-[0.5rem] items-center md:justify-between justify-center md:px-12 px-6 flex cursor-pointer sm:mx-10 ml-2 text-lg text-[#FFFFFF]">
        <pre>#1  Microsoft</pre>
      </div>
      <div className='bg-white w-[96%] h-auto overflow-y-auto rounded-[2rem] pt-7 ml-2 md:ml-5'>
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
      </div>
    </div>
  );
}
