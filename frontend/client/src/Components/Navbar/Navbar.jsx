import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [catIndex, setCatIndex] = useState(null);

  const categories = [
    {
      name: "फेशन",
      subcategories: ["पुरुष", "महिला", "केटाकेटी", "केटा", "केटी", "सामग्री"],
    },
    {
      name: "इलेक्ट्रोनिक्स",
      subcategories: ["टिभी", "अडियो", "क्यामेरा", "गेमिङ", "सामग्री"],
    },
    {
      name: "मोबाइल",
      subcategories: ["स्मार्टफोन", "ट्याब्लेट", "वेरेबल्स", "सामग्री"],
    },
    {
      name: "ल्यापटप",
      subcategories: ["गेमिङ", "व्यवसाय", "अल्ट्राबुक्स", "सामग्री"],
    },
    {
      name: "स्मार्ट वाच",
      subcategories: ["फिटनेस", "लक्जरी", "खेलकुद", "साधारण"],
    },
    {
      name: "चार्जर",
      subcategories: ["वायरलेस", "फास्ट चार्जिङ", "कार चार्जर", "पावर बैंक"],
    },
    {
      name: "ब्याक",
      subcategories: ["ब्याकप्याक", "ह्यान्डब्याग", "यात्रा", "ल्यापटप ब्याग"],
    },
    {
      name: "जुत्ता",
      subcategories: ["खेलकुद", "क्याजुअल", "फर्मल", "स्यान्डल"],
    },
  ];

  const toggleSidebar = () => setSidebar(!sidebar);
  const toggleCategory = (index) => setCatIndex(catIndex === index ? null : index);

  return (
    <nav>
      <div className="nav-container">
        <div className="short-by">
          <Button
            className="nav-btn icon text"
            onClick={toggleSidebar}
            variant="text"
          >
            <span className="menu icon">
              <IoIosMenu />
            </span>
            वर्ग अनुसार किनमेल गर्नुहोस्
            <span className="arrow icon">
              <IoIosArrowDown />
            </span>
          </Button>
        </div>

        <div className="nav-bar">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                गृह
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/fashion" className="nav-link">
                फेशन
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" className="nav-link">
                    <Button variant="text" className="nav-btn">पुरुष</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="nav-link">
                    <Button variant="text" className="nav-btn">महिला</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="nav-link">
                    <Button variant="text" className="nav-btn">केटी</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="nav-link">
                    <Button variant="text" className="nav-btn">केटाकेटी</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="nav-link">
                    <Button variant="text" className="nav-btn">केटा</Button>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="/" className="nav-link">
                इलेक्ट्रोनिक्स
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/" className="nav-link"><Button variant="text" className="nav-btn">टिभी</Button></Link></li>
                <li><Link to="/" className="nav-link"><Button variant="text" className="nav-btn">अडियो</Button></Link></li>
                <li><Link to="/" className="nav-link"><Button variant="text" className="nav-btn">क्यामेरा</Button></Link></li>
                <li><Link to="/" className="nav-link"><Button variant="text" className="nav-btn">गेमिङ</Button></Link></li>
                <li>सामग्री</li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="/" className="nav-link">
                ब्याग
              </Link>
              <ul className="dropdown-menu">
                <li>पुरुष</li>
                <li>महिला</li>
              </ul>
            </li>

            <li><Link to="/" className="nav-link">सौन्दर्य</Link></li>
            <li><Link to="/" className="nav-link">स्वास्थ्य</Link></li>
            <li><Link to="/" className="nav-link">ज्वेलरी</Link></li>

            <li className="dropdown">
              <Link to="/" className="nav-link">
                जुत्ता
              </Link>
              <ul className="dropdown-menu">
                <li>पुरुष जुत्ता</li>
                <li>महिला जुत्ता</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="delivery">
          <Button variant="text" className="nav-btn text">
            <span className="arrow icon"><CiDeliveryTruck /></span>
            नेपालभरि वितरण
          </Button>
        </div>
      </div>

      <div className={sidebar ? "sidebar-active" : "sidebar"}>
        <div className="logo-container">
          <h2 className="logo">SHOPLY</h2>
          <h4 className="mart">बिग मेगा मार्ट</h4>
        </div>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <div
                className="categorys-items"
                onClick={() => toggleCategory(index)}
              >
                <span className="category-name">{category.name}</span>
                <span className="arrow"><IoIosArrowDown /></span>
              </div>
              <ul className={`subcategory-list ${catIndex === index ? "expanded" : ""}`}>
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className="subcategory-item">{sub}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
