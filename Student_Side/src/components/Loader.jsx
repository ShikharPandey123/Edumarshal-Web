import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function Loader() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            <PuffLoader />
            <h1 className="font-bold ml-10 text-2xl">Just a moment . . .</h1>
        </div>
    );
}
