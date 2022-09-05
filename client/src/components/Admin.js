import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authReq, clientReq } from "../axios/req";
import classes from "./Admin.module.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  // console.log(products);

  const navigate = useNavigate();

  // const getProducts = async () => {
  //   dispatch(getProductStart());
  //   try {
  //     const { data } = await clientReq.get("/all-products");
  //     dispatch(getProductSuccess(data));
  //   } catch (err) {
  //     dispatch(getProductFailure());
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, [dispatch]);

  // const deleteHandler = async (id) => {
  //   dispatch(deleteProductStart());
  //   try {
  //     await authReq.delete(`/delete-product/${id}`);
  //     dispatch(deleteProductSuccess(id));
  //   } catch (err) {
  //     dispatch(deleteProductFailure());
  //   }
  // };

  return (
    <div className={classes.admin}>
      <div className={classes.container}>
        <h1>Products</h1>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>

          {products.map((p) => {
            return (
              <tbody key={p._id}>
                <tr>
                  <td>{p._id}</td>
                  <td>{p.title}</td>
                  <td>
                    <img src={p.img} alt="" />
                  </td>
                  <td>{p.price} INR</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className={classes.container}>
        <h1>Orders</h1>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>30000 INR</td>
              <td>
                <span>Cash on delivery</span>

                <span>Paid</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
