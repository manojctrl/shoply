import React from "react";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import HomeSlider2 from "../../Components/HomeSlider/HomeSlider2";
import { PiVanLight } from "react-icons/pi";
import AddSlider from "../../Components/AddSlider/AddSlider";
import ProductItem from "../../Components/ProductsItem/ProductItem";
import Blog from "../../Components/Blog/Blog";
import Features from "../../Components/Features/Features";
// import adv1 from '../../assets/images/adv1.jpg'
// import adv2 from '../../assets/images/adv2.jpg'
// import adv3 from '../../assets/images/adv3.jpg'
// import adv44 from '../../assets/images/adv44.jpg'
// import adv5 from '../../assets/images/adv5.jpg'
// import adv6 from '../../assets/images/adv6.jpg'


const Home = () => {
  
  return (
    <>
      <HomeSlider />
      <HomeSlider2 />
      <ProductItem heading= "Popuar Products" offer = "Do not miss the current offers until the end of March"/>
      <section className="free-delivery-sec">
        <div className="free-sec-container">
          <div className="free-sec-logo">
            <div className="van-logo">
              <PiVanLight/>
            </div>
            <span>निःशुल्क डेलिभरी सेवा</span>

          </div>
          <div className="free-delivery-info">
            <span>तपाईँको पहिलो अर्डर र रू. २००० भन्दा बढीको खरिदमा निःशुल्क डेलिभरी उपलब्ध छ</span>
          </div>

          <div className="dis-amount-first-buy">
            <h2> - दुई हजार रुपैयाँ</h2>
          </div>

        </div>

      </section>
      {/* < HomeSlider /> */}
      <ProductItem heading="Latest Product" showNavbar={false}/>
      <AddSlider />
      {/* <ProductItem /> */}
            <ProductItem heading="Featued Product" showNavbar={false}/>
            <br />
            <br />

            < Blog />
            {/* <Features /> */}



    </>
  );
};

export default Home;
