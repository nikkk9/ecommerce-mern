import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Products from "../components/product/ProductCard";
import SoFi from "../components/SoFi";

const ProductList = () => {
  // const location = useLocation();
  // // console.log(location);
  // const catg = location.pathname.split("/")[2];

  // const [filter, setFilter] = useState({});
  // const [sort, setSort] = useState("newest");

  // const filterHandler = (e) => {
  //   const value = e.target.value;

  //   setFilter({
  //     // filter with spread operator means it return all selected value like color and size both
  //     ...filter,
  //     [e.target.name]: value,
  //   });
  // };
  // // console.log(filter);

  // const sortHandler = (e) => setSort(e.target.value);
  // console.log(sort);
  return (
    <div>
      <Header />
      <SoFi />
      <Products />
      <Footer />
    </div>
  );
};

export default ProductList;
