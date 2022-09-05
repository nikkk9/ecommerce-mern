import React, { useEffect, useState } from "react";
import classes from "./CartInfo.module.css";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { authReq } from "../axios/req";
const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;

const CartInfo = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();

  const payNow = async (token) => {
    // console.log(token);
    setStripeToken(token);
    try {
      const { data } = await authReq.post("/stripe/payment", {
        tokenId: stripeToken.id,
        amount: cart.total * 100,
      });
      console.log(data);
      navigate("/success", {
        stripeData: data,
        products: cart,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const payNow = async (token) => {
  //   setStripeToken(token);
  // };
  // console.log(stripeToken);

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await authReq.post("/stripe/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       console.log(res);
  //       navigate("/success", {
  //         // stripeData: res.data,
  //         // products: cart,
  //         data: res.data,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, navigate]);
  return (
    <div className={classes.cart}>
      <div className={classes.container}>
        <h2>YOUR CART</h2>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <p className={classes.productHeading}>Product details</p>
            {cart.products.map((p) => {
              return (
                <div className={classes.info} key={p._id}>
                  <div className={classes.image}>
                    <img src={p.img} alt="" />
                  </div>
                  <div className={classes.details}>
                    <p>
                      <span>Product : </span> <b>{p.title}</b>
                    </p>
                    <p>
                      <span> ID : </span> <b>{p._id}</b>
                    </p>
                    {p.color.length > 0 && (
                      <p>
                        <span> Color : </span> <b>{p.color}</b>
                      </p>
                    )}
                    {p.size.length > 0 && (
                      <p>
                        <span> Size : </span> <b>{p.size}</b>
                      </p>
                    )}
                  </div>
                  <div className={classes.value}>
                    <h3>{p.price} INR</h3>
                    <div className={classes.add}>
                      <span>product quantity: </span>
                      <span>
                        <b>{p.quantity}</b>
                      </span>
                      <p>
                        {" "}
                        product total : <b>{p.price * p.quantity}</b>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.right}>
            <div className={classes.rightWrapper}>
              <span>Order Summary</span>
              <p>
                Total : <b>{cart.total}</b>
              </p>
              {cart.total > 0 ? (
                <StripeCheckout
                  name="ECOMM"
                  billingAddress
                  shippingAddress
                  description={`your total is ${cart.total * 100} inr`}
                  amount={cart.total * 100}
                  token={payNow}
                  stripeKey={STRIPE_KEY}
                >
                  <button>CHECKOUT NOW</button>
                </StripeCheckout>
              ) : (
                <button>Please add any product</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
