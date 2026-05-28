import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "@mui/material/Button";

import adv1 from "../../assets/images/adv1.jpg";
import adv2 from "../../assets/images/adv2.jpg";
import adv3 from "../../assets/images/adv3.jpg";
import adv44 from "../../assets/images/adv44.jpg";
import adv5 from "../../assets/images/adv5.jpg";
import adv6 from "../../assets/images/adv6.jpg";
import adv8 from "../../assets/images/adv8.jpg";
import headphone from "../../assets/images/headphone.jpg";
import addidasback from "../../assets/images/addidasback.jpg";
import whatch from "../../assets/images/whatch.jpg";
import airbods from "../../assets/images/airbods.jpg";
import shoes from "../../assets/images/shoes.jpg";
import iphone from "../../assets/images/iphone.jpg";

import "./AddSlider.css";

const AddSlider = () => {
  const slides = [
  { id: 1, title: "सैमसङ ५५-इन्च ४के स्मार्ट टिभी", subtitle: "दशैँ तिहार अफर", price: "रु ४५,०००", image: adv1 },
  { id: 2, title: "नाइके एयर म्याक्स जुत्ता - कालो", subtitle: "दशैँ तिहार अफर", price: "रु ८,५००", image: adv3 },
  { id: 3, title: "लेभीस स्लिम फिट जिन्स - नीलो", subtitle: "दशैँ तिहार अफर", price: "रु ३,२००", image: adv8 },
  { id: 4, title: "सोनी वायरलेस हेडफोन", subtitle: "दशैँ तिहार अफर", price: "रु १२,०००", image: headphone },
  { id: 5, title: "रे-ब्यान अविएटर सनग्लासेस", subtitle: "दशैँ तिहार अफर", price: "रु ९,८००", image: adv44 },
  { id: 6, title: "किचनएड स्ट्यान्ड मिक्सर - रातो", subtitle: "दशैँ तिहार अफर", price: "रु २५,०००", image: adv5 },
  { id: 7, title: "एडिडास स्पोर्ट्स ब्याकप्याक", subtitle: "दशैँ तिहार अफर", price: "रु ४,५००", image: addidasback },
  { id: 8, title: "डाइसोन V10 भ्याकुम क्लिनर", subtitle: "दशैँ तिहार अफर", price: "रु ३५,०००", image: adv6 },
  { id: 9, title: "टिसोट जेन्टलम्यान घडी", subtitle: "दशैँ तिहार अफर", price: "रु १८,०००", image: whatch },
  { id: 10, title: "फिलिप्स एयर फ्रायर - ४.५ लिटर", subtitle: "दशैँ तिहार अफर", price: "रु ७,५००", image: airbods },
];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="promo-flex">
      {/* Left slider */}
      <div className="slider">
        <div className="slider-content">
          <img className="slider-content-img" src={slides[currentIndex].image} alt={slides[currentIndex].title} />
          <div className="slider-text">
            <p className="slider-subtitle">{slides[currentIndex].subtitle}</p>
            <p className="slider-title">{slides[currentIndex].title}</p>
            <p className="slider-price">{`Starting at only ${slides[currentIndex].price}`}</p>
            <Button variant="outlined" className="shop-btn">Shop Now</Button>
          </div>
        </div>

        <button className="arrowww left" onClick={prevSlide}><FaChevronLeft /></button>
        <button className="arrowww right" onClick={nextSlide}><FaChevronRight /></button>
      </div>

      {/* Right stacked ads */}
      <div className="ads">
        <div className="ad-card blue">
          <div>
            <h3>पुरुषको जुत्ता कम मूल्यमा किन्नुहोस्</h3>
            <p className="price">रू १,५००</p>
            <button className="link-btn">Shop Now</button>
          </div>
          <img src={shoes} alt="Footwear" />
        </div>

        <div className="ad-card green">
          <div>
            <h3>एप्पल आइफोन किन्नुहोस्</h3>
            <p className="price">रू ७५,०००</p>
            <button className="link-btn">Shop Now</button>
          </div>
          <img src={iphone} alt="iPhone" />
        </div>
      </div>
    </div>
  );
};

export default AddSlider;
