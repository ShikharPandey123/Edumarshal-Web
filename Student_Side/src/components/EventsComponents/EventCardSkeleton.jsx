import React from "react";

export default function EventCardSkeleton() {
    const skeletonCards = Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="xmd:w-[21rem] w-[16rem] xmd:h-[19rem] h-[13rem] md:mx-7 mt-8 justify-evenly p-2 flex flex-col bg-[#FBFBFB] my-3 rounded-3xl border-y-2 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-4/5 mx-auto my-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto my-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto my-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto my-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto my-2"></div>
            <div className="flex justify-center items-center mt-2">
                <div className="bg-gray-300 rounded-xl flex justify-center items-center px-8 cursor-pointer w-24 h-8">Loading</div>
            </div>
        </div>
    ));

    return <>{skeletonCards}</>;
}
