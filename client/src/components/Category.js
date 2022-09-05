import React from "react";
import { Link } from "react-router-dom";
import categoryImg from "../data/category-img";
import classes from "./Category.module.css";

const Category = () => {
  return (
    <div className={classes.category} id="categ-sec">
      <h1>CATEGORY OF PRODUCTS</h1>
      <div className={classes.container}>
        {categoryImg.map((item) => {
          return (
            <div className={classes.details} key={item.id}>
              <img src={item.img} />
              <div className={classes.infoContainer}>
                <h2>{item.title}</h2>
                <Link to={`/products/${item.categ}`}>
                  <button>SHOP NOW</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
