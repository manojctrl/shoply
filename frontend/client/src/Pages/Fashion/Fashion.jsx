import React, { useState } from "react";
import CategorySidebar from "../../Components/CategorySidebar/CategorySidebar";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaThLarge } from "react-icons/fa";
import "./Fashion.css";
import ProductItem from "../../Components/ProductsItem/ProductItem";
import ProductItemList from "../../Components/ProductItemList/ProductItemList";
import { products } from "../../Data/LocalStorage";
import { Button } from "@mui/material";

const Fashion = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
  const indexOfLastProduct = indexOfFirstProduct + productsPerPage;

  const visibleProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  let startPage = currentPage - 3;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(6, totalPages);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(totalPages - 5, 1);
  }

  const visibleNumber = [];
  for (let i = startPage; i <= endPage; i++) {
    visibleNumber.push(i);
  }

  return (
    <section className="fashion-section">
      <div className="page-container">
        <CategorySidebar />

        <div className="page-content">
          <div className="page-product-details-header">
            <div className="header-details-left">
              <IoReorderThreeOutline
                className="three-outline-icon"
                onClick={() => setViewMode("list")}
              />
              <FaThLarge
                onClick={() => setViewMode("grid")}
                className="th-large-icon"
              />
              <span>
                Showing {visibleProducts.length} of {products.length} products
              </span>
            </div>
            <div className="header-details-right">
              <span>Sort by:</span>
              <select className="sort-select">
                <option value="name-asc">Name, A to Z</option>
                <option value="name-desc">Name, Z to A</option>
                <option value="price-asc">Price, Low to High</option>
                <option value="price-desc">Price, High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          <div className="fashion-product">
            {viewMode === "grid" ? (
              <ProductItem
                heading="🔥 Trending Fashion"
                offer="Upto 50% OFF"
                showNavbar={false}
                showLeftsli={false}
                showRightsli={false}
                gridLayout={true}
                prod={visibleProducts}
              />
            ) : (
              <ProductItemList prods={visibleProducts} />
            )}
          </div>

          <div className="pagination">
            <Button
              className="pagination-btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {visibleNumber.map((num) => (
              <Button
                key={num}
                className={`pagination-btn ${
                  num === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </Button>
            ))}

            <Button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fashion;
