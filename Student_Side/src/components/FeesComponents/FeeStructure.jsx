import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const imageUrls = {
  image1: "./btech-2nd-4th.svg",
  image2: "./btech fw fees.svg",
  image3: "./btech lateral fees.svg",
  image4: "./Mba2ndfees.svg",
};

const preloadImages = (urls) => {
  Object.values(urls).forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};


export default function FeeStructure() {
  const [visibleImage, setVisibleImage] = useState(null);

  const handleClick = (imageName) => {
    setVisibleImage((prevImage) => (prevImage === imageName ? null : imageName));
  };

  const getImageUrl = (imageName) => {
    return imageUrls[imageName];
  };

  const handleImageDownload = (imageName) => {
    const imageUrl = getImageUrl(imageName);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${imageName}.svg`;
    link.click();
  };

  const imageAnimation = useSpring({
    opacity: visibleImage ? 1 : 0,
    transform: `scale(${visibleImage ? 1 : 0})`,
  });

  return (
    <div className="bg-[#f2f6ff]  md:rounded-3xl rounded-xl">
      {Object.keys(imageUrls).map((imageName, index) => (
        <div key={index} className={`mb-10 ${index === 0 ? 'mt-10' : ''}`}>
          <div className={`h-[50px] bg-[#004BB8] my-5 rounded-[0.5rem] items-center flex cursor-pointer sm:mx-10 mx-2`} onClick={() => handleClick(imageName)}>
            <div className="text-white  md:font-semibold sm:text-base text-xs px-3 md:pl-10">{imageName === "image4" ? "MCA-2nd Year ( 2023 - 2024 )" : `B.TECH ${imageName === "image3" ? "3rd to 4th(Lateral Entry)" : "2nd to 4th"} ( 2023 - 2024 )`}</div>
          </div>
          {visibleImage === imageName && (
            <animated.div style={imageAnimation} className="md:mx-12 m-2 mx-4">
              <img src={getImageUrl(imageName)} alt={imageName} className="cursor-pointer" onClick={() => handleImageDownload(imageName)} />
            </animated.div>
          )}
        </div>
      ))}
    </div>
  );
}
