import React from 'react'

export default function SubCardsCircular(props) {
    return (
        <div className='flex w-[80%] my-5 cursor-pointer outline outline-1 outline-[#004BB8] mx-auto p-2 px-5 rounded-lg bg-white hover:bg-[#004BB8] text-black hover:text-white'>
            <img src="./icons/circular.png" alt="" />
            <div className='ml-4 '>
                <h1>{props.title}</h1>
                <h1 className='font-bold'>{props.date} <span className='ml-8'>{">"}</span> </h1>
            </div>
        </div>
    )
}
