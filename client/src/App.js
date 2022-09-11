import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Products from "./pages/Products";
import Success from "./pages/Success";
import { persistUser } from "./redux/actions/user-action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(persistUser());
  });
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login-signup" element={<LoginSignup />} />

        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
