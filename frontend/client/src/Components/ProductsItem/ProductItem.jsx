import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";
import Button from "@mui/material/Button";
import fashion1 from "../../assets/images/fashion1.jpg";
import Product from "./Product";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useDialog } from "../../ContextProvider/ContextProvider";

const ProductItem = ({
  heading,
  showNavbar = true,
  offer,
  showLeftsli = true,
  showRightsli = true,
  gridLayout = false,
  prod,
  id
}) => {
  const scrollRef = useRef();
  const { products: dbProducts } = useDialog();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const displayedProducts = prod && prod.length > 0 ? prod : dbProducts;

  return (
    <div className="product-item">
      <div className="product-item-header">
        <div className="heading">
          <h2>{heading}</h2>
          {offer && <p className="offer">{offer}</p>}
        </div>
        {showNavbar && (
          <ul className="links-tab">
            {[
              "फेशन",
              "विद्युत सामग्रीहरू",
              "खुट्टाका जुत्ता",
              "किराना सामान",
              "सौन्दर्य",
              "स्वास्थ्य",
              "गहना",
            ].map((item) => (
              <li key={item}>
                <Link to="#">
                  <Button variant="text" className="nav-link">
                    {item}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`products ${gridLayout ? 'grid-layout' : 'slider-layout'}`}>
        {!gridLayout && showLeftsli && (
          <button className="scroll-btns left" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>
        )}

        <div 
          className={`product-container ${gridLayout ? 'product-grid-container' : 'product-slider-container'}`}
          ref={gridLayout ? null : scrollRef}
        >
          {displayedProducts.map((p, index) => (
            <Product
              key={`${p.name}-${index}`}
              image={p.image}
              discount={p.discount}
              brand={p.brand}
              name={p.name}
              rating={p.rating}
              originalPrice={p.originalPrice}
              price={p.price}
              id={p._id || p.id}
            />
          ))}
        </div>

        {!gridLayout && showRightsli && (
          <button className="scroll-btns right" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;