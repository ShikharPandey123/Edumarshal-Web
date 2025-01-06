
const TimePeriod = ["Day", "Week", "Month"];

// eslint-disable-next-line react/prop-types
function SwitchTimePeriod({ activeIndex, onSwitchChange }) {
  return (
    <div className="flex gap-3 md:gap-6 cursor-pointer">
      {TimePeriod.map((item, index) => (
        <div
          key={index}
          onClick={() => onSwitchChange(index)}
          className={`${
            activeIndex === index
              ? "bg-[#004BB8] text-white"
              : "bg-[#F2F6FF] text-black"
          } flex items-center justify-center py-2 md:py-3 px-4 md:px-5 font-medium text-base rounded-[0.5rem] cursor-pointer`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default SwitchTimePeriod;
