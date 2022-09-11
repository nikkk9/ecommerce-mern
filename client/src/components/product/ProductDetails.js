import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/actions/product-action";
import classes from "./ProductDetails.module.css";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  // useParams() is used for get the params value after slash(/) in url
  const params = useParams();
  console.log(params);

  const dispatch = useDispatch();
  const { product, fetching, error } = useSelector((state) => state.product);
  // console.log(product);

  // product quantity
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);

  const quantityHandler = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      <div className={classes.product}>
        <h2>PRODUCT DETAILS</h2>
        <div className={classes.container}>
          <div className={classes.left}>
            <img src={product.images} alt="" />
          </div>

          <div className={classes.right}>
            <h1>{product.title}</h1>
            <p className={classes.price}>
              <b>{product.price}</b> INR
            </p>
            <div className={classes.add}>
              <button
                className={classes.decBtn}
                onClick={() => quantityHandler("dec")}
              >
                -
              </button>
              <input type="number" value={quantity} readOnly />
              <button
                className={classes.incBtn}
                onClick={() => quantityHandler("inc")}
              >
                +
              </button>
              <button className={classes.cartBtn}>ADD TO CART</button>
            </div>

            <p className={classes.stock}>
              Status:
              <b
                className={
                  product.stock < 1 ? classes.redColor : classes.greenColor
                }
              >
                {product.stock < 1 ? "Out Of Stock" : "In Stock"}
              </b>
            </p>

            <div className={classes.desc}>
              Description : <p>{product.desc}</p>
            </div>

            <button className={classes.submitBtn}>Submit Review</button>
          </div>
        </div>
      </div>

      <div className={classes.reviewContainer}>
        <h2>REVIEWS OF PRODUCT</h2>

        {product.reviews && product?.reviews[0] ? (
          <div className={classes.reviews}>
            {product.reviews?.map((r) => {
              console.log(r);
              return <ReviewCard key={r._id} review={r} />;
            })}
          </div>
        ) : (
          <p className={classes.noReviews}>No Reviews Yet</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
