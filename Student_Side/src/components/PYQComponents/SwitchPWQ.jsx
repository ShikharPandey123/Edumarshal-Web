/* eslint-disable react/prop-types */
const PYQSections = ["Subjectwise", "Yearwise"];

function SwitchPYQ({ activeIndex, onSwitchChange }) {
  return (
    <div className="flex gap-4  lg:gap-4 justify-end mr-10 cursor-pointer">
      {PYQSections.map((item, index) => (
        <div
          key={index}
          onClick={() => onSwitchChange(index)}
          className={`${
            activeIndex === index
              ? "bg-[#004BB8] text-white"
              : "bg-[#F2F6FF] text-black"
          }  flex items-center justify-center max-[920px]:px-1 max-[768px]:p-2 p-3 font-medium text-base max-[936px]:justify-evenly max-[936px]:w-[13vw] rounded-[0.5rem] cursor-pointer`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default SwitchPYQ;
