import React from "react";

export default function DocumentCard({ document, handleUploadClick, handleDownloadClick, uploadedFile }) {
    return (
        <div className="md:w-42 w-21 relative md:ml-14 ml-2 my-7">
            <div
                className="rounded-t-2xl bg-slate-700 sm:h-[214px] sm:w-[214px] h-[180px] w-[180px] relative"
                style={{
                    backgroundImage: `url(${uploadedFile})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div>
                <div className="absolute bottom-0 right-0 left-4 mb-5 cursor-pointer flex">
                    <img
                        src="./uploadarrow.svg"
                        style={{
                            transform: "translate(-35%,-100%)",
                        }}
                        onClick={() => handleUploadClick(document)}
                    />
                </div>
                <div className="absolute bottom-0 right-0 left-50 mb-5 cursor-pointer flex">
                    <img
                        src="./downloadarrow.svg"
                        style={{
                            transform: "translate(-35%,-100%)",
                        }}
                        onClick={() => handleDownloadClick(document)}
                    />
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 bg-[#004BB8]  h-[30%] sm:w-[13.38rem] w-[11.25rem] flex justify-center items-center rounded-b-2xl"
                    style={{
                        transform: "translateY(43%)",
                    }}
                >
                    <span className="text-sm text-center text-white">
                        {document.name}
                    </span>
                </div>
            </div>
        </div>
    );
}
