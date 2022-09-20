import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cls from "./LoginSignup.module.css";
// .css file for switch the tab of login/signup component
import "./LoginSignupSwitch.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loginUser,
  signupUser,
} from "../../redux/actions/user-action";
import Loader from "../loader/Loader";
const defaultDP =
  "https://cdn.pixabay.com/photo/2014/09/18/22/42/letters-451484_960_720.jpg";

const LoginSignup = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(defaultDP);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);

  const dispatch = useDispatch();
  const { fetching, error, authenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const registerHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(signupUser(myForm));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginEmail, loginPass));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (authenticated) {
      navigate("/");
    }
  }, [dispatch, error, authenticated, navigate]);

  const switchTabHandler = (e, tab) => {
    if (tab === "login") {
      switchTab.current.classList.add("shiftToNeutral");
      switchTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switchTab.current.classList.add("shiftToRight");
      switchTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {fetching ? (
        <Loader />
      ) : (
        <div className={cls.loginSignup}>
          <div className={cls.container}>
            <div className={cls.loginSignupToggle}>
              <p onClick={(e) => switchTabHandler(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabHandler(e, "register")}>REGISTER</p>
            </div>
            <button ref={switchTab} className={cls.switchBtn}></button>
            <form className={`${cls.form} ${cls.loginForm}`} ref={loginTab}>
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <Link to="/password/forgot">Forget Password ?</Link>
              <button type="submit" onClick={loginHandler}>
                LOGIN
              </button>
            </form>
            <form
              className={`${cls.form} ${cls.signupForm}`}
              ref={registerTab}
              encType="multipart/form-data"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={registerDataChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={registerDataChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={registerDataChange}
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                placeholder="Upload profile pic"
                onChange={registerDataChange}
              />
              <button type="submit" onClick={registerHandler}>
                REGISTER
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
