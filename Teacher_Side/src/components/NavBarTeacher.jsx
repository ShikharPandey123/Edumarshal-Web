import React from 'react'

export default function NavBarTeacher(props) {
    return (
        <div className='bg-white ml-16 px-10 py-8 w-full mx-auto h-[60px] flex justify-between items-center'>
            <h1 className='text-xl text-black font-medium'>{props.title}</h1>
            <div className='flex w-[300px] justify-between items-center'>
                <img className='w-[25px] h-[20px]' src="./icons/email.png" alt="" />
                <img className='w-[20px] h-[20px]' src="./icons/notification.png" alt="" />
                <div className='flex items-center'>
                    <img className='w-[30px] h-[30px] mr-2' src="./icons/teacherProfile.png" alt="" />
                    <h1 className='font-bold text-black'>Mr. Manas Jha</h1>
                </div>
            </div>
        </div>
    )
}
