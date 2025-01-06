import React from 'react'
import sideMenu from "../constants/SideMenu.json"
import SideBarTeacher from '../components/SideBarTeacher'
import NavBarTeacher from '../components/NavBarTeacher'
import DashboardCard from '../components/DashboardCard'
import SubCardsCircular from '../components/SubCardsCircular'
import dashboardMenu from "../constants/dashboardMenu.json"

const Dashboard = () => {
    return (
        <div className='flex w-full min-h-[100vh]'>
            <SideBarTeacher />
            <NavBarTeacher title={"Dashboard"} />
            <div className='absolute top-20 left-[8vw] w-[90%]'>
                <div className='flex justify-evenly '>
                    <div className='w-[80%]'>
                        <div className='flex justify-evenly'>
                            {dashboardMenu.map((e, id) => (
                                <DashboardCard key={id} title={e.title} data={e.data} src={e.src} />
                            ))}
                        </div>
                        <div></div>
                    </div>
                    <div className='text-black bg-white w-[30%] rounded-lg'>
                        <h1 className='m-5 ml-8 text-lg font-semibold'>Teacher-Circular</h1>
                        <SubCardsCircular date="21 February" title="Event" />
                        <SubCardsCircular date="21 February" title="Event" />
                        <SubCardsCircular date="21 February" title="Event" />
                        <SubCardsCircular date="21 February" title="Event" />
                    </div>
                </div>
                <img className='mt-6 pb-10' src="./icons/teacherTimetable.png" alt="" />
            </div>
        </div>
    )
}

export default Dashboard