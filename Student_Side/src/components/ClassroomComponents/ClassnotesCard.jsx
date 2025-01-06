import React from 'react';
import profile from '../../assets/classNotesProfile.svg';
import folder from '../../assets/classNotesFolder.svg';

function ClassnotesCard({ setPageName, subjectName, setSubjectName }) {
  const folderStack = () => {
    setSubjectName(subjectName); 
    setPageName(subjectName); 
  };

  return (
    <div className="my-8 mx-5 flex flex-col justify-center w-full rounded-[15px] overflow-hidden shadow-lg border border-[#7F7F7F]">
      <div className='bg-[#004BB8]'>
        <div className='flex w-2/3 font-medium text-2xl text-white ml-7 mt-4'>{subjectName}</div>
        <div className='ml-7 font-light text-xs text-white'>2023-24</div>
        <div className='flex justify-between'>
          <div className='ml-7 mt-2 mb-0 font-normal text-base text-white'>Swati Tomar </div>
          <div className='rounded-[15px] border px-5 text-2xl bg-[#D3E5FE] text-white mr-2 mb-1 py-0'>S</div>
        </div>
      </div>
      <div className='py-[4rem]'></div>
      <div className="w-[100%] h-[1.5px] bg-[#D9D9D9] my-0"></div>
      <div className='flex justify-end px-4 gap-5'>
        <img src={profile} className='py-2  cursor-pointer' alt="" />
        <img src={folder} className='py-2 cursor-pointer ' onClick={() => folderStack()} alt="" />
      </div>
    </div>
  );
}

export default ClassnotesCard;
