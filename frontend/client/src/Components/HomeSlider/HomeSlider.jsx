import React, { useEffect, useState } from "react";
import clothes from "../../assets/images/clothes.jpg";
import freeStock from "../../assets/images/freeStock.jpg";
import gadgets from "../../assets/images/gadgets.jpg";
import shoes from "../../assets/images/shoes.jpg";
import whatch from "../../assets/images/whatch.jpg";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import laptop from "../../assets/images/laptop.jpg";
import pexels from "../../assets/images/pexels.jpg";
import Button from "@mui/material/Button";
import { HiOutlineArrowLeft } from "react-icons/hi";
import "./HomeSlider.css";

const HomeSlider = () => {
  const slides = [
    clothes,
    freeStock,
    gadgets,
    shoes,
    whatch,
    img1,
    img2,
    img3,
    img4,
    laptop,
    pexels,
  ];
  // useEffect(() => {
  //   setInterval(()=>{
  //     setCurrentIndex((prev)=> (prev === slides.length - 1 ? 0 : prev + 1 ))
  //   }, 2000)
  // }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []); // empty dependency → mount हुँदा मात्र चल्छ


  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slidebar">
      <div className=" arrow left-arrow">
        <Button variant="text" onClick={goToPrevious}>
          <HiOutlineArrowLeft />
        </Button>
      </div>

      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="right-arrow arrow" onClick={goToNext}>
        <Button variant="text">
          <HiOutlineArrowLeft />
        </Button>
      </div>
    </div>
  );
};

export default HomeSlider;
