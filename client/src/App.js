import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";
import Success from "./pages/Success";

const App = () => {
  // const user = useSelector((state) => state.user.currentUser);
  // const user=
  // console.log(user.isAdmin);
  const user = true;
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/admin"
          element={user.isAdmin ? <AdminPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
