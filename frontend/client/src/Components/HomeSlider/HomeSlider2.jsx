import Button from "@mui/material/Button";
import React, { useRef } from "react";
import { HiArrowCircleRight, HiOutlineArrowLeft } from "react-icons/hi";
import bags from "../../assets/images/bags.png";
import beauty from "../../assets/images/beauty.png";
import electronics from "../../assets/images/electronics.png";
import groceries from "../../assets/images/groceries.png";
import image from "../../assets/images/image.png";
import image2 from "../../assets/images/image2.png";
import jewellary from "../../assets/images/jewellary.png";
import "./HomeSlider2.css";

const HomeSlider2 = () => {
  const cat = [
  {
    name : "झोला",
    img : bags
  },{
    name : "सौन्दर्य",
    img : beauty

  },{
    name : "विद्युतीय उपकरणहरू",
    img : electronics,
  },{
    name : "किराना सामग्रीहरू",
    img : groceries,
  },{
    name : "घडी",
    img : image,
  }, {
    name : "जुत्ता",
    img : image2,
  },{
    name : "गरगहना",
    img : jewellary,
  }
  ];

  const slideRef = useRef(null)
  const gotoPrev = () => {
    slideRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  const gotoNext = () => {
    slideRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }


  return (
    <div className="home-slider">
      <div className="catSlider">
        <div className="left-arrowss">
          <Button  className = "btns"variant="text" onClick={gotoPrev}>
            <HiOutlineArrowLeft />
          </Button>
        </div>
        <div className="cat-slides-container" ref={slideRef}>
          {cat.map((slide, index) => {
            return (
              <div className="cat-slide" key={index}>
                <img src={slide.img} alt = {slide.name} />
                 <span className="category-name">{slide.name}</span>
              </div>
            );
          })}
          </div>

          <div className="right-arrowss">
            <Button  className = "btns" variant="text" onClick={gotoNext}>
              <HiArrowCircleRight />
            </Button>
          </div>
      </div>
    </div>
  );
};

export default HomeSlider2;
