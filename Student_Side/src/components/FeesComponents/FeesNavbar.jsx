import React, { useState } from "react";
import Select from "react-select";

export default function FeesNavbar() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "1st Semester", label: "1st Semester" },
    { value: "2nd Semester", label: "2nd Semester" },
    { value: "3rd Semester", label: "3rd Semester" },
  ];

  return (
    <div className="h-[84px] w-full bg-[#FBFBFB] rounded-xl flex justify-between items-center">
      <div className="text-3xl font-semibold ml-8">Fees</div>
      <div className="flex mr-7 gap-7 items-center ">
      <div>
        <img src="./icons/notifications.png" alt="notifications" />
      </div>
      <div className="w-[373px]">
        <Select
          options={options}
          placeholder="Select Semester"
          defaultValue={value}
          onChange={setValue}
          isSearchable
          noOptionsMessage={() => "No semesters available"}
          styles={{
            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              borderRadius: '0.75rem',
              border: `2px solid black`,
            }),
          }}
        />
      </div>
      <div className="bg-[#C4C4C4] h-[50px] w-[50px] rounded-2xl"></div>
      </div>
    </div>
  );
}
