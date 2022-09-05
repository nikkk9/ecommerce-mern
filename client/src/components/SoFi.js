import React from "react";
import classes from "./SoFi.module.css";

const SoFi = ({ onFilter, onSort }) => {
  return (
    <div className={classes.sofi}>
      <div className={classes.container}>
        <h1>FILTER AND SORT PRODUCTS YOU WANT!</h1>
        <div className={classes.wrapper}>
          <div className={classes.filter}>
            <h2>Filter Products : </h2>
            <select name="color" onChange={onFilter}>
              <option disabled>Color</option>
              <option>white</option>
              <option>black</option>
              <option>red</option>
              <option>blue</option>
              <option>yellow</option>
              <option>green</option>
            </select>

            <select name="size" onChange={onFilter}>
              <option disabled>Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className={classes.sort}>
            <h2>Sort Products : </h2>
            <select onChange={onSort}>
              <option value="newest">Newest</option>
              <option value="asc">Price(asc)</option>
              <option value="desc">Price(desc)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoFi;
