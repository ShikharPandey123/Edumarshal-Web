import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaArrowLeft } from 'react-icons/fa';
import SideBar from "../components/SideBar";
import SideBarMobile from "../components/SideBarMobile";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventsComponents/EventCard";
import EventCardSkeleton from "../components/EventsComponents/EventCardSkeleton";
import { useLocation } from "react-router-dom";

export default function Events() {
    const [active, setActive] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation()

    useEffect(() => {
        setActive(location.state.active);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_API + "/v1/student/event", { withCredentials: true });
                const processedEvents = response.data.event.map(event => {
                    const eventDate = new Date(event.date);
                    const localDate = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000);
                    return { ...event, date: localDate.toISOString().split('T')[0] };
                });
                setEvents(processedEvents);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewDetails = (eventId) => {
        const selected = events.find(event => event._id === eventId);
        setSelectedEvent(selected);
    };

    const handleEventDetails = () => {
        setSelectedEvent(null);
    };
    const eventDates = events.map(event => event.date);

    const renderEventIndicator = ({ date, view }) => {
        if (view === 'month') {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            if (eventDates.includes(formattedDate)) {
                return <div style={{ color: 'red' }}>●</div>;
            }
        }
    };


    return (
        <div className="h-screen bg-[#ECEBFE] w-full flex">
            <div className="max-[500px]:hidden">
                <SideBar active={active} />
            </div>
            <div className="min-[500px]:hidden">
                <SideBarMobile active={active} />
            </div>
            <div className="text-black flex flex-col  w-full">
                <NavBar title="Events" />
                <div className="bg-[#ffffff] mt-4 flex rounded-2xl w-[97%] md:h-[4rem] md:ml-5 ml-2 h-[3rem] items-center md:justify-start justify-center">
                    <div className="my-3 md:ml-10 bg-[#004BB8] md:p-2 p-1 px-4 rounded-[0.5rem]"><p className="text-white text-sm md:text-base">College Events</p></div>
                </div>
                <div className="bg-[#ffffff] md:h-[73vh] h-[85vh]  items-center md:justify-evenly rounded-3xl md:m-6 overflow-y-auto md:flex md:flex-row flex flex-col mt-3">
                    <div className="md:m-4 w-[250px] md:w-[350px]  border-2 border-double mt-4 border-[#004BB8] flex justify-center items-center">
                        <Calendar tileContent={renderEventIndicator} />
                    </div>
                    {selectedEvent ? (
                        <div className="md:w-[70%] w-[90%] bg-[#F2F6FF] h-[30rem] mt-10 rounded-[0.5rem]  flex justify-center items-center">
                            <div className="w-[33rem] h-[25rem] justify-evenly md:ml-12 flex flex-col bg-[#FBFBFB] rounded-3xl">
                                <div className="flex justify-between">
                                    <div className="ml-10">
                                        <div className="text-2xl font-medium">{selectedEvent.eventName}</div>
                                        <div className="text-lg text-[#4D4D4D]">{selectedEvent.event}</div>
                                    </div>
                                    <div className="mr-10 items-center flex flex-col">
                                        <div className="text-sm text-[#666666]">{selectedEvent.hostingOrganization}</div>
                                        <div className="text-xs text-[#808080]">IT Department</div>
                                    </div>
                                </div>
                                <div className="ml-10 text-xl font-semibold">Event Details</div>
                                <div className="ml-10">
                                    <div className="flex"><p className="text-base font-medium">Date : {selectedEvent.date}</p></div>
                                    {/* <div className="flex"><p className="text-base font-medium">Venue : {selectedEvent.venue}</p></div> */}
                                    <div className="flex"><p className="text-base font-medium">For Queries Contact : 9997132593</p></div>
                                    <div className="flex"><p className="text-base font-medium">Prize : 6000</p></div>
                                    <div className="flex"><p className="text-base font-medium">Time Left : 8 days</p></div>
                                </div>
                                <div className="bg-[#004BB8] rounded-xl flex justify-center items-center px-8 cursor-pointer"><p className="text-base p-2 px-4 text-white">Register Now</p></div>
                                <div className="bg-[#F75757] rounded-xl flex justify-center items-center px-8 cursor-pointer" onClick={handleEventDetails}><p className="text-base p-2 px-4 text-white">Close Details</p></div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <div className="lg:w-[95%] xmd:w-[25rem] md:w-[20rem] md:bg-[#F2F6FF] md:h-[30rem] md:overflow-y-auto grid xl:grid-cols-2 grid-cols-1 justify-center items-center rounded-3xl">
                                {loading ? (
                                    <EventCardSkeleton />
                                ) : (
                                    events.map(event => (
                                        <EventCard key={event._id} event={event} handleViewDetails={() => handleViewDetails(event._id)} />
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
