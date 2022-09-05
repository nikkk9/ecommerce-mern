import React from "react";
import classes from "./Home.module.css";
import Category from "../components/Category";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductCard from "../components/product/ProductCard";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <Category />

      <div className={classes.product}>
        <h1>ORDER YOUR FAVOURITE PRODUCTS</h1>
        <ProductCard />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
