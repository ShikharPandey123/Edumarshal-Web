import React from 'react'

export default function DashboardCard(props) {
    return (
        <div className='flex bg-white py-4 px-2 justify-evenly w-[220px] rounded-lg'>
            <img src={props.src} alt="" />
            <div className='flex flex-col ml-4'>
                <h1 className='text-black'>{props.title}</h1>
                <h1 className='text-black font-bold text-2xl'>{props.data}</h1>
            </div>
        </div>
    )
}
