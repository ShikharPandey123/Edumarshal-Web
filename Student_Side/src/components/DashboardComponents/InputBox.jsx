import React from "react";

export default function InputBox() {
    return (
        <div className="relative my-4">
            <input
                type="email"
                name="email"
                maxLength={50}
                placeholder="Enter Email"
                className={
                    "w-[13rem] px-3 py-2 border-2 border-black rounded-xl "
                }
            />
            <label
                className={
                    "absolute bg-white font-sofia-sans text-xs font-bold left-6 bottom-9 px-1 transition-transform duration-300"
                }
            >
                Email
            </label>
        </div>
    );
}
