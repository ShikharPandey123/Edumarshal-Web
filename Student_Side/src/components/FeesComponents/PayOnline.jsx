import React from "react";

export default function PayOnline() {
    return (
        <div className="bg-[#f2f6ff] h-auto  rounded-3xl p-3">
          <div className="bg-[#FBFBFB] h-auto md:mx-12  rounded-[0.75rem] flex p-2 overflow-y-auto">
            <div className="h-full w-[13px] rounded-l-[0.25rem] bg-[#004BB8]"></div>
            <div className="flex flex-col w-full">
                <div className="text-base font-semibold md:ml-10 ml-2 mt-7">Important Note :</div>
                <ul className="font-medium md:mx-10 flex flex-col flex-wrap text-sm md:text-lg p-5">
                 <li className="my-2">1.Current Year (2023 - 23) Academic Fee is visible here.</li>
                 <li className="my-2">2.Help Manual is attached for your reference.</li>
                 <li className="my-2">3.Incase you make payment and do not get the receipt due to net connectivity, kindly wait for 24 hours for automatically Re-generation of   receipt.</li>
                 <li className="mt-2">4.For UPI payments, kindly check your payment limits (Should be greater than 1,00,000) otherwise choose Netbanking/Credit Card/Debit Card.</li>
                </ul>
            </div>
          </div>
          <div className="h-[3rem] hidden md:flex bg-[#004BB8]  m-10 rounded-[0.5rem] items-center justify-evenly text-white font-semibold">
        <div className="h-[3rem] w-[12rem] lg:w-[16rem] flex justify-center items-center"><p>Collection Name</p></div>
        <div className="h-[3rem] w-[12rem] lg:w-[16rem] flex justify-center items-center"><p>Amount</p></div>
        <div className="h-[3rem] w-[12rem] lg:w-[16rem] flex justify-center items-center"><p>Pay</p></div>
      </div>
      <div className="flex items-center md:justify-evenly md:gap-15 md:flex md:flex-row flex-col gap-5 justify-center md:m-10 mt-10 md:mt-0">
        <div className="md:hidden flex bg-[#004BB8]  h-[3rem]  w-[12rem] justify-center items-center rounded-xl"><p className=" text-sm font-medium text-white">Collection Name</p></div>
        <div><input type="text" className="h-[3rem] w-[12rem] lg:w-[16rem]  border-2 border-black rounded-xl  bg-[#f2f6ff] p-2"></input></div>
        <div className="md:hidden flex bg-[#004BB8] h-[3rem]   w-[12rem] rounded-xl items-center justify-center"><p className=" text-sm font-medium text-white">Amount</p></div>
        <input type="number" className="h-[3rem] w-[12rem] lg:w-[14rem] border-2 border-black rounded-xl bg-[#f2f6ff] p-2"></input>
        <div><button className="flex bg-[#004BB8] h-[3rem]  w-[12rem] rounded-xl items-center justify-center text-sm font-medium text-white">Pay fee</button></div>
         </div>
          </div>
    )
    }