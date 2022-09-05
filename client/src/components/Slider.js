import React, { useState } from "react";
import classes from "./Slider.module.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import sliderImg from "../data/slider-img";

const Slider = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  const arrowHandler = (direction) => {
    if (direction === "prev") {
      setSlideIdx(slideIdx > 0 ? slideIdx - 1 : 2);
    } else {
      setSlideIdx(slideIdx < 2 ? slideIdx + 1 : 0);
    }
  };

  return (
    <div className={classes.slider}>
      <div
        direction="prev"
        className={classes.arrow}
        onClick={() => arrowHandler("prev")}
      >
        <ArrowLeftIcon className={classes.arrowIcon} />
      </div>

      <div
        direction="next"
        className={classes.arrow}
        onClick={() => arrowHandler("next")}
      >
        <ArrowRightIcon className={classes.arrowIcon} />
      </div>
      <div
        className={classes.container}
        style={{ transform: `translateX(${-100 * slideIdx}vw)` }}
      >
        {sliderImg.map((item) => {
          return (
            <div
              className={classes.slide}
              key={item.id}
              style={{ backgroundColor: item.bg }}
            >
              <div className={classes.imgContainer}>
                <img src={item.img} alt="" />
              </div>
              <div className={classes.infoContainer}>
                <h1>{item.title}</h1>
                <button onClick={() => window.location.replace("/#categ-sec")}>
                  SHOP NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
