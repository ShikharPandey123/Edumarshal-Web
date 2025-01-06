import React from 'react'
import Examlogo from '../../assets/ExamComponent.svg'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

function ExamComponent({subject,maximumMarks,marksObtained}) {
const value= (marksObtained/maximumMarks)*100;
  return (
    <div className="my-8 sm:mx-3 mx-0 max-[500px]:ml-0 flex flex-col justify-center sm:w-[25rem]  rounded-[15px] overflow-hidden shadow-lg  bg-[#F2F6FF] border border-[#C4C4C4]">
        <div className='flex ml-4 mt-3'>
        <img src={Examlogo} className='w-1/6' alt="" />
      <div className='flex flex-col mt-1 '>
        <span className='text-[#004BB8] font-medium text-lg ml-2 mt-3 w-[2rem] sm:w-[9rem]'>{subject}</span>
        <span className='text-[#004BB8] font-medium text-xs ml-2 mt-2'>By Swati Tomar</span>
      </div>
      <div className='mt-[3rem]'>
      <span className='text-[#004BB8] font-medium  text-4xl mt-[5rem] ml-2'>{marksObtained}/{maximumMarks}</span>
      <span className='text-[#004BB8] font-medium text-xs '>Marks</span>
      </div>
      </div>
      <span className='text-[#004BB8] font-medium text-xs ml-5 mt-1'>Your percentage</span>
      <LinearProgress variant="determinate" value={value} sx={{height: 10, borderRadius:5, backgroundColor:'#FFFFFF', '& .MuiLinearProgress-bar': {backgroundColor: '#004BB8', borderRadius:5},}} className='mb-5 w-[16.8rem] sm:w-[22rem] ml-5 mt-1'/>

    </div>
  )
}

export default ExamComponent
