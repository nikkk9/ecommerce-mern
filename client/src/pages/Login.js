import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clientReq } from "../axios/req";

import classes from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);

  // const [user, setUser] = useState();
  // const navigate = useNavigate();

  // const loginHandler = async (e) => {
  //   e.preventDefault();
  //   dispatch(loginStart());
  //   try {
  //     const { data } = await clientReq.post("/login", {
  //       email,
  //       password,
  //     });
  //     // localStorage.setItem("userInfo", JSON.stringify(data));
  //     dispatch(loginSuccess(data));
  //   } catch (err) {
  //     dispatch(loginFailure());
  //   }
  // };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("userInfo");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //     // navigate("/");
  //   }
  // }, []);
  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h1>LOGIN FORM</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {isFetching ? ( */}
          <button style={{ cursor: "not-allowed" }}>Fetching...</button>
          {/* ) : ( */}
          <button>LOGIN</button>
          {/* )} */}
          {/* {error && ( */}
          <span style={{ marginTop: "1rem" }}>wrong credentials...</span>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
