import React, { useEffect, useState } from "react";
import productImg from "../../data/product-img";
import classes from "./ProductCard.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import RatingStars from "react-rating-stars-component";
import { getProducts } from "../../redux/actions/product-action";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = () => {
  const dispatch = useDispatch();
  const { fetching, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts);

    // sometimes you have to use this
    // dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {products.map((item) => {
        return (
          <div className={classes.details} key={item._id}>
            <img src={item.img} />
            <p>{item.title}</p>
            <div className={classes.rating}>
              <RatingStars
                edit={false}
                color="gray"
                activeColor="tomato"
                value={item.ratings}
                isHalf={true}
                size={25}
              />
              <span>({item.numOfReviews} reviews)</span>
            </div>
            <p>{item.price} INR</p>
            <div className={classes.icons}>
              <Link to="">
                <ShoppingCartOutlinedIcon className={classes.icon} />
              </Link>
              <Link to={`/product/${item._id}`}>
                <SearchIcon className={classes.icon} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
