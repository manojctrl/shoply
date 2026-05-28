import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../Data/LocalStorage";
import ImageMagnify from "react-image-magnify";
import { Button } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import "./ProductDetails.css";
import ProductItem from "../ProductsItem/ProductItem";
// import { CiStar } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";

import { useDialog } from "../../ContextProvider/ContextProvider";

const ProductDetails = () => {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("M");

  const { products: dbProducts, addToCart, openDrawer } = useDialog();
  const navigate = useNavigate();

  const product = dbProducts.find((p) => p._id === productId || p.id === parseInt(productId)) || products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div className="not-found"> 404 not found</div>;
  }

  const [number, setNumber] = useState(1);
  const increment = () => {
    setNumber(number + 1);
  };

  const decrement = () => {
    if (number > 1) {
      setNumber(number - 1);
    } else {
      setNumber(1);
    }
  };

  const[visibleReviews,setVisibleReviews]= useState(3);

  const handleAddToCart = () => {
    addToCart(product, number, selectedSize);
    openDrawer();
  };

  return (
    <div className="container-details">
      <div className="back-btn-container">
        <Button
          variant="outlined"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Products
        </Button>
      </div>
      <div className="product-details-page">
        <div className="product-details-img">
          <ImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: product.image,
              },
              largeImage: {
                src: product.image,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "150%",
              },
              enlargedImagePosition: "over", // ✅ Overlay zoom
              shouldUsePositiveSpaceLens: true,
              lensStyle: { backgroundColor: "rgba(0,0,0,0.2)" },
            }}
          />
        </div>
        <div className="product-details-info">
          <h2>{product.name}</h2>
          <div className="review-wala">
            <div className="brand-wala">
              <p>ब्रान्ड: {product.brand}</p>
            </div>
            <div className="rating-wala">
              {Array.from({ length: 5 }).map((_, index) => {
                return index < product.rating ? (
                  <FaStar key={index} color="gold" />
                ) : (
                  <FaRegStar key={index} />
                );
              })}
            </div>
            <div className="discount-wala">
              <div className="chut">
                <p>छुट: {product.discount}%</p>
              </div>
              <div className="pareko-price">
                <p>परेको मूल्य: Rs{product.originalPrice}</p>
              </div>
              <div className="jamma-kati-xata-product">
                <p>मूल्य: Rs{product.price}</p>
              </div>
            </div>
            <div className="saman-ko-barema-jankari">
              <span>
                {product.description ||
                  "यो उत्पादन उच्च गुणस्तरको सामग्रीबाट बनेको छ, आरामदायक फिट र आधुनिक डिजाइनको साथ। यो दैनिक प्रयोगका लागि उपयुक्त छ र विभिन्न अवसरहरूमा पहिरिन सक्छ। यसको टिकाउपन र स्टाइलिश लुकले तपाईंलाई आत्मविश्वास महसुस गराउनेछ।"}
              </span>
            </div>

            <div className="size-selector">
              <label>Size: </label>
              {["S", "M", "L", "XL", "XXL"].map((s, i) => (
                <Button 
                  variant={selectedSize === s ? "contained" : "outlined"} 
                  key={i} 
                  className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div className="kati-din-ma-delivery-ta">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </div>
            <div className="quantity-kati-ta">
              <label>Quantity: </label>
              <div className="quatiity-plus-minus">
                <Button
                  variant="outlined"
                  className="quantity-btn"
                  onClick={decrement}
                >
                  -
                </Button>
                <span className="quantity-number">{number}</span>
                <Button
                  variant="outlined"
                  className="quantity-btn"
                  onClick={increment}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="add-to-cart-whislist-compare">
              <div className="add-wala">
                <Button variant="contained" className="add-to-cart-btn" onClick={handleAddToCart}>
                  {" "}
                  <FaCartShopping />
                  ADD TO CART
                </Button>
              </div>
              <div className="wishlist-compare">
                <Button variant="outlined" className="wishlist-btn">
                  {" "}
                  <CiHeart />
                  ADD TO WISHLIST
                </Button>
              </div>
              <div className="compare-wala">
                <Button variant="outlined" className="compare-btn">
                  {" "}
                  <MdCompareArrows />
                  ADD TO COMPARE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="disctiption-addition-feaatures-reviews-container">
        <div className="button-group">
          <Button
            variant="outlined"
            className={`description-btn ${activeTab ===

              "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </Button>
          <Button
            variant="outlined"
            className={`additional-features-btn ${activeTab === "features" ? "active" : ""}`}
            onClick={() => setActiveTab("features")}
          >
            Additional Info
          </Button>
          <Button
            variant="outlined"
            className= {`reviews-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </Button>
        </div>

        <div className="content-muji">
          {activeTab === "description" && (
            <span>
              {product.description ||
                "यो उत्पादन उच्च गुणस्तरको सामग्रीबाट बनेको छ, आरामदायक फिट र आधुनिक डिजाइनको साथ। यो दैनिक प्रयोगका लागि उपयुक्त छ र विभिन्न अवसरहरूमा पहिरिन सक्छ। यसको टिकाउपन र स्टाइलिश लुकले तपाईंलाई आत्मविश्वास महसुस गराउनेछ।"}
            </span>
          )}

          {activeTab === "features" && (
            <table className="info-table">
              <tbody>
                {product.additionalInfo ? (
                  Object.entries(product.additionalInfo).map(
                    ([key, value], i) => (
                      <tr key={i}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="2">No additional information available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-section">
              <h3>Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.slice(0,visibleReviews).map((r, i) => (
                  <div key={i.id} className="single-review">
                    <div className="container-review-star-comment">
                      <div className="header-reviews">
                        <div className="img-review-info">
                          <img src={r.image} />
                        </div>
                        <div className="name-date">
                          <h4>{r.username}</h4>
                          <p>{r.date}</p>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur delectus maiores placeat non, excepturi eum corrupti molestias id facere. Voluptatum nulla perspiciatis adipisci sequi ad dignissimos officia ducimus in aliquid.</span>
                        </div>
                      </div>
                      <div className="rating-review">
                        {Array.from({ length: 5 }).map((_,i)=>{
                          return i < r.rating ? 
                          <FaStar key={i} color="gold" />
                          : <FaRegStar key={i} />
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </div>
          )}
          {
            visibleReviews < product.reviews.length && 
            activeTab === "reviews" && (
              <div className="load-more-reviews">
              <Button variant="outlined" onClick={()=>setVisibleReviews((prev)=>prev+ 3)}>Load More Reviews</Button>

                </div>
            )
          }
        </div>
      </div>
      <ProductItem heading={"Similar Products"} showNavbar={false} />
    </div>
  );
};

export default ProductDetails;
