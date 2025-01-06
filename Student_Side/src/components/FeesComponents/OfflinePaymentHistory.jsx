import React from "react";
import { useRef } from "react";

const Labels = [
  { name: "Payment Mode", smallWidth: "w-[16rem]" },
  { name: "Admission Number", smallWidth: "w-[16rem]" },
  { name: "Name Of Account Holder", smallWidth: "w-[16rem]" },
  { name: "UTR/IMPS No", smallWidth: "w-[16rem]" },
  { name: "Fee Receipt Amount", smallWidth: "w-[16rem]" },
  { name: "Fee Collection",  smallWidth: "w-[16rem]" },
];

export default function OfflinePaymentHistory() {
  const fileInputRef = useRef(null);
  const handleupload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
  }
  }
  const handleselect = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  }
  return (
    <div>
      <div className="h-[3rem] bg-[#004BB8] my-5 rounded-[0.5rem] items-center md:justify-between justify-center md:px-12 px-6 flex cursor-pointer sm:mx-10 ml-2 text-lg text-[#FFFFFF]">
        <div>Offline Payment</div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ml-10 md:justify-items-start justify-items-center">
        {Labels.map((label, index) => (
          <div key={index} className={`relative my-5 md:my-3 ${label.smallWidth} `}>
            <input
              // type={label.name === "Date Of Payment" ? "date" : "text"}
              type="text"
              name={`input_${index}`}
              maxLength="100"
              placeholder={label.name}
              required
              className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
            />
            <label
              className="bg-white font-sofia-sans font-medium md:text-xs text-[0.6rem] absolute left-3 top-2/5 bottom-9 px-1"
            >
              {label.name}
            </label>
          </div>
        ))}
      </div>
      <div className="md:block flex justify-center items-center">
      <div className="relative my-3 mb-6 md:w-[38vw] md:ml-10 w-[16rem]">
        <input
          type="text"
          name="7"
          maxLength="100"
          placeholder="Remarks"
          required
          className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
        />
        <label
          className="bg-white font-sofia-sans font-medium text-xs absolute left-3 top-2/5 bottom-9 px-1"
        >
          Date of Payment
        </label>
      </div>
      </div>
      <div className="md:block flex justify-center items-center">
      <div className="relative my-3 md:w-[45vw] md:ml-10 w-[16rem]">
        <input
          type="text"
          name="7"
          maxLength="100"
          placeholder="Remarks"
          required
          className="border-2 border-black w-full py-2 px-3 pr-8 focus:outline-none rounded-xl"
        />
        <label
          className="bg-white font-sofia-sans font-medium text-xs absolute left-3 top-2/5 bottom-9 px-1"
        >
          Remarks
        </label>
      </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <div>
          <div className="flex items-center ml-12 md:gap-5 gap-2 font-medium justify-center flex-wrap">
            <div>Update Bank Receipts(5MB MAX)</div>
            <div className="bg-[#004BB8] h-[2.5rem] w-[3.5rem] flex items-center justify-center rounded-xl cursor-pointer" onClick={handleupload}><img src="./uploadarrow1.svg"/></div>
          </div>
          {/* <div>
            abhinav
          </div> */}
        </div>
        <div className="mx-10">
          <ul className="md:mx-10 flex flex-col flex-wrap text-base p-5">
            <li className="my-2 flex"><p className="font-medium">Name of the Bank:</p>KOTAK MAHINDRA BANK Ltd., Navyug Market,<br></br>Ghaziabad-201001(U.P)-INDIA</li>
            <li className="my-2 flex"><p className="font-medium">Beneficiary Name:</p>Ajay Kumar Garg Engineering College</li>
            <li className="my-2 flex gap-2"><p className="font-medium">SB Account<br></br> No:</p>508010250461</li>
            <li className="mt-2 flex gap-5"><p className="font-medium">IFSC:</p>KKBK0005295</li>
          </ul>
        </div>
      </div>
      <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept=".jpg,.jpeg,.png,.heic"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleselect}
            />
    </div>
  );
}
