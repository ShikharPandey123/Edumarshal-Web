/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { selectDate } from "../../../../store/store";
import { memoizedSelectDate } from "../../../../store/store";

const DateCarousel = ({ onDateSelect, defualtDate }) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => memoizedSelectDate(state));
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const getDatesInWeek = (startDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      dates.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + i
        )
      );
    }

    return dates;
  };

  useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      dispatch(
        selectDate({
          timestamp: selectedDate.getTime(),
          backgroundColor: "#004BBB",
          textColor: "white",
        })
      );
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    // Initialize selected date to the current date when the component mounts
    const currentDate = new Date();
    dispatch(
      selectDate({
        timestamp: currentDate.getTime(),
        backgroundColor: "#004BBB",
        textColor: "white",
      })
    );
  }, [dispatch]);

  const handleDateClick = (date) => {
    dispatch(
      selectDate({ timestamp: date.getTime(), date: date.toISOString() })
    );
    onDateSelect(date); // Make sure this line is present
  };

  const getWeeks = () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const weeks = [];

    for (let i = 0; i < 5; i++) {
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 6
      );
      const week = {
        start: startDate.toDateString(),
        end: endDate.toDateString(),
        dates: getDatesInWeek(startDate),
      };
      weeks.push(week);

      startDate.setDate(endDate.getDate() + 1); // Move to the next week
    }

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="text-center">
        <div className="flex justify-around items-center">
          {week.dates.map((date, dateIndex) => (
            <div
              key={dateIndex}
              className="flex flex-col px-1 md:px-6 py-1 items-center justify-center cursor-pointer transition duration-200"
              style={{
                backgroundColor:
                  selectedDate.getTime() === date.getTime()
                    ? "#004BB8"
                    : "#F2F6FF",
                color:
                  selectedDate.getTime() === date.getTime() ? "white" : "black",
                borderRadius: "8px",
              }}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-md font-semibold">{date.getDate()}</div>

              <div className="text-sm">
                {isSmallScreen
                  ? dayNames[date.getDay()].substring(0, 2)
                  : dayNames[date.getDay()]}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const memoizedWeeks = useMemo(() => getWeeks(), [selectedDate]);

  return (
    <div className="grid grid-cols-9 items-center my-4">
      <button onClick={handlePrev} className="col-span-1 justify-self-center">
        {"<"}
      </button>

      <Slider ref={sliderRef} {...settings} className="col-span-7">
        {memoizedWeeks}
      </Slider>

      <button onClick={handleNext} className="col-span-1 justify-self-center">
        {">"}
      </button>
    </div>
  );
};

export default DateCarousel;
