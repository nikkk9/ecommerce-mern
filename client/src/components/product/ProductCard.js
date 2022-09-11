import React from "react";
import classes from "./ProductCard.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import RatingStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  return (
    <div className={classes.details}>
      <img src={product.img} />
      <p>{product.title}</p>
      <div className={classes.rating}>
        <RatingStars
          edit={false}
          color="gray"
          activeColor="tomato"
          value={product.ratings}
          isHalf={true}
          size={25}
        />
        <span>({product.numOfReviews} reviews)</span>
      </div>
      <p>{product.price} INR</p>
      <div className={classes.icons}>
        <Link to="">
          <ShoppingCartOutlinedIcon className={classes.icon} />
        </Link>
        <Link to={`/product/${product._id}`}>
          <SearchIcon className={classes.icon} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
