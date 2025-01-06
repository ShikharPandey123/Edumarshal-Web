/* eslint-disable react/prop-types */
const ClassroomSections = ["Attendance", "Assignments", "Class Notes", "Exams", "Syllabus", "Feedback"];

function SwitchClassroom({ activeIndex, onSwitchChange }) {
  return (
    <div className="flex gap-4 lg:gap-10  cursor-pointer">
      {ClassroomSections.map((item, index) => (
        <div
          key={index}
          onClick={() => onSwitchChange(index)}
          className={`${
            activeIndex === index
              ? "bg-[#004BB8] text-white"
              : "bg-[#F2F6FF] text-black"
          } h-[45px] flex items-center justify-center max-[920px]:px-1 max-[768px]:p-2 p-3 font-medium text-base max-[936px]:justify-evenly  max-[936px]:w-[13vw] rounded-[0.5rem] cursor-pointer`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default SwitchClassroom;
