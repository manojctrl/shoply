import { useState } from "react";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import MainHeader from "./Components/MainHeader/MainHeader";
import Fashion from "./Pages/Fashion/Fashion";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Features from "./Components/Features/Features";
import ContextProvider from "./ContextProvider/ContextProvider";
import ProductDialog from "./Components/ProductDialog/ProductDialog";
// import { Login } from "@mui/icons-material";
// import { Dialog } from "@mui/material";
import Login from "./Pages/Login/Login";
import Cart from "./Components/Cart/Cart";
import CartSpecifi from "./Components/CartSpecifi/CartSpecifi";
// import { Checkbox } from "@mui/material";
import Checkout from "./Components/Checkout/Checkout";
import Verify from "./Components/Verify/Verify";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import MyAccount from "./Pages/MyAccount/MyAccount";
// import CartItems from "./Components/CartItems/CartItems";
// import CartItems from './Components/CartItems/CartItems';
// import CartItems from './Components/CartItems/CartItems';
// import Carts from "./Components/Carts/Carts";
import Carts from "./Components/Carts/Carts";
import MyOrder from './Components/myorder/MyOrder'
function App() {
  return (
    <>
      <ContextProvider>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<CartSpecifi />}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<MyAccount />} />
          {/* <Route path="/all-items" element={<CartItems/>} /> */}
          <Route path="/my-list" element={<Carts/>}></Route>
          <Route path='/my-order' element={<MyOrder/>}></Route>
          
          
        </Routes>

        {/* <Features /> */}
        <Cart />
        {/* <Carts/> */}
        <ProductDialog />
        <Features />
      </ContextProvider>
    </>
  );
}

export default App;
