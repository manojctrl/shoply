import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDialog } from "../../ContextProvider/ContextProvider";
import ImageMagnify from "react-image-magnify";
import { products } from "../../Data/LocalStorage";
import { FaStar, FaRegStar, FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import "../ProductDetails/ProductDetails.css";

const ProductDialog = () => {
  const { dialogState, dialogClose, selectedProduct } = useDialog();
  console.log("Dialog State:", dialogState);
  console.log("Selected Product:", selectedProduct);
  console.log("Image URL:", selectedProduct?.image);

  const [number, setNumber] = useState(1);

  const decrement = () => setNumber((prev) => (prev > 1 ? prev - 1 : 1));
  const increment = () => setNumber((prev) => prev + 1);

  if (!dialogState || !selectedProduct) {
    console.log("Dialog not rendered: dialogState or selectedProduct is missing");
    return null;
  }

  return (
    <Dialog
      open={dialogState}
      onClose={dialogClose}
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
      fullWidth
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "70%",
          maxWidth: "70%",
          borderRadius: "20px",
          padding: "10px",
        },
      }}
    >
      <DialogTitle id="product-dialog-title" sx={{ m: 0, p: 2 }}>
      
        <IconButton
          aria-label="close"
          onClick={dialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="product-details-page">
          <div className="product-details-img" style={{ maxWidth: "400px" }}>
            <ImageMagnify
              {...{
                smallImage: {
                  alt: selectedProduct.name || "Product Image",
                  isFluidWidth: true,
                  src: selectedProduct.image || "/images/default.jpg",
                },
                largeImage: {
                  src: selectedProduct.image || "/images/default.jpg",
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "150%",
                  height: "150%",
                },
                enlargedImagePosition: "over",
                shouldUsePositiveSpaceLens: true,
                lensStyle: { backgroundColor: "rgba(0,0,0,0.2)" },
              }}
            />
          </div>
          <div className="product-details-info">
            {/* Move brand back to its original position, right after the image */}
        {/* {selectedProduct.name} */}
            <h2>{selectedProduct.name || "No Name"}</h2>
            <p >ब्रान्ड: {selectedProduct.brand || "No Brand"}</p>
            <div className="rating-wala">
              {Array.from({ length: 5 }).map((_, index) =>
                index < (selectedProduct.rating || 0) ? (
                  <FaStar key={index} color="gold" />
                ) : (
                  <FaRegStar key={index} />
                )
              )}
            </div>
            <div className="discount-wala">
              <p>छुट: Rs {selectedProduct.price || 0}</p>
              <p>परेको मूल्य: Rs {selectedProduct.originalPrice || 0}</p>
              <p>जम्मा कति छाता: {products.length}</p>
            </div>
            <div className="saman-ko-barema-jankari">
              <span>
                {selectedProduct.description ||
                  "यो उत्पादन उच्च गुणस्तरको सामग्रीबाट बनेको छ, आरामदायक फिट र आधुनिक डिजाइनको साथ। यो दैनिक प्रयोगका लागि उपयुक्त छ र विभिन्न अवसरहरूमा पहिरिन सक्छ। यसको टिकाउपन र स्टाइलिश लुकले तपाईंलाई आत्मविश्वास महसुस गराउनेछ।"}
              </span>
            </div>
            <div className="size-selector">
              <label>Size: </label>
              {["S", "M", "L", "XL", "XXL"].map((s, i) => (
                <Button variant="outlined" key={i} className="size-btn">
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
                <Button variant="outlined" className="quantity-btn" onClick={decrement}>
                  -
                </Button>
                <span className="quantity-number">{number}</span>
                <Button variant="outlined" className="quantity-btn" onClick={increment}>
                  +
                </Button>
              </div>
            </div>
            <div className="add-to-cart-whislist-compare">
              <div className="add-wala">
                <Button variant="contained" className="add-to-cart-btn">
                  <FaCartShopping />
                  ADD TO CART
                </Button>
              </div>
              <div className="wishlist-compare">
                <Button variant="outlined" className="wishlist-btn">
                  <CiHeart />
                  ADD TO WISHLIST
                </Button>
              </div>
              <div className="compare-wala">
                <Button variant="outlined" className="compare-btn">
                  <MdCompareArrows />
                  ADD TO COMPARE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;