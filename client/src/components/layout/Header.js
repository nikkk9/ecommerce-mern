import React, { useState } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/user-action";
import { Alert } from "@mui/material";

const Header = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  return (
    <>
      <div className={classes.header}>
        <div className={classes.left}>
          <Link to="/">
            <h2>E-COMM.</h2>
          </Link>
        </div>

        <div className={classes.mid}>
          <div className={classes.search}>
            <form className={classes.form} onSubmit={searchHandler}>
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchIcon className={classes.searchIcon} />
            </form>
          </div>
        </div>
        <div className={classes.right}>
          <Link to="/products">
            <p>PRODUCTS</p>
          </Link>
          {authenticated && <p onClick={logoutHandler}>LOGOUT</p>}
          {!authenticated && (
            <Link to="/login-signup">
              <p>LOGIN</p>
            </Link>
          )}
          <Link to="/cart">
            <div className={classes.cart}>
              <ShoppingCartOutlinedIcon className={classes.cartIcon} />
              <div className={classes.counter}>6</div>
            </div>
          </Link>
        </div>
      </div>
      {alert && (
        <Alert
          severity="info"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          You have logged out!
        </Alert>
      )}
    </>
  );
};

export default Header;
