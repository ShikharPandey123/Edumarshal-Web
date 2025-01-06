import React from "react";

export default function  PaymentHistory () {
    return (
        <div className="bg-[#f2f6ff] h-[68vh] rounded-3xl mx-12 mt-4 overflow-y-auto">
          <div className="h-[44px] bg-[#004BB8] m-10 rounded-[0.5rem] items-center flex justify-between pl-5 text-white">
            <div className="w-[18rem]">Fee Submission Date</div>
            <div className="w-[15rem]">Fees Paid</div>
            <div className="w-[15rem]">Collection Name</div>
            <div className="w-[15rem]">Payment Mode</div>
            <div className="w-[15rem]">Payment Note</div>
            <div className="w-[15rem]">Print</div>
           </div>
           <div className="flex justify-between ml-14 mr-10">
            <div className="w-[18rem]">Fee Submission Date</div>
            <div className="w-[15rem]">Fees Paid</div>
            <div className="w-[15rem]">Collection Name</div>
            <div className="w-[15rem]">Payment Mode</div>
            <div className="w-[15rem]">Payment Note</div>
            <div className="w-[15rem]">Print</div>
           </div>
           <div className="flex justify-center items-center mt-5">
           <div className="border-b-2 w-[93%]"></div>
           </div>
        </div>
    )
} 

