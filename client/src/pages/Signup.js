import React from "react";
import classes from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={classes.signup}>
      <div className={classes.container}>
        <h1>CREATE AN ACCOUNT</h1>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button>SIGNUP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
