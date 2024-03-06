import React from "react";
import Rating from "../Rating/Rating";

function UserRating() {
  return (
    <div className="user__rating-card">
      <img src="https://panel.mondopedia.it/storage/upload/prices/1706003665_amazon.png" />
      <div className="rating__count">
        <span>4.8</span>
        <Rating value={2.9} />
      </div>
      <small className="rating__review">1418 Reviews</small>
    </div>
  );
}

export default UserRating;
