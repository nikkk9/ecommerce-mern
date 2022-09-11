import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../redux/actions/product-action";
import classes from "./AllProducts.module.css";
import ProductCard from "./ProductCard";
// import Pagination from "react-js-pagination";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Slider } from "@mui/material";

const categories = ["Mobile", "Laptop", "Kitchen", "Mens wear", "Mobile"];
const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, totalProduct, productPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  // useLocation() is used for get the query value after keyword?=""
  const location = useLocation().search;
  const keyword = location.split("=")[1];
  // const keyword = new URLSearchParams(location).get("keyword");
  // console.log(keyword);

  useEffect(() => {
    dispatch(getProducts(keyword, currPage, price, category, ratings));
    setPageCount(Math.ceil(totalProduct / 6));
  }, [dispatch, keyword, currPage, price, category, ratings]);

  let filteredCount = filteredProductsCount;

  return (
    <div className={classes.products}>
      <h2>ALL PRODUCTS</h2>
      <div className={classes.productsContainer}>
        {products.length > 0 ? (
          products.map((item) => {
            return <ProductCard key={item._id} product={item} />;
          })
        ) : (
          <h3>No product found ! </h3>
        )}
      </div>
      {keyword && (
        <div className={classes.filterBox}>
          <p>PRICE</p>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={30000}
          />

          <p>CATEGORY</p>
          <ul className={classes.catgBox}>
            {categories.map((catg) => {
              return (
                <li key={catg} onClick={() => setCategory(catg)}>
                  {catg}
                </li>
              );
            })}
          </ul>

          <p>Ratings</p>
          <Slider
            value={ratings}
            onChange={(e, rat) => setRatings(rat)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </div>
      )}
      {productPerPage < filteredCount && (
        <div className="pagination">
          <Pagination
            count={pageCount}
            color="primary"
            page={currPage}
            onChange={(e, val) => setCurrPage(val)}
            style={{
              display: "grid",
              placeItems: "center",
              margin: "2rem 0",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
