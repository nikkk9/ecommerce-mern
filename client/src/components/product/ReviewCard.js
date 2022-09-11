import { Avatar } from "@mui/material";
import React from "react";
import classes from "./ReviewCard.module.css";
import RatingStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  return (
    <div className={classes.reviewCard}>
      <Avatar src="" />
      <p>{review.name}</p>
      <RatingStars
        edit={false}
        color="gray"
        activeColor="tomato"
        value={review.rating}
        isHalf={true}
        size={25}
      />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
