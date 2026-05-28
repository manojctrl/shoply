import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const contextDistributor = createContext();

export const ContextProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    const local = localStorage.getItem("userInfo");
    return local ? JSON.parse(local) : null;
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem("cartItems");
    return localCart ? JSON.parse(localCart) : [];
  });

  // Fetch Products & Categories
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const { data } = await API.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const dialogOpen = (product) => {
    setSelectedProduct(product);
    setDialogState(true);
  };

  const dialogClose = () => {
    setSelectedProduct(null);
    setDialogState(false);
  };

  const openDrawer = () => setCartDrawer(true);
  const closedDrawer = () => setCartDrawer(false);
  const toggleDrawer = () => setCartDrawer((prev) => !prev);

  // Auth helper methods
  const loginUser = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setCartItems([]);
  };

  // Cart helper methods
  const addToCart = (product, qty = 1, size = "M") => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find(
        (x) => x.product === product._id && x.size === size
      );

      if (existItem) {
        return prevItems.map((x) =>
          x.product === product._id && x.size === size
            ? { ...x, qty: x.qty + qty }
            : x
        );
      } else {
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            image: product.image,
            qty,
            size,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((x) => !(x.product === productId && x.size === size))
    );
  };

  const updateCartQty = (productId, size, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((x) =>
        x.product === productId && x.size === size ? { ...x, qty } : x
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const values = {
    dialogState,
    dialogOpen,
    dialogClose,
    selectedProduct,
    cartDrawer,
    openDrawer,
    closedDrawer,
    toggleDrawer,
    userInfo,
    loginUser,
    logoutUser,
    products,
    categories,
    loadingProducts,
    loadingCategories,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
  };

  return (
    <contextDistributor.Provider value={values}>
      {children}
    </contextDistributor.Provider>
  );
};

export default ContextProvider;
export const useDialog = () => useContext(contextDistributor);
