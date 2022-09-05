import React from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // const cart = useSelector((state) => state.cart);
  // console.log(cart);

  // const quantity = useSelector((state) => state.cart.cartQuantity);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const logoutHandler = () => {
  //   dispatch(logoutS);
  //   localStorage.removeItem("persist:root");
  //   navigate("/login");
  // };

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <Link to="/">
          <h2>E-COMM.</h2>
        </Link>
      </div>

      <div className={classes.mid}>
        <div className={classes.search}>
          <input type="text" placeholder="Search" />
          <SearchIcon className={classes.searchIcon} />
        </div>
      </div>
      <div className={classes.right}>
        <Link to="/signup">
          <p>SIGNUP</p>
        </Link>
        <Link to="/login">
          <p>LOGIN</p>
        </Link>
        <Link to="/">
          <p>LOGOUT</p>
        </Link>
        <Link to="/cart">
          <div className={classes.cart}>
            <ShoppingCartOutlinedIcon className={classes.cartIcon} />
            <div className={classes.counter}>6</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
