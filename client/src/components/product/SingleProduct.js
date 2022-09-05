import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { clientReq } from "../../axios/req";
import classes from "./SingleProduct.module.css";

const SingleProduct = () => {
  const location = useLocation();
  // console.log(location);
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);

  // product quantity
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  const quantityHandler = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await clientReq.get(`/product/${id}`);
      // console.log(data);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  // const addCartHandler = () => {
  //   dispatch(addToCart({ ...product, quantity, size, color }));
  //   console.log(product);
  // };

  return (
    <div className={classes.product}>
      <h2>PRODUCT DETAILS</h2>
      <div className={classes.container}>
        <div className={classes.left}>
          <img src={product.img} alt="" />
        </div>

        <div className={classes.right}>
          <h1>{product.title}</h1>
          <p>
            <b>{product.price}</b> INR
          </p>
          <div className={classes.filter}>
            <div className={classes.color}>
              <h3>Choose the color</h3>
              {product.color?.map((c) => {
                return (
                  <span
                    key={c}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  ></span>
                );
              })}
            </div>
            <div className={classes.size}>
              <span>Size : </span>
              <select onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => {
                  return <option key={s}>{s}</option>;
                })}
              </select>
            </div>
          </div>
          <div className={classes.add}>
            <button onClick={() => quantityHandler("dec")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => quantityHandler("inc")}>+</button>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
