import React, { useEffect } from "react";
import classes from "./Home.module.css";
import Category from "../components/Category";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductCard from "../components/product/ProductCard";
import Slider from "../components/Slider";
import { getProducts } from "../redux/actions/product-action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { fetching, error, products, totalProduct } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getProducts());

    // if you are not using extra arrow function in action file of redux then you have to use
    // dispatch(getProducts)
  }, [dispatch]);
  return (
    <div>
      <Header />

      <Slider />
      <Category />

      {fetching ? (
        <Loader />
      ) : (
        <div className={classes.product}>
          <h1>ORDER YOUR FAVOURITE PRODUCTS</h1>
          <div className={classes.container}>
            {products.map((p) => {
              return <ProductCard key={p._id} product={p} />;
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
