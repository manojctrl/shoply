import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import esewa from "../../assets/images/esewa.png";
import bank from '../../assets/images/bank.png'

import "./Features.css";
import Button from "@mui/material/Button";

const Features = () => {
  const features = [
    {
      icon: <MdOutlineLocalShipping />,
      title: "निःशुल्क ढुवानी",
      desc: "Rs 10,000 भन्दा माथिका सबै अर्डरका लागि",
    },
    {
      icon: <PiKeyReturn />,
      title: "३० दिनभित्र फिर्ता",
      desc: "विनिमयका लागि",
    },
    {
      icon: <MdPayment />,
      title: "सुरक्षित भुक्तानी",
      desc: "भुक्तानी कार्डहरू स्वीकार गरिन्छ",
    },
    {
      icon: <CiGift />,
      title: "विशेष उपहार",
      desc: "हाम्रो पहिलो उत्पादन अर्डर",
    },
    {
      icon: <FaPhoneAlt />,
      title: "२४/७ सहयोग",
      desc: "हामीलाई कहिले पनि सम्पर्क गर्नुहोस्",
    },
  ];
  return (
    <footer>
      <div className="features">
        {features.map((i) => (
          <div className="solo-features">
            <div className="feature-icon">{i.icon}</div>
            <h3 className="feature-title">{i.title}</h3>
            <p className="feature-desc">{i.desc}</p>
          </div>
        ))}
      </div>

      <div className="footer-container">
        <div className="footer-first">
          <h3 className="footer-header">हामीलाई सम्पर्क गर्नुहोस्</h3>
          <span className="footer-desc">
            {" "}
            SHOPLY, एउटा मेगामार्ट जहाँ तपाईंका उत्पादनहरू पाइन्छन्{" "}
          </span>
          <span className="footer-email">katwalmanoj67@gmail.com</span>
          <h4 className="footer-phone-no"> +९७७ ९८०४०६४००३</h4>
          <div className="chat-bot">
            <div className="chat-icon">
              <BsChatDots />
            </div>
            <div className="chat-text">
              <span className="first-text">अनलाइन सन्देश </span>
              <br />{" "}
              <span className="second-text">
                विशेषज्ञ सहायता प्राप्त गर्नुहोस्
              </span>
            </div>
          </div>
        </div>
        <div className="footer-second">
          <h3 className="footer-header">उत्पादनहरू</h3>
          <span>मूल्य घट्यो</span>
          <span>नयाँ उत्पादनहरू</span>
          <span>सर्वोत्कृष्ट बिक्री</span>
          <span>हामीलाई सम्पर्क गर्नुहोस्</span>
          <span>साइट नक्शा</span>
          <span>स्टोरहरू</span>
        </div>
        <div className="footer-third">
          <h3 className="footer-header">हाम्रो कम्पनी</h3>
          <span>डेलिभरी</span>
          <span>कानुनी सूचना</span>
          <span>प्रयोगका नियम र सर्तहरू </span>
          <span>हाम्रोबारे</span>
          <span>सुरक्षित भुक्तानीt</span>
          <span>लगइन</span>
        </div>
        <div className="footer-fouth">
          <h3 className="footer-header">समाचार पत्र सदस्यता लिनुहोस्</h3>
          <span>
            विशेष छुटहरूको समाचार पाउनको लागि हाम्रो नयाँ समाचार पत्रमा सदस्यता
            लिनुहोस्।
          </span>
          <input type="text" placeholder="Your email address"></input>
          <Button variant="contained">सदस्यता लिनुहोस्</Button>
          <div className="check-box-feature">
            <input type="checkbox" />
            <span>म नियम र सर्तहरू तथा गोपनीयता नीतिसँग सहमत छु</span>
          </div>
        </div>
      </div>
      <div className="social-media-icon">
        <div className="icon">
          <button>
            <FaFacebook />
          </button>
          <button>
            <FaInstagram />
          </button>
          <button>
            <FiTwitter />
          </button>
        </div>
        <div className="copyright">© 2025 - ई-कमर्स टेम्प्लेट</div>
        <div className="payment-through">
          <img src={esewa} alt="भुक्तानी मार्फत" />
          <img src={bank} alt="भुक्तानी मार्फत" />

        </div>
      </div>
    </footer>
  );
};

export default Features;
